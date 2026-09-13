import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Factory, 
  Layers, 
  CheckCircle, 
  Award, 
  ArrowRight,
  MessageSquare,
  Globe2,
  PhoneCall
} from 'lucide-react';
import { BUSINESS_INFO, PRODUCT_CATEGORIES } from '../data/categoriesData';
import { PageRoute } from '../types';
import { RevealOnScroll } from '../components/RevealOnScroll';

interface AboutUsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-10 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <RevealOnScroll direction="up" className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider">
          <Factory className="w-3.5 h-3.5" /> Manufacturing Background
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-['Jost',sans-serif] text-slate-900 tracking-tight">
          About Glamour Enterprises
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Direct manufacturer and global exporter of surgical, dental, orthopedic, veterinary, ophthalmology, and beauty instruments, tungsten carbide instruments, and stainless steel hollow wares located in Sialkot, Pakistan.
        </p>
      </RevealOnScroll>

      {/* Main Narrative & Factory Details (Verified Facts Only) */}
      <RevealOnScroll direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Jost',sans-serif] text-slate-900">
            Precision Manufacturing Hub in Sialkot
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Glamour Enterprises operates directly from <span className="font-semibold text-slate-900">S.I.E. Roras Road, Muzafar Pur, Sialkot, Pakistan</span>. Sialkot has long been recognized as the international manufacturing epicenter for hand-crafted surgical and dental instrumentation, supplying hospitals and medical distributors across the globe.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our manufacturing operations encompass all stages of production: from raw stainless steel billet inspection and drop forging, to precision computer-aided machining, hand-filing, heat treatment hardening, chemical passivation, and individual optical alignment.
          </p>

          {/* Verified Categories Scope */}
          <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Verified Production Categories:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Surgical Instruments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Dental Instruments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Orthopedic Instruments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Veterinary Instruments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Ophthalmology Instruments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Beauty & Personal Care Instruments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tungsten Carbide (TC) Instruments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Stainless Steel Hollow Wares</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md shadow-red-600/20 transition-colors"
            >
              <PhoneCall className="w-4 h-4" /> Call Direct Line: {BUSINESS_INFO.phoneUAE}
            </a>

            <a
              href={BUSINESS_INFO.whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> Contact via WhatsApp
            </a>
          </div>
        </div>

        {/* Right: Technical Highlights Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
              alt="Medical steel instruments craftsmanship"
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover"
            />
            <div className="p-6 bg-white space-y-4">
              <h3 className="text-base font-bold font-['Jost',sans-serif] text-slate-900">
                Official Business Information
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Factory Address:</span>
                    <span>{BUSINESS_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Direct Telephone Lines:</span>
                    <a href={`tel:${BUSINESS_INFO.phonePakistan.replace(/\s+/g, '')}`} className="text-slate-800 hover:underline block">
                      Pakistan: {BUSINESS_INFO.phonePakistan}
                    </a>
                    <a href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`} className="text-red-600 font-semibold hover:underline block">
                      UAE: {BUSINESS_INFO.phoneUAE} (Call Now)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">Email Address:</span>
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="text-slate-800 hover:underline">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Production Workflow Pillars */}
      <RevealOnScroll direction="up" className="pt-8 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Quality Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Jost',sans-serif] text-slate-900">
            Manufacturing Discipline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Strict metallurgical adherence ensures every instrument withstands continuous clinical use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-mono font-bold text-red-600">01. FORGING & MACHINING</span>
            <h4 className="text-base font-bold text-slate-900">Drop Forged Metallurgy</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Medical grade AISI martensitic and austenitic stainless steel billets forged under high-pressure dies to align steel grain structure for supreme fracture resistance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-mono font-bold text-red-600">02. HEAT TREATMENT</span>
            <h4 className="text-base font-bold text-slate-900">Atmospheric Vacuum Hardening</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Controlled vacuum furnace heat-treatment prevents oxidation and brings cutting shears and forceps to ideal Rockwell C hardness ratings (up to 70+ HRC for Tungsten Carbide inserts).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-mono font-bold text-red-600">03. FINISHING & PASSIVATION</span>
            <h4 className="text-base font-bold text-slate-900">Ultrasonic Cleansing & Passivation</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Chemical passivation baths strip away exogenous iron deposits, forming a continuous chromium-oxide passive layer that renders instruments completely corrosion-free.
            </p>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};
