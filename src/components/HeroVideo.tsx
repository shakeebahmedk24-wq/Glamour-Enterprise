import React, { useEffect, useState, useRef } from 'react';
import { Play, ArrowRight, ShieldCheck, PhoneCall, Sparkles, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/categoriesData';

interface HeroVideoProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onExploreProducts,
  onContactClick,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Scroll parallax listener
    const handleScroll = () => {
      if (!mediaQuery.matches) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax layer depths
  const backgroundY = prefersReducedMotion ? 0 : Math.min(scrollY * 0.35, 120);
  const contentY = prefersReducedMotion ? 0 : Math.min(scrollY * 0.15, 60);
  const badgeY = prefersReducedMotion ? 0 : Math.min(-scrollY * 0.1, 40);

  // Reliable, high-resolution cinematic surgical steel & operating theater craftsmanship video
  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-surgeon-with-gloves-in-the-operating-room-42861-large.mp4';
  const posterUrl = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80';

  return (
    <div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] w-full overflow-hidden bg-slate-950 flex items-center">
      {/* Background Video Layer with Parallax Transform */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(0, ${backgroundY}px, 0)`,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl}
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover opacity-35 filter contrast-110 brightness-90 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-40' : 'opacity-25'
          }`}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Precision Mesh & Vignette Overlays for High-End Brushed Metal Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/50"></div>
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/60 to-slate-950"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* Floating Graphic Layer (Layer 2 Parallax) */}
      <div 
        className="absolute right-4 lg:right-16 top-1/4 hidden md:block pointer-events-none"
        style={{ transform: `translate3d(0, ${badgeY}px, 0)` }}
      >
        <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-2xl max-w-xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">Material Grade</span>
              <span className="text-xs font-bold text-white font-mono">AISI 420 & 440 Stainless Steel</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Vacuum heat treated, ultrasonic passivated, and hand-finished in Sialkot, Pakistan.
          </p>
        </div>
      </div>

      {/* Hero Foreground Content (Layer 3 Parallax) */}
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-white w-full"
        style={{ transform: `translate3d(0, ${contentY}px, 0)` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow badge - Responsive single-line pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm max-w-full">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="font-semibold text-white whitespace-nowrap truncate">
                Sialkot Manufacturing Hub
              </span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-300 hidden sm:inline whitespace-nowrap">
                Direct Export Dispatch
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Jost',sans-serif] tracking-tight leading-[1.1] text-white">
              Precision Surgical & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-rose-300">
                Medical Instruments
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Manufacturer and exporter of surgical, dental, orthopedic, veterinary, ophthalmology, and beauty instruments, tungsten carbide instruments, and stainless steel hollow wares.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 transition-all group"
              >
                <span>Explore Products Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phoneUAE.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm sm:text-base rounded-xl backdrop-blur-md transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-red-500" />
                <span>Call Now: {BUSINESS_INFO.phoneUAE}</span>
              </a>

              <button
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-slate-300 hover:text-white font-medium text-sm transition-colors hover:underline text-center"
              >
                Factory Address & Inquiries →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900/80 backdrop-blur-md p-2.5 sm:p-3 shadow-2xl shadow-black/60 group">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
                  alt="Certified Surgical & Medical Instruments - Glamour Enterprises"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

                {/* Floating Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-semibold text-slate-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                  <span>Certified Surgical Steel</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-['Jost',sans-serif]">
                      Operating Theater Grade
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800/80 px-1.5 py-0.5 rounded">
                      AISI 420 / 440
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Vacuum heat-treated & ultrasonic passivated instruments crafted in Sialkot, Pakistan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Specifications Bar */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-800/80">
          <div>
            <span className="block text-xl sm:text-2xl font-bold font-['Jost',sans-serif] text-white">
              AISI 420/440
            </span>
            <span className="text-xs text-slate-400">German Steel Grade</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-bold font-['Jost',sans-serif] text-white">
              70+ HRC
            </span>
            <span className="text-xs text-slate-400">Tungsten Carbide Inserts</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-bold font-['Jost',sans-serif] text-white">
              8 Categories
            </span>
            <span className="text-xs text-slate-400">Surgical to Hollow Wares</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-bold font-['Jost',sans-serif] text-emerald-400">
              Direct Export
            </span>
            <span className="text-xs text-slate-400">Worldwide Port Dispatch</span>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade to Page Body */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
    </div>
  );
};
