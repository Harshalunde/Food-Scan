# 🧪 TESTING GUIDE - TRUTHIN-STYLE FEATURES

## 🎯 **QUICK TEST CHECKLIST**

Copy-paste these barcodes to test all features:

---

## 📋 **TEST CASE 1: MAGGI NOODLES**
**Best for testing ALL features**

### Barcode:
```
8901058866438
```

### Expected Results:
✅ **Serving Size Tabs**: Shows "Per 100g" and "Per 80g"  
✅ **TruthIn Rating**: ~1.8/5 (Poor)  
✅ **Processing Level**: Ultra-Processed (Red warning)  
✅ **Additives Count**: 6 additives  
✅ **Sodium Warning**: 1160mg (High, Red)  
✅ **Saturated Fat Warning**: 7.8g (High, Red)  

### Click "Additives" button to see:
**Additives Tab (6 items):**
- 🟢 E412 - Guar Gum (Safe)
- 🟡 E466 - Carboxymethyl Cellulose (Minimal)
- 🟠 E621 - MSG (Moderate) ⚠️
- 🟡 E635 - Disodium 5-Ribonucleotides (Minimal)
- 🟡 E150c - Caramel III (Minimal)
- 🟢 E330 - Citric Acid (Safe)

**Ingredients Tab (30+ items):**
- Refined Wheat Flour
- Palm Oil
- Wheat Gluten
- Salt
- Onion Powder
- Garlic Powder
- Turmeric Powder
- Red Chilli Powder
- Coriander Powder
- Cumin Powder
- Black Pepper Powder
- Ginger Powder
- Fenugreek Powder
- Cardamom Powder
- Clove Powder
- Cinnamon Powder
- Bay Leaf
- Spices & Condiments
- Hydrolysed Groundnut Protein
- Sugar
- Maltodextrin
- Dehydrated Vegetables (Carrot
- Peas)
- Modified Starch
- Yeast Extract

### "What You'll Like" Section:
✅ Protein: 9.8g (Good!)

---

## 📋 **TEST CASE 2: PARLE-G BISCUITS**

### Barcode:
```
8901063010031
```

### Expected Results:
✅ **TruthIn Rating**: ~2.8/5 (Below Average)  
✅ **Processing Level**: Ultra-Processed  
✅ **Additives Count**: 3 additives (all minimal concern)  

### Additives:
- 🟢 E500ii - Baking Soda (Safe)
- 🟢 E503ii - Ammonium Hydrogen Carbonate (Safe)
- 🟢 E322 - Lecithin (Safe)

### Ingredients:
- Wheat Flour
- Sugar
- Edible Vegetable Oil (Palm Oil)
- Invert Sugar Syrup
- Leavening Agents
- Milk Solids
- Salt
- Emulsifiers

---

## 📋 **TEST CASE 3: LAYS MAGIC MASALA**

### Barcode:
```
8901491100511
```

### Expected Results:
✅ **Processing Level**: Ultra-Processed  
✅ **High Fat Warning**: 34.5g  
✅ **High Salt Warning**: 1.8g  

---

## 📋 **TEST CASE 4: COCA-COLA** (International)

### Barcode:
```
5449000000996
```

### Expected Results:
✅ **From OpenFoodFacts API** (real data)  
✅ **Processing Level**: Ultra-Processed  
✅ **Very High Sugar**: ~10.6g per 100ml  

---

## ✨ **FEATURE CHECKLIST**

Test each feature systematically:

### ✅ **Visual Elements:**
- [ ] Purple serving size tabs visible
- [ ] "What Should Concern You" section renders
- [ ] Processing level shows with correct color
- [ ] Additives button shows count badge
- [ ] Nutrient warnings appear (Sodium, Saturated Fat)

### ✅ **Bottom Sheet:**
- [ ] Clicks on "Additives" button
- [ ] Sheet slides up with backdrop
- [ ] Two tabs visible (Additives & Ingredients)
- [ ] Purple highlight on active tab
- [ ] Can switch between tabs smoothly

### ✅ **Additives Tab:**
- [ ] Shows all E-numbers
- [ ] Has colored dots (Green/Yellow/Orange/Red)
- [ ] Shows concern levels
- [ ] Items are expandable (click to see details)
- [ ] Accordion animation works

### ✅ **Ingredients Tab:**
- [ ] Shows individual ingredients (not comma-separated)
- [ ] Each item on separate line
- [ ] Clean, readable format
- [ ] Spices listed individually

### ✅ **Positive Section:**
- [ ] "What You'll Like" appears
- [ ] Shows positive nutrients
- [ ] Purchase intent buttons visible
- [ ] Buttons are clickable and highlight

### ✅ **Interactions:**
- [ ] Serving size tabs are clickable
- [ ] Bottom sheet closes when clicking backdrop
- [ ] Close button works
- [ ] Expandable items expand/collapse
- [ ] All animations are smooth

---

## 🎨 **UI/UX VERIFICATION:**

Compare with TruthIn screenshots:

### Layout:
- [ ] Serving tabs at top ✅
- [ ] Concern section before positive section ✅
- [ ] Bottom sheet covers lower half ✅
- [ ] Tabs have purple highlight ✅

### Colors:
- [ ] Purple (#7c3aed) for active states ✅
- [ ] Green for safe additives ✅
- [ ] Yellow/Orange for concerns ✅
- [ ] Red for high concerns ✅

### Typography:
- [ ] Bold headings ✅
- [ ] Clean, readable text ✅
- [ ] Proper spacing ✅

---

## 🚀 **PERFORMANCE CHECK:**

- [ ] Page loads in <2 seconds
- [ ] Sheet animation is smooth (60fps)
- [ ] Tab switching is instant
- [ ] No console errors
- [ ] Works on mobile viewport

---

## ✅ **ALL FEATURES WORKING!**

If all checkboxes pass, your app is a **perfect replica** of TruthIn! 🎉
