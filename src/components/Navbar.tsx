import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  MessageSquare, 
  ExternalLink,
  PhoneCall,
  Activity,
  Sparkles,
  Scissors,
  Eye,
  Shield,
  Award,
  Layers,
  Box
} from 'lucide-react';
import { Logo } from './Logo';
import { PRODUCT_CATEGORIES, BUSINESS_INFO } from '../data/categoriesData';
import { PageRoute } from '../types';

interface NavbarProps {
  currentPage: PageRoute;
  currentCategorySlug?: string;
  onNavigate: (page: PageRoute, categorySlug?: string, subcategoryName?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  currentCategorySlug,
  onNavigate,
  onOpenSearch,
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [callDropdownOpen, setCallDropdownOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock background scroll when mobile drawer is open to prevent duplicate scrollbar on mobile
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isMobileDrawerOpen]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-4 h-4 text-red-600" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-sky-600" />;
      case 'Scissors': return <Scissors className="w-4 h-4 text-amber-600" />;
      case 'Eye': return <Eye className="w-4 h-4 text-teal-600" />;
      case 'Shield': return <Shield className="w-4 h-4 text-emerald-600" />;
      case 'Award': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'Layers': return <Layers className="w-4 h-4 text-indigo-600" />;
      case 'Box': return <Box className="w-4 h-4 text-purple-600" />;
      default: return <Activity className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Utility Ribbon (Brushed Graphite / Navy) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Verified Address & Export Factory Hub */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href={BUSINESS_INFO.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
              <span className="truncate max-w-[280px] sm:max-w-none">
                {BUSINESS_INFO.address}
              </span>
            </a>
            <span className="hidden lg:inline-block text-slate-600">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400">
              Direct Factory Manufacturer & Exporter
            </span>
          </div>

          {/* Right: Phone, WhatsApp, and Email Links */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href={`tel:${BUSINESS_INFO.phonePakistan.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>PK: {BUSINESS_INFO.phonePakistan}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 text-red-400 font-semibold hover:text-red-300 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>UAE: {BUSINESS_INFO.phoneUAE}</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a 
              href={BUSINESS_INFO.whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo */}
          <Logo onClick={() => onNavigate('home')} size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'home'
                  ? 'text-red-600 bg-red-50/70 font-bold'
                  : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'about'
                  ? 'text-red-600 bg-red-50/70 font-bold'
                  : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            {/* Products Mega-Menu Button */}
            <div className="relative" ref={megaMenuRef}>
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                className={`inline-flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPage === 'products'
                    ? 'text-red-600 bg-red-50/70 font-bold'
                    : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
              </button>

              {/* Mega-Menu Dropdown Panel */}
              {isMegaMenuOpen && (
                <div 
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 mt-1 w-[880px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-6 grid grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="col-span-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-['Jost',sans-serif]">
                        Instrument Catalog
                      </h4>
                      <p className="text-xs text-slate-500">
                        Select a category to browse surgical specifications or filter subcategories
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        onNavigate('products');
                      }}
                      className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1 hover:underline"
                    >
                      View Full Catalog <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* 8 Categories in Mega-Menu */}
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <div 
                      key={cat.id} 
                      className="group/item p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/80 cursor-pointer"
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        onNavigate('products', cat.slug);
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1.5 rounded-md bg-slate-100 group-hover/item:bg-white group-hover/item:shadow-xs transition-colors">
                          {getCategoryIcon(cat.iconName)}
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 group-hover/item:text-red-600 transition-colors line-clamp-1">
                          {cat.name}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                        {cat.subcategories
                          ? `${cat.subcategories.length} subcategories (${cat.subcategories.slice(0, 2).join(', ')}...)`
                          : 'Direct product catalog specification'}
                      </p>
                    </div>
                  ))}

                  <div className="col-span-4 pt-2 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      All instruments manufactured in Sialkot, Pakistan • Medical AISI 410/420/440 Stainless Steel
                    </span>
                    <a
                      href={BUSINESS_INFO.whatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      Direct WhatsApp Factory Dispatch <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                currentPage === 'contact'
                  ? 'text-red-600 bg-red-50/70 font-bold'
                  : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Icons & Call Now Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Search instruments"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Call Now Dropdown / Button (Desktop only: hidden on mobile header) */}
            <div className="hidden lg:block relative">
              <button
                type="button"
                onClick={() => setCallDropdownOpen(!callDropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-red-600/20 transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4 animate-pulse" />
                <span>Call Now</span>
                <ChevronDown className="w-3.5 h-3.5 hidden sm:inline" />
              </button>

              {callDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setCallDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
                    Direct Export Hotlines
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600"
                  >
                    <span>UAE Direct Line:</span>
                    <span className="font-mono text-red-600">{BUSINESS_INFO.phoneUAE}</span>
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.phonePakistan.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600"
                  >
                    <span>PK Factory:</span>
                    <span className="font-mono text-slate-700">{BUSINESS_INFO.phonePakistan}</span>
                  </a>
                  <div className="px-3 pt-2 pb-1 border-t border-slate-100">
                    <a
                      href={BUSINESS_INFO.whatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Export Desk
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger (Hamburger) */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors ml-1"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Slide-out Off-Canvas Drawer Menu for Mobile Devices */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileDrawerOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!isMobileDrawerOpen}
      >
        {/* Overlay backdrop with smooth fade */}
        <div 
          className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            isMobileDrawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileDrawerOpen(false)}
        />

        {/* Drawer Panel with smooth slide from right */}
        <div 
          id="mobile-drawer-menu"
          className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto overscroll-contain transition-transform duration-300 ease-out ${
            isMobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white text-slate-900">
              <Logo size="sm" onClick={() => {
                setIsMobileDrawerOpen(false);
                onNavigate('home');
              }} />
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

              {/* Drawer Navigation Links */}
              <div className="p-4 space-y-1">
                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onNavigate('home');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors ${
                    currentPage === 'home' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>

                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onNavigate('about');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors ${
                    currentPage === 'about' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>

                {/* Products Accordion in Mobile Drawer */}
                <div className="border-t border-b border-slate-100 py-1 my-1">
                  <button
                    onClick={() => {
                      onNavigate('products');
                      setIsMobileDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors ${
                      currentPage === 'products' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">8 Categories</span>
                  </button>

                  <div className="pl-2 pr-1 space-y-1 mt-1">
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const isOpen = mobileCategoryOpen === cat.id;
                      return (
                        <div key={cat.id} className="rounded-lg overflow-hidden">
                          <button
                            onClick={() => {
                              if (cat.subcategories && cat.subcategories.length > 0) {
                                setMobileCategoryOpen(isOpen ? null : cat.id);
                              } else {
                                setIsMobileDrawerOpen(false);
                                onNavigate('products', cat.slug);
                              }
                            }}
                            className="w-full flex items-center justify-between p-2 text-xs font-semibold text-slate-700 hover:text-red-600 hover:bg-slate-50 rounded-lg text-left"
                          >
                            <span className="flex items-center gap-2">
                              {getCategoryIcon(cat.iconName)}
                              <span className="truncate">{cat.name}</span>
                            </span>
                            {cat.subcategories ? (
                              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-red-600' : ''}`} />
                            ) : (
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                            )}
                          </button>

                          {/* Subcategories list */}
                          {isOpen && cat.subcategories && (
                            <div className="pl-6 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg my-1 max-h-48 overflow-y-auto">
                              <button
                                onClick={() => {
                                  setIsMobileDrawerOpen(false);
                                  onNavigate('products', cat.slug);
                                }}
                                className="block w-full text-left py-1 text-[11px] font-bold text-red-600 hover:underline"
                              >
                                View all {cat.name} →
                              </button>
                              {cat.subcategories.map((sub) => (
                                <button
                                  key={sub}
                                  onClick={() => {
                                    setIsMobileDrawerOpen(false);
                                    onNavigate('products', cat.slug, sub);
                                  }}
                                  className="block w-full text-left py-1 text-[11px] text-slate-600 hover:text-red-600 truncate"
                                >
                                  {sub}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMobileDrawerOpen(false);
                    onNavigate('contact');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors ${
                    currentPage === 'contact' ? 'bg-red-50 text-red-600 font-bold' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 p-2.5 bg-red-600 text-white rounded-xl font-bold text-xs shadow"
              >
                <PhoneCall className="w-4 h-4" /> Call UAE: {BUSINESS_INFO.phoneUAE}
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phonePakistan.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 p-2 bg-slate-800 text-slate-200 rounded-xl font-medium text-xs hover:bg-slate-900"
              >
                <Phone className="w-3.5 h-3.5" /> Call PK: {BUSINESS_INFO.phonePakistan}
              </a>
              <a
                href={BUSINESS_INFO.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 p-2 bg-emerald-600 text-white rounded-xl font-semibold text-xs hover:bg-emerald-700"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Export Desk
              </a>
              <p className="text-[10px] text-center text-slate-400 pt-1">
                S.I.E. Roras Road, Muzafar Pur, Sialkot, Pakistan
              </p>
            </div>
          </div>
        </div>
    </header>
  );
};
