import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { PRODUCT_CATEGORIES, ALL_PRODUCTS } from '../data/categoriesData';
import { ProductItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (slug: string, subcategory?: string) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search in categories and subcategories
  const matchedCategories = normalizedQuery
    ? PRODUCT_CATEGORIES.flatMap((cat) => {
        const matchesCat = cat.name.toLowerCase().includes(normalizedQuery);
        const matchedSubs = (cat.subcategories || []).filter((sub) =>
          sub.toLowerCase().includes(normalizedQuery)
        );

        const results: { category: typeof cat; subcategory?: string }[] = [];
        if (matchesCat) {
          results.push({ category: cat });
        }
        matchedSubs.forEach((sub) => {
          results.push({ category: cat, subcategory: sub });
        });
        return results;
      }).slice(0, 6)
    : [];

  // Search in products
  const matchedProducts = normalizedQuery
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.code.toLowerCase().includes(normalizedQuery) ||
          p.material.toLowerCase().includes(normalizedQuery) ||
          (p.subcategoryId && p.subcategoryId.toLowerCase().includes(normalizedQuery))
      ).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="search-dialog"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search instrument by code (e.g. GE-06-101), name, or category..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-200 hover:bg-slate-300 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!normalizedQuery && (
            <div className="text-center py-8 text-slate-500 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-medium">Type any product code or instrument name</p>
              <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                {['Balfour Retractor', 'Extracting Forceps', 'Castration Forcep', 'Tungsten Carbide', 'Ophthalmology', 'Scissors'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 border border-slate-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Categories / Subcategories */}
          {matchedCategories.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Categories & Subcategories
              </h4>
              <div className="space-y-1">
                {matchedCategories.map(({ category, subcategory }, index) => (
                  <button
                    key={`${category.id}-${subcategory || 'all'}-${index}`}
                    onClick={() => {
                      onSelectCategory(category.slug, subcategory);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tag className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-red-600 transition-colors">
                        {subcategory ? `${subcategory} (${category.name})` : category.name}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Instruments ({matchedProducts.length})
              </h4>
              <div className="space-y-2">
                {matchedProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-slate-200/80 hover:border-red-300 hover:bg-red-50/30 text-left transition-colors group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                          {product.code}
                        </span>
                        {product.subcategoryId && (
                          <span className="text-[11px] text-slate-500 truncate">
                            {product.subcategoryId}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-red-600 truncate transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {product.material}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-medium text-slate-500 group-hover:text-red-600 flex items-center gap-1">
                        View Spec <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {normalizedQuery && matchedCategories.length === 0 && matchedProducts.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm">No instruments matching &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by category or part number</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Medical Grade Catalog
          </span>
          <span>Sialkot Manufacturing Hub</span>
        </div>
      </div>
    </div>
  );
};
