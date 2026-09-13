import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { SearchModal } from './components/SearchModal';
import { DirectOrderModal } from './components/DirectOrderModal';
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PageRoute, ProductItem } from './types';
import { PRODUCT_CATEGORIES, ALL_PRODUCTS } from './data/categoriesData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | undefined>(undefined);
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState<string | undefined>(undefined);
  const [selectedProductCode, setSelectedProductCode] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [directOrderProduct, setDirectOrderProduct] = useState<ProductItem | null>(null);
  const [isDirectOrderOpen, setIsDirectOrderOpen] = useState(false);

  // Sync with browser hash on initial load and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const parts = hash.split('/');

      if (parts[0] === 'about') {
        setCurrentPage('about');
        setSelectedCategorySlug(undefined);
        setSelectedSubcategoryName(undefined);
        setSelectedProductCode(undefined);
      } else if (parts[0] === 'contact') {
        setCurrentPage('contact');
        setSelectedCategorySlug(undefined);
        setSelectedSubcategoryName(undefined);
        setSelectedProductCode(undefined);
      } else if (parts[0] === 'product' && parts[1]) {
        setCurrentPage('product-detail');
        setSelectedProductCode(decodeURIComponent(parts[1]));
        setSelectedCategorySlug(undefined);
        setSelectedSubcategoryName(undefined);
      } else if (parts[0] === 'products') {
        setCurrentPage('products');
        setSelectedCategorySlug(parts[1] || undefined);
        setSelectedSubcategoryName(parts[2] ? decodeURIComponent(parts[2]) : undefined);
        setSelectedProductCode(undefined);
      } else {
        setCurrentPage('home');
        setSelectedCategorySlug(undefined);
        setSelectedSubcategoryName(undefined);
        setSelectedProductCode(undefined);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentProduct = selectedProductCode
    ? ALL_PRODUCTS.find(
        (p) =>
          p.code.toLowerCase() === selectedProductCode.toLowerCase() ||
          p.id.toLowerCase() === selectedProductCode.toLowerCase()
      )
    : undefined;

  // Update document title for SEO
  useEffect(() => {
    let title = 'Glamour Enterprises - Precision Surgical & Dental Instruments';
    if (currentPage === 'about') {
      title = 'About Us | Glamour Enterprises Sialkot';
    } else if (currentPage === 'contact') {
      title = 'Contact Us | Glamour Enterprises Export Desk';
    } else if (currentPage === 'product-detail' && currentProduct) {
      title = `${currentProduct.name} (${currentProduct.code}) | Glamour Enterprises`;
    } else if (currentPage === 'products') {
      if (selectedCategorySlug) {
        const cat = PRODUCT_CATEGORIES.find((c) => c.slug === selectedCategorySlug);
        title = cat ? `${cat.name} | Glamour Enterprises Catalog` : 'Products | Glamour Enterprises';
      } else {
        title = 'Product Divisions & Catalog | Glamour Enterprises';
      }
    }
    document.title = title;
  }, [currentPage, selectedCategorySlug, currentProduct]);

  const handleNavigate = (
    page: PageRoute,
    categorySlug?: string,
    subcategoryName?: string,
    productCode?: string
  ) => {
    setCurrentPage(page);
    setSelectedCategorySlug(categorySlug);
    setSelectedSubcategoryName(subcategoryName);
    setSelectedProductCode(productCode);

    // Update URL hash
    let newHash = `#/${page}`;
    if (page === 'product-detail' && productCode) {
      newHash = `#/product/${encodeURIComponent(productCode)}`;
    } else if (page === 'products') {
      if (categorySlug) {
        newHash += `/${categorySlug}`;
        if (subcategoryName) {
          newHash += `/${encodeURIComponent(subcategoryName)}`;
        }
      }
    }
    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDirectOrder = (product: ProductItem) => {
    setDirectOrderProduct(product);
    setIsDirectOrderOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        currentCategorySlug={selectedCategorySlug}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenDirectOrder={handleOpenDirectOrder}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            selectedCategorySlug={selectedCategorySlug}
            selectedSubcategoryName={selectedSubcategoryName}
            onSelectCategory={(slug, subcategory) => handleNavigate('products', slug, subcategory)}
            onSelectProduct={(product) => handleNavigate('product-detail', undefined, undefined, product.code)}
            onOpenDirectOrder={handleOpenDirectOrder}
          />
        )}

        {currentPage === 'product-detail' && currentProduct && (
          <ProductDetailPage
            product={currentProduct}
            onNavigate={handleNavigate}
            onOpenDirectOrder={handleOpenDirectOrder}
          />
        )}

        {currentPage === 'product-detail' && !currentProduct && (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900">Instrument Not Found</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              The requested instrument specification may have moved or been updated.
            </p>
            <button
              onClick={() => handleNavigate('products')}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Browse Full Catalog
            </button>
          </div>
        )}

        {currentPage === 'contact' && (
          <ContactUsPage />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Direct WhatsApp Button */}
      <WhatsAppFloatingButton />

      {/* Global Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCategory={(slug, subcategory) => {
          handleNavigate('products', slug, subcategory);
        }}
        onSelectProduct={(product) => {
          handleNavigate('product-detail', undefined, undefined, product.code);
        }}
      />

      {/* Direct Order / Factory PO Modal */}
      <DirectOrderModal
        product={directOrderProduct}
        isOpen={isDirectOrderOpen}
        onClose={() => {
          setIsDirectOrderOpen(false);
          setDirectOrderProduct(null);
        }}
      />
    </div>
  );
}
