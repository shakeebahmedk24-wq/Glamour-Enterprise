import React from 'react';
import { Star, ShieldCheck, MapPin, Building } from 'lucide-react';
import { CLIENT_REVIEWS } from '../data/categoriesData';

export const ReviewsMarquee: React.FC = () => {
  // Duplicate reviews array for infinite seamless looping
  const marqueeItems = [...CLIENT_REVIEWS, ...CLIENT_REVIEWS];

  return (
    <section className="py-12 bg-slate-900 text-white overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Global Client Satisfaction
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Jost',sans-serif] text-white">
            International Hospital & Distributor Feedback
          </h3>
        </div>
        <p className="text-xs text-slate-400 max-w-sm">
          Precision surgical supply partner reviews from Europe, the Middle East, and Asia-Pacific healthcare networks.
        </p>
      </div>

      {/* Marquee Track - Smooth continuous animation on mobile & desktop */}
      <div className="relative w-full overflow-hidden mask-linear">
        {/* Left and Right edge fade masks */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[290px] sm:w-[360px] p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-red-500/50 flex flex-col justify-between transition-colors flex-shrink-0"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 font-mono ml-1.5">5.0</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between">
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-white">
                    {review.author}
                  </h5>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Building className="w-3 h-3 text-slate-500" />
                    <span>{review.organization}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>{review.location.split(',')[1]?.trim() || review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
