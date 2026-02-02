
const BASE_URL = 'https://world.openfoodfacts.org/cgi/search.pl';
const PRODUCT_URL = 'https://world.openfoodfacts.org/api/v0/product';

// Import massive Indian products database
import { INDIAN_PRODUCTS_DB } from './indianProductsDb';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

const getCached = (key) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }
    return null;
};

const setCache = (key, data) => {
    cache.set(key, { data, timestamp: Date.now() });
};

// Timeout wrapper for fetch
const fetchWithTimeout = async (url, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

export const getProductByBarcode = async (barcode) => {
    const cacheKey = `product_${barcode}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    // 1. Check local massive DB first (Fastest)
    if (INDIAN_PRODUCTS_DB[barcode]) {
        console.log('Found in local Indian DB:', barcode);
        const data = { status: 1, product: INDIAN_PRODUCTS_DB[barcode] };
        setCache(cacheKey, data);
        return data;
    }

    // 2. Check OpenFoodFacts API
    try {
        const response = await fetchWithTimeout(`${PRODUCT_URL}/${barcode}.json`);
        if (response.ok) {
            const data = await response.json();
            if (data.status === 1 && data.product) {
                setCache(cacheKey, data);
                return data;
            }
        }
    } catch (error) {
        console.warn("API fetch failed, trying fallbacks:", error);
    }

    // 3. Fallback: Generic Categories
    // If not found, try to map to generic product based on partial barcode matching or provide a safe fallback
    const fallback = getGenericFallback(barcode);
    if (fallback) {
        return { status: 1, product: fallback };
    }

    return null;
};

// Helper: Generic Fallbacks for unknown products to ensure user ALWAYS gets a result
const getGenericFallback = (barcode) => {
    // Return a generic "Packaged Food" placeholder if absolutely nothing is found
    // This ensures the app never shows a "blank" screen for valid barcodes
    return {
        _id: barcode,
        product_name: 'Unknown Pacakged Food',
        brands: 'Unknown Brand',
        image_front_url: 'https://placehold.co/400x400/94a3b8/ffffff?text=Product+Found',
        nutrition_grades: 'unknown',
        nova_group: 4, // Assume processed if unknown
        nutriments: {
            energy_100g: 0,
            fat_100g: 0,
            sugars_100g: 0,
            proteins_100g: 0,
            salt_100g: 0
        },
        ingredients_text: 'Ingredients information not available for this product yet. Please check the physical label.'
    };
};

export const searchProducts = async (query, filters = {}, page = 1) => {
    try {
        let localResults = [];

        // Search local DB first
        if (page === 1) { // Only on first page
            const lowerQuery = query.toLowerCase();
            localResults = Object.values(INDIAN_PRODUCTS_DB).filter(p =>
                p.product_name.toLowerCase().includes(lowerQuery) ||
                (p.brands && p.brands.toLowerCase().includes(lowerQuery))
            );
        }

        let url = `${BASE_URL}?search_terms=${query}&search_simple=1&action=process&json=1&page=${page}`;

        // Apply filters if present
        if (filters.vegetarian) {
            url += `&tagtype_1=labels&tag_contains_1=contains&tag_1=vegetarian`;
        }

        const response = await fetchWithTimeout(url);
        if (response.ok) {
            const data = await response.json();

            // Combine local and API results
            // Local results first!
            const combinedProducts = [...localResults, ...(data.products || [])];

            // Deduplicate by ID
            const uniqueProducts = Array.from(new Map(combinedProducts.map(item => [item._id, item])).values());

            return { products: uniqueProducts, count: data.count + localResults.length };
        }

        return { products: localResults, count: localResults.length };

    } catch (error) {
        console.error("Error searching products:", error);
        // Fallback to local DB search if API fails
        const lowerQuery = query.toLowerCase();
        const localResults = Object.values(INDIAN_PRODUCTS_DB).filter(p =>
            p.product_name.toLowerCase().includes(lowerQuery) ||
            (p.brands && p.brands.toLowerCase().includes(lowerQuery))
        );
        return { products: localResults };
    }
};

export const getProductsByCategory = async (category, page = 1) => {
    try {
        const url = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&action=process&json=1&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching category:", error);
        return { products: [] };
    }
};

// New function for Expert Curated lists
export const getExpertCuratedProducts = async (type) => {
    let url = `${BASE_URL}?action=process&json=1&page_size=10`;

    switch (type) {
        case 'high-protein':
            // Low fat and High Protein approximation (nutrition grade A/B and high protein category or similar)
            url += `&tagtype_0=categories&tag_contains_0=contains&tag_0=high-protein-foods&tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=a`;
            break;
        case 'low-sugar':
            url += `&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0=a&nutrient_levels_sugars=low`;
            break;
        case 'high-fiber':
            url += `&tagtype_0=categories&tag_contains_0=contains&tag_0=high-fiber-foods`;
            break;
        case 'low-fat':
            url += `&nutrient_levels_fat=low&tagtype_0=nutrition_grades&tag_contains_0=contains&tag_0=a`;
            break;
        default:
            return { products: [] };
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching expert curated:", error);
        return { products: [] };
    }
};

export const getHealthierAlternatives = async (category, currentGrade) => {
    if (!category) return [];
    try {
        const url = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=a&action=process&json=1&page_size=5`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.products.length < 3) {
            const urlB = `${BASE_URL}?tagtype_0=categories&tag_contains_0=contains&tag_0=${category}&tagtype_1=nutrition_grades&tag_contains_1=contains&tag_1=b&action=process&json=1&page_size=5`;
            const responseB = await fetch(urlB);
            const dataB = await responseB.json();
            return [...data.products, ...dataB.products].slice(0, 5);
        }

        return data.products;
    } catch (error) {
        console.error("Error fetching alternatives:", error);
        return [];
    }
}
