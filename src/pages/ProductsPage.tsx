import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ChevronDown,
  Tag, 
  Layers, 
  ArrowLeft, 
  Check, 
  Eye, 
  Sparkles, 
  Scissors, 
  Activity, 
  Shield, 
  Award, 
  Box,
  ArrowRight,
  X
} from 'lucide-react';
import { PRODUCT_CATEGORIES, ALL_PRODUCTS } from '../data/categoriesData';
import { ProductCategory, ProductItem } from '../types';

interface ProductsPageProps {
  selectedCategorySlug?: string;
  selectedSubcategoryName?: string;
  onSelectCategory: (slug?: string, subcategoryName?: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onOpenDirectOrder: (product: ProductItem) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  selectedCategorySlug,
  selectedSubcategoryName,
  onSelectCategory,
  onSelectProduct,
  onOpenDirectOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(
    selectedSubcategoryName || null
  );

  // Current active category (if any)
  const currentCategory = useMemo(() => {
    if (!selectedCategorySlug) return null;
    return PRODUCT_CATEGORIES.find((c) => c.slug === selectedCategorySlug) || null;
  }, [selectedCategorySlug]);

  // Sync subcategory when prop changes
  React.useEffect(() => {
    setActiveSubcategory(selectedSubcategoryName || null);
  }, [selectedSubcategoryName]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    let list = ALL_PRODUCTS;

    if (currentCategory) {
      list = list.filter((p) => p.categoryId === currentCategory.id);
      if (activeSubcategory) {
        list = list.filter((p) => p.subcategoryId?.toLowerCase() === activeSubcategory.toLowerCase());
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          (p.subcategoryId && p.subcategoryId.toLowerCase().includes(q))
      );
    }

    return list;
  }, [currentCategory, activeSubcategory, searchQuery]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 text-red-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-sky-600" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-amber-600" />;
      case 'Eye': return <Eye className="w-5 h-5 text-teal-600" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-600" />;
      case 'Award': return <Award className="w-5 h-5 text-yellow-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-600" />;
      case 'Box': return <Box className="w-5 h-5 text-purple-600" />;
      default: return <Activity className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* 1. Breadcrumbs & Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <button
            onClick={() => onSelectCategory(undefined, undefined)}
            className="hover:text-red-600 transition-colors font-medium"
          >
            All Categories
          </button>
          {currentCategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <button
                onClick={() => onSelectCategory(currentCategory.slug, undefined)}
                className={`font-semibold ${!activeSubcategory ? 'text-red-600' : 'text-slate-700 hover:text-red-600'}`}
              >
                {currentCategory.name}
              </button>
            </>
          )}
          {activeSubcategory && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-red-600">{activeSubcategory}</span>
            </>
          )}
        </div>

        {/* Live Filter / Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code or instrument..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
          />
        </div>
      </div>

      {/* 2. If NO Category is selected: Show Master Landing Page with 8 Category Cards */}
      {!currentCategory ? (
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Complete Export Catalog
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Jost',sans-serif] text-slate-900 tracking-tight">
              Medical & Surgical Instrument Divisions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Select any of the 8 specialized manufacturing categories below to explore technical specifications, subcategory filters, and direct ordering options.
            </p>
          </div>

          {/* Mobile Quick Category Dropdown */}
          <div className="lg:hidden bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5">
            <label htmlFor="mobile-all-categories-dropdown" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Select Category Dropdown:
            </label>
            <div className="relative">
              <select
                id="mobile-all-categories-dropdown"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) onSelectCategory(e.target.value);
                }}
                className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold rounded-xl py-2.5 pl-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 shadow-xs"
              >
                <option value="" disabled>Choose a Category Division...</option>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({cat.subcategories ? `${cat.subcategories.length} Subcategories` : 'Direct Catalog'})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:border-red-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 p-2 rounded-lg bg-white/90 backdrop-blur-md shadow">
                      {getCategoryIcon(cat.iconName)}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-bold font-['Jost',sans-serif] text-slate-900 group-hover:text-red-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="pt-2 text-xs font-semibold text-slate-700">
                      {cat.subcategories ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                          <Tag className="w-3 h-3 text-red-600" />
                          {cat.subcategories.length} Subcategories
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                          <Layers className="w-3 h-3 text-red-600" />
                          Direct Product Catalog
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-red-600 group-hover:text-red-700 border-t border-slate-100">
                  <span>Browse Instruments</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3. Category Page with Left Sidebar Subcategories Filter matching Old Site's Pattern */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filter (Desktop only: hidden on mobile/tablet) */}
          {currentCategory.subcategories && currentCategory.subcategories.length > 0 ? (
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-red-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-['Jost',sans-serif]">
                      Subcategories ({currentCategory.subcategories.length})
                    </h3>
                  </div>
                  {activeSubcategory && (
                    <button
                      onClick={() => setActiveSubcategory(null)}
                      className="text-[11px] text-red-600 hover:underline font-semibold"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>

                {/* Subcategories list */}
                <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
                  <button
                    onClick={() => setActiveSubcategory(null)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                      !activeSubcategory
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>All {currentCategory.name}</span>
                    {!activeSubcategory && <Check className="w-3.5 h-3.5" />}
                  </button>

                  {currentCategory.subcategories.map((sub) => {
                    const isSelected = activeSubcategory === sub;
                    return (
                      <button
                        key={sub}
                        onClick={() => setActiveSubcategory(sub)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left transition-colors ${
                          isSelected
                            ? 'bg-red-600 text-white font-bold shadow-xs'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-medium'
                        }`}
                      >
                        <span className="truncate pr-1">{sub}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Material Assurance card */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-xs">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Sialkot Metallurgy</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  All items manufactured from certified AISI 420/440 stainless steel with anti-corrosion passivation.
                </p>
              </div>
            </aside>
          ) : null}

          {/* Right Main Grid (or Full Width if no subcategories or on mobile) */}
          <main className={currentCategory.subcategories ? 'lg:col-span-8 xl:col-span-9 space-y-5' : 'lg:col-span-12 space-y-5'}>
            {/* Category Header Banner */}
            <div className="p-4 sm:p-6 rounded-2xl bg-slate-100 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-red-600 uppercase">
                    Category Division
                  </span>
                  {activeSubcategory && (
                    <span className="text-xs font-semibold text-slate-500">
                      • {activeSubcategory}
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-3xl font-bold font-['Jost',sans-serif] text-slate-900">
                  {currentCategory.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                  {currentCategory.description}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => onSelectCategory(undefined, undefined)}
                  className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> All Categories
                </button>
              </div>
            </div>

            {/* Mobile Category & Subcategory Dropdown Filter (Visible only on mobile/tablet screens: lg:hidden) */}
            <div className="lg:hidden space-y-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              {/* Category Dropdown Selector for Fast Mobile Switching */}
              <div>
                <label htmlFor="mobile-category-dropdown" className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Select Category:
                </label>
                <div className="relative">
                  <select
                    id="mobile-category-dropdown"
                    value={currentCategory.slug}
                    onChange={(e) => onSelectCategory(e.target.value, undefined)}
                    className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-semibold rounded-xl py-2.5 pl-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 shadow-xs"
                  >
                    {PRODUCT_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Subcategories Dropdown (Only if category has subcategories) */}
              {currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="mobile-subcategory-dropdown" className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      <Filter className="w-3.5 h-3.5 text-red-600" />
                      <span>Subcategory Dropdown ({currentCategory.subcategories.length})</span>
                    </label>
                    {activeSubcategory && (
                      <button
                        onClick={() => setActiveSubcategory(null)}
                        className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-0.5"
                      >
                        <X className="w-3 h-3" /> Reset
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      id="mobile-subcategory-dropdown"
                      value={activeSubcategory || ''}
                      onChange={(e) => setActiveSubcategory(e.target.value ? e.target.value : null)}
                      className="w-full appearance-none bg-red-50/50 border border-red-200 text-slate-900 text-xs sm:text-sm font-semibold rounded-xl py-2.5 pl-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-600 shadow-xs"
                    >
                      <option value="">
                        All {currentCategory.name} (Show All {currentCategory.subcategories.length} Subcategories)
                      </option>
                      {currentCategory.subcategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-red-600 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>
                      {filteredProducts.length} instrument{filteredProducts.length === 1 ? '' : 's'} displayed
                    </span>
                    {activeSubcategory ? (
                      <span className="font-semibold text-red-600 truncate max-w-[180px]">
                        Active: {activeSubcategory}
                      </span>
                    ) : (
                      <span className="text-slate-400">Showing all instruments</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Product Grid: 2 PRODUCTS PARALLEL ON MOBILE AS REQUESTED */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-5">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-red-400 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] sm:text-xs font-mono font-bold bg-red-600 text-white px-2 py-0.5 rounded shadow">
                            {product.code}
                          </span>
                        </div>
                        {product.subcategoryId && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="text-[10px] font-semibold bg-slate-950/80 backdrop-blur-xs text-slate-200 px-2 py-0.5 rounded truncate block">
                              {product.subcategoryId}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Name (Specs removed as requested) */}
                      <div className="p-3 sm:p-4">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* Actions: View Details (opens single product page) & Direct Order */}
                    <div 
                      className="p-2 sm:p-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1 hover:text-red-600"
                        title="View Full Product Page"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => onOpenDirectOrder(product)}
                        className="w-full py-1.5 px-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[11px] font-bold shadow-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Order Directly</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                <Search className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">
                  No matching instruments found
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search query or clear the subcategory filter to see all instruments in this category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveSubcategory(null);
                  }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};
