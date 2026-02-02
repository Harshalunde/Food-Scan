
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, X, Leaf, Star, Zap, Award, Check, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { searchProducts, getProductsByCategory, getExpertCuratedProducts } from '../services/api';

const EXPERT_LISTS = [
    { id: 'high-protein', name: 'High Protein', icon: Zap, color: '#eab308' },
    { id: 'low-sugar', name: 'Low Sugar', icon: Heart, color: '#ec4899', iconComponent: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg> }, // Using Heart as proxy or custom SVG
    { id: 'high-fiber', name: 'High Fiber', icon: Leaf, color: '#22c55e' },
    { id: 'low-fat', name: 'Low Fat', icon: Award, color: '#3b82f6' },
];

const CATEGORIES = [
    { id: 'snacks', name: 'Snacks' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'dairies', name: 'Dairy' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'cereals-and-potatoes', name: 'Cereals' },
    { id: 'plant-based-foods', name: 'Plant Based' },
    { id: 'meats', name: 'Meats' },
    { id: 'seafood', name: 'Seafood' },
];

// Helper to define Heart since I used it above inside the array but need it defined or imported.
// Actually imported Heart from lucide-react above.

const Scanner = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null); // 'high-protein', etc.
    const [vegetarianOnly, setVegetarianOnly] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        performSearch(searchTerm);
    };

    const performSearch = async (term) => {
        setLoading(true);
        // If it is numeric, assume barcode
        if (/^\d+$/.test(term)) {
            navigate(`/product/${term}`);
            return;
        }

        setActiveFilter(null);

        // 1. Search Local Indian DB by name (case-insensitive)
        const localMatches = [];
        // Dynamic import to avoid circular dependencies if any, but regular import is fine here since we have it.
        // We actually need to import INDIAN_PRODUCTS_DB at the top of file normally, 
        // but let's assume we update the imports next.
        // For now, let's just do the API search which we will upgrade in the api service itself.

        // BETTER: Update searchProducts in api.js to handle local DB searching! 
        // That way it's centralized.

        const results = await searchProducts(term, { vegetarian: vegetarianOnly });
        setSearchResults(results.products || []);
        setLoading(false);
    };

    const handleExpertClick = async (type) => {
        setLoading(true);
        setSearchTerm('');
        setActiveFilter(type);
        const results = await getExpertCuratedProducts(type);
        setSearchResults(results.products || []);
        setLoading(false);
    };

    const handleCategoryClick = async (catId) => {
        setLoading(true);
        setSearchTerm('');
        setActiveFilter(catId);
        const results = await getProductsByCategory(catId);
        setSearchResults(results.products || []);
        setLoading(false);
    };

    const clearResults = () => {
        setSearchResults([]);
        setSearchTerm('');
        setActiveFilter(null);
    };

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="section-title">Find Healthy Food</h1>
                <p className="section-subtitle">Search products, explore expert lists, or browse categories.</p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} style={{ position: 'relative', marginTop: '2rem' }}>
                    <div className="glass-panel" style={{
                        display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.05)'
                    }}>
                        <Search className="text-muted" style={{ marginLeft: '1rem', color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search product (e.g. 'Oats', 'Nutella') or enter barcode..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', padding: '1rem', fontSize: '1rem', outline: 'none' }}
                        />
                        {searchTerm && <button type="button" onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: '0.5rem' }}><X size={18} /></button>}
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? '...' : 'Search'}
                        </button>
                    </div>

                    {/* Vegetarian Toggle */}
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: vegetarianOnly ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                            <div style={{
                                width: '20px', height: '20px', borderRadius: '4px', border: `2px solid ${vegetarianOnly ? 'var(--color-primary)' : 'var(--color-text-muted)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {vegetarianOnly && <div style={{ width: '10px', height: '10px', background: 'var(--color-primary)', borderRadius: '2px' }} />}
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Vegetarian Only</span>
                            <input type="checkbox" checked={vegetarianOnly} onChange={(e) => setVegetarianOnly(e.target.checked)} style={{ display: 'none' }} />
                        </label>
                    </div>
                </form>
            </div>

            {searchResults.length > 0 && (
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>
                        {activeFilter ? `Results for "${activeFilter}"` : `Search Results`}
                    </h2>
                    <button onClick={clearResults} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <X size={18} /> Clear Results
                    </button>
                </div>
            )}

            {/* Main Content Area (Expert Lists & Categories) - Hide if searching */}
            {searchResults.length === 0 && !loading && (
                <>
                    {/* Expert Curated Lists */}
                    <div style={{ marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <Star fill="var(--color-primary)" color="var(--color-primary)" />
                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Expert-Curated Lists</h3>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {EXPERT_LISTS.map((list) => (
                                <motion.button
                                    key={list.id}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleExpertClick(list.id)}
                                    className="glass-card"
                                    style={{
                                        padding: '1.5rem',
                                        borderRadius: 'var(--radius-xl)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        textAlign: 'left',
                                        color: '#fff',
                                        background: `linear-gradient(135deg, ${list.color}15 0%, rgba(255,255,255,0.05) 100%)`,
                                        border: `1px solid ${list.color}40`
                                    }}
                                >
                                    <div style={{ color: list.color }}><list.icon size={28} /></div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{list.name}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Nutritionist Pick</div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Browse by Category</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className="glass-panel"
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        borderRadius: '50px',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        background: 'rgba(255,255,255,0.03)',
                                        color: 'var(--color-text)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Results Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                {searchResults.map((product) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card"
                        style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column' }}
                        onClick={() => navigate(`/product/${product._id}`)}
                    >
                        <div style={{ padding: '2rem', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                            <img
                                src={product.image_front_small_url || 'https://placehold.co/200x200?text=No+Image'}
                                alt={product.product_name}
                                style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        <div style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.4)' }}>
                            {/* Grade Badge */}
                            <div style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                background: '#fff', color: '#000', fontWeight: '800', width: '36px', height: '36px',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}>
                                {product.nutrition_grades?.toUpperCase() || '?'}
                            </div>

                            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {product.product_name || 'Unknown Product'}
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                {product.brands || 'Unknown Brand'}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {loading && (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <div className="animate-float" style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
                    <p style={{ color: 'var(--color-text-muted)' }}>Scanning database...</p>
                </div>
            )}
        </div>
    );
};

export default Scanner;
