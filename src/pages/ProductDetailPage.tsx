import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  PhoneCall, 
  Building2, 
  Tag, 
  Layers, 
  Sparkles, 
  Check, 
  Share2, 
  Eye, 
  FileText
} from 'lucide-react';
import { ProductItem, PageRoute } from '../types';
import { PRODUCT_CATEGORIES, ALL_PRODUCTS, BUSINESS_INFO } from '../data/categoriesData';

interface ProductDetailPageProps {
  product: ProductItem;
  onNavigate: (page: PageRoute, categorySlug?: string, subcategoryName?: string, productCode?: string) => void;
  onOpenDirectOrder: (product: ProductItem) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onNavigate,
  onOpenDirectOrder,
}) => {
  const category = PRODUCT_CATEGORIES.find((c) => c.id === product.categoryId);

  // Find related products in same category (excluding current)
  const relatedProducts = ALL_PRODUCTS
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Glamour Enterprises Export Desk,
I am interested in placing an order/inquiry for:
• Product Name: ${product.name}
• Item Code: ${product.code}
• Category: ${category?.name || product.categoryId}
Please provide wholesale FOB quotation and lead time.`
    );
    window.open(`https://wa.me/${BUSINESS_INFO.whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Breadcrumbs & Return Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto py-1">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('products')}
            className="hover:text-red-600 transition-colors whitespace-nowrap"
          >
            Products
          </button>
          {category && (
            <>
              <span>/</span>
              <button
                onClick={() => onNavigate('products', category.slug)}
                className="hover:text-red-600 transition-colors whitespace-nowrap"
              >
                {category.name}
              </button>
            </>
          )}
          {product.subcategoryId && (
            <>
              <span>/</span>
              <button
                onClick={() => onNavigate('products', category?.slug, product.subcategoryId)}
                className="hover:text-red-600 transition-colors whitespace-nowrap"
              >
                {product.subcategoryId}
              </button>
            </>
          )}
          <span>/</span>
          <span className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
            {product.code}
          </span>
        </nav>

        <button
          onClick={() => {
            if (category) {
              onNavigate('products', category.slug, product.subcategoryId);
            } else {
              onNavigate('products');
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back to {category?.name || 'Catalog'}</span>
        </button>
      </div>

      {/* 2. Main Product Display (Two-Column Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Visuals */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md">
            <img
              src={product.image}
              alt={`${product.name} (${product.code}) - Glamour Enterprises`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            {/* Code Badge */}
            <div className="absolute top-4 left-4">
              <span className="text-xs sm:text-sm font-mono font-extrabold bg-red-600 text-white px-3 py-1 rounded-lg shadow-md tracking-wider">
                {product.code}
              </span>
            </div>

            {/* Division Pill */}
            <div className="absolute top-4 right-4">
              <span className="text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-white px-3 py-1 rounded-lg shadow-md">
                {category?.name || 'Surgical'}
              </span>
            </div>

            {/* Watermark/Origin Assurance */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md p-3 rounded-2xl text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="font-semibold text-slate-200">Sialkot Factory Manufactured</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">100% Stainless Steel</span>
            </div>
          </div>

          {/* Quick Manufacturing Certifications Row */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Material</span>
              <span className="text-xs font-extrabold text-slate-800 font-mono">AISI 420/440</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Treatment</span>
              <span className="text-xs font-extrabold text-slate-800 font-mono">Passivated</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Autoclave</span>
              <span className="text-xs font-extrabold text-emerald-600 font-mono">134°C Tested</span>
            </div>
          </div>
        </div>

        {/* Right Column: Full Specifications & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
                Item Code: {product.code}
              </span>
              {product.subcategoryId && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-600">
                    {product.subcategoryId}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-['Jost',sans-serif] text-slate-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="p-5 rounded-2xl bg-white border-2 border-red-500/20 shadow-lg shadow-red-500/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Direct Export Ordering
              </span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Ready for Factory Dispatch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => onOpenDirectOrder(product)}
                className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Order Directly</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500 border-t border-slate-100">
              <span>Direct factory quotes within 24h</span>
              <a 
                href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`}
                className="font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" /> Call UAE: {BUSINESS_INFO.phoneUAE}
              </a>
            </div>
          </div>

          {/* Comprehensive Technical Specifications Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Jost',sans-serif] flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-600" />
              <span>Technical & Metallurgical Specifications</span>
            </h3>

            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs">
              <div className="divide-y divide-slate-100 text-xs">
                <div className="grid grid-cols-3 p-3 bg-slate-50/70">
                  <span className="font-bold text-slate-700">Catalog Item Code</span>
                  <span className="col-span-2 font-mono font-bold text-red-600">{product.code}</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-bold text-slate-700">Instrument Classification</span>
                  <span className="col-span-2 text-slate-800">{category?.name} {product.subcategoryId ? `• ${product.subcategoryId}` : ''}</span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-slate-50/70">
                  <span className="font-bold text-slate-700">Material Grade</span>
                  <span className="col-span-2 text-slate-800">{product.material}</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-bold text-slate-700">Surface Finish</span>
                  <span className="col-span-2 text-slate-800">{product.finish}</span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-slate-50/70">
                  <span className="font-bold text-slate-700">Hardness Standard</span>
                  <span className="col-span-2 text-slate-800 font-mono">Rockwell C (HRC) calibrated for surgical edge retention</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-bold text-slate-700">Sterilization Resistance</span>
                  <span className="col-span-2 text-slate-800">Autoclave to 134°C, Ethylene Oxide (EO), and dry heat compatible</span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-slate-50/70">
                  <span className="font-bold text-slate-700">Passivation Method</span>
                  <span className="col-span-2 text-slate-800">Nitric / Citric acid passivation per ASTM F86 / DIN EN ISO standards</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-bold text-slate-700">Custom OEM Etching</span>
                  <span className="col-span-2 text-slate-800">Laser etched clinic name, catalog number, or distributor logo upon request</span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-slate-50/70">
                  <span className="font-bold text-slate-700">Country of Origin</span>
                  <span className="col-span-2 text-slate-800 font-semibold">Sialkot, Pakistan (Glamour Enterprises Manufacturing Facility)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Clinical & Functional Features */}
          {product.features && product.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Jost',sans-serif]">
                Key Engineering & Design Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Related Instruments in Category */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Division Range
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-['Jost',sans-serif] text-slate-900">
                Related {category?.name || 'Instruments'}
              </h3>
            </div>

            {category && (
              <button
                onClick={() => onNavigate('products', category.slug)}
                className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 hover:underline"
              >
                <span>View all in {category.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate('product-detail', undefined, undefined, rel.code)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-red-400 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] sm:text-xs font-mono font-bold bg-red-600 text-white px-2 py-0.5 rounded shadow">
                        {rel.code}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {rel.subcategoryId || category?.name}
                    </p>
                  </div>
                </div>

                <div className="p-2 sm:p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600 group-hover:text-red-700">
                  <span>View Product Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
