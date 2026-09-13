import React from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  PhoneCall, 
  MessageSquare, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Globe2,
  ChevronRight
} from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_INFO, PRODUCT_CATEGORIES, TRADE_ORGANIZATIONS } from '../data/categoriesData';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (page: PageRoute, categorySlug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner: Floating Contact Ribbon matching the old site's cyan pill card in modern graphite style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-6 sm:-translate-y-8">
        <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-sky-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-white grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Office Address */}
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-2 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200 block">
                Office & Factory Address
              </span>
              <p className="text-sm font-semibold text-white leading-snug mt-0.5">
                {BUSINESS_INFO.address}
              </p>
              <span className="text-[11px] text-sky-200 underline mt-1 inline-flex items-center gap-1">
                Open Directions <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </a>

          {/* Send Email */}
          <a
            href={`mailto:${BUSINESS_INFO.email}`}
            className="flex items-start gap-4 p-2 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200 block">
                Official Export Desk
              </span>
              <p className="text-sm font-semibold text-white leading-snug mt-0.5 break-all">
                {BUSINESS_INFO.email}
              </p>
              <span className="text-[11px] text-sky-200 mt-1 block">
                24/7 RFQ & Technical Catalog Response
              </span>
            </div>
          </a>

          {/* Call Us */}
          <div className="flex items-start gap-4 p-2 rounded-xl bg-white/10 border border-white/20">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200 block">
                Call Direct Line
              </span>
              <div className="space-y-0.5 mt-0.5">
                <a
                  href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`}
                  className="block text-sm font-bold text-white hover:text-red-300 transition-colors"
                >
                  UAE: {BUSINESS_INFO.phoneUAE}
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.phonePakistan.replace(/\s+/g, '')}`}
                  className="block text-xs font-semibold text-sky-100 hover:text-white transition-colors"
                >
                  PK: {BUSINESS_INFO.phonePakistan}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Col 1 & 2: Company Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="md" onClick={() => onNavigate('home')} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Glamour Enterprises is a verified surgical instrument manufacturing facility and worldwide exporter based in Sialkot, Pakistan. Specializing in medical grade AISI stainless steel and tungsten carbide surgical, dental, ophthalmic, veterinary, and beauty instruments.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Building2 className="w-3.5 h-3.5 text-red-500" />
                <span>Sialkot Industrial Zone</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Globe2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Direct Global Shipping</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Message on WhatsApp ({BUSINESS_INFO.phonePakistan})
              </a>
            </div>
          </div>

          {/* Col 3: Useful Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 font-['Jost',sans-serif]">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Products Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Contact Us
                </button>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" /> Factory Location Map
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 & 5: Product Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 font-['Jost',sans-serif]">
              Product Categories
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onNavigate('products', cat.slug)}
                  className="text-slate-400 hover:text-white transition-colors text-left flex items-center gap-1.5 py-1"
                >
                  <ChevronRight className="w-3 h-3 text-red-500 flex-shrink-0" />
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trade & Export Compliance Trust Badges (Matching Screenshot: TDAP, FBR, Bank Wire, MoneyGram, Ria, Western Union) */}
        <div className="mt-10 pt-8 border-t border-slate-800">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Verified Trade Authorities & Export Payment Facilities
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {TRADE_ORGANIZATIONS.map((org) => (
              <div
                key={org.name}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-1"
              >
                <span className="text-xs font-bold font-mono text-slate-200 tracking-wider">
                  {org.acronym}
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1">
                  {org.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© Copyright 2026 Glamour Enterprises. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>S.I.E. Roras Road, Muzafar Pur, Sialkot, Pakistan</span>
            <span>•</span>
            <span>No Cart / B2B Direct Ordering</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
