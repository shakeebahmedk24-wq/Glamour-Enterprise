import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  BadgePercent, 
  Truck, 
  ExternalLink,
  ChevronRight,
  Eye,
  Sparkles,
  Scissors,
  Activity,
  Layers,
  Award,
  Box,
  CheckCircle2,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { HeroVideo } from '../components/HeroVideo';
import { ReviewsMarquee } from '../components/ReviewsMarquee';
import { 
  BUSINESS_INFO, 
  PRODUCT_CATEGORIES, 
  ALL_PRODUCTS, 
  VALUE_PILLARS, 
  TRADE_ORGANIZATIONS 
} from '../data/categoriesData';
import { ProductItem, PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (page: PageRoute, categorySlug?: string, subcategoryName?: string, productCode?: string) => void;
  onOpenDirectOrder: (product: ProductItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenDirectOrder,
}) => {
  const featuredProducts = ALL_PRODUCTS.filter((p) => p.isFeatured).slice(0, 6);

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-red-600" />;
      case 'Users': return <Users className="w-6 h-6 text-red-600" />;
      case 'BadgePercent': return <BadgePercent className="w-6 h-6 text-red-600" />;
      case 'Truck': return <Truck className="w-6 h-6 text-red-600" />;
      default: return <ShieldCheck className="w-6 h-6 text-red-600" />;
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-5 h-5 text-red-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-sky-600" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-amber-600" />;
      case 'Eye': return <Eye className="w-5 h-5 text-teal-600" />;
      case 'Shield': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Award': return <Award className="w-5 h-5 text-yellow-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-600" />;
      case 'Box': return <Box className="w-5 h-5 text-purple-600" />;
      default: return <Activity className="w-5 h-5 text-red-600" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Cinematic Hero Section with Parallax */}
      <HeroVideo
        onExploreProducts={() => onNavigate('products')}
        onContactClick={() => onNavigate('contact')}
      />

      {/* 2. Four Core Value Pillars (Matching the 4 Red Icons in Old Design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUE_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-lg shadow-slate-200/40 hover:border-red-300 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-600 group-hover:text-white text-red-600 flex items-center justify-center transition-colors mb-4">
                {getPillarIcon(pillar.icon)}
              </div>
              <h3 className="text-base sm:text-lg font-bold font-['Jost',sans-serif] text-slate-900 group-hover:text-red-600 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Welcome To Glamour Enterprises (Revamped Manufacturing Overview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Modern High Precision Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
                alt="Surgical instruments manufacturing and operating theater"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-mono font-bold bg-red-600 px-2 py-0.5 rounded uppercase">
                  Manufacturing Hub
                </span>
                <h4 className="text-lg sm:text-xl font-bold font-['Jost',sans-serif]">
                  S.I.E. Roras Road, Muzafar Pur, Sialkot
                </h4>
                <p className="text-xs text-slate-300">
                  Global center of surgical craftsmanship, hand-finished by multi-generational metallurgy specialists.
                </p>
              </div>
            </div>

            {/* Overlapping secondary detail image */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-52 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=600&q=80"
                alt="Precision surgical scissor and tungsten carbide craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Verified Facts & Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider">
                About Our Factory
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-['Jost',sans-serif] text-slate-900 leading-tight">
                Welcome To Glamour Enterprises
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Based in the premier surgical cluster of Sialkot, Pakistan, Glamour Enterprises is a specialized manufacturer and worldwide exporter of high-precision instruments. We produce medical-grade surgical, dental, orthopedic, veterinary, ophthalmology, and beauty instruments, along with tungsten carbide reinforced instruments and stainless steel hollow wares.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/70 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>AISI 410, 420 & 440 Stainless Steel</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/70 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tungsten Carbide Inserts (70+ HRC)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/70 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Custom OEM Laser Etching & Branding</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100/70 border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Export Packaging & Passivation Tested</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow transition-colors"
              >
                <span>Know More About Our Facility</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={BUSINESS_INFO.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-sm font-bold rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Quick Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Sections / 8 Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Our Work Process & Instrument Spectrum
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-['Jost',sans-serif] text-slate-900">
            Product Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore our complete 8-division manufacturing range engineered for international healthcare institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => onNavigate('products', category.slug)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200/90 hover:border-red-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-white/90 backdrop-blur-md shadow">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-mono font-medium text-slate-300 block">
                      {category.subcategories ? `${category.subcategories.length} Subcategories` : 'Direct Instrument Grid'}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-base font-bold font-['Jost',sans-serif] text-slate-900 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-slate-100 text-xs font-bold text-red-600 group-hover:text-red-700">
                <span>View Specifications</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Instruments ("Our Best Products" from Old Site with 2 Products Parallel on Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Featured Instruments
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Jost',sans-serif] text-slate-900">
              Our Best Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top requested surgical and veterinary models manufactured to international tolerances.
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
          >
            <span>View Full Product Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2 products parallel on mobile with a clean grid layout! */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onNavigate('product-detail', undefined, undefined, product.code)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-red-400 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-square sm:h-52 w-full bg-slate-100 overflow-hidden">
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
                </div>

                {/* Product Name (Specs removed) */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
                    {product.name}
                  </h3>
                </div>
              </div>

              {/* Action Buttons: View Details & Direct Order */}
              <div 
                className="p-2 sm:p-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onNavigate('product-detail', undefined, undefined, product.code)}
                  className="w-full py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1 hover:text-red-600"
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
      </section>

      {/* 6. Metallurgy & Craftsmanship Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
              Material Integrity & Passivation Standards
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold font-['Jost',sans-serif]">
              Engineered from Certified Surgical Steel
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every instrument crafted at our S.I.E. Roras Road facility undergoes controlled vacuum hardening, chemical passivation to eliminate free iron from the surface, and rigorous boil/autoclave testing to ensure complete rust resistance across years of clinical sterilizations.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>DIN EN ISO Passivation Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Rockwell Hardness (HRC) Calibration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span>Ultrasonic Cleansed Prior to Packing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reviews Section (Marquee on Mobile as Explicitly Requested) */}
      <ReviewsMarquee />

      {/* 8. Trade Authorities & Export Banking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Export Infrastructure & Regulatory Bodies
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-['Jost',sans-serif] text-slate-900">
            Trade Clearance & Banking Facilities
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {TRADE_ORGANIZATIONS.map((org) => (
            <div
              key={org.name}
              className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-center text-center shadow-xs"
            >
              <span className="text-sm sm:text-base font-extrabold font-mono text-slate-900">
                {org.acronym}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                {org.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
