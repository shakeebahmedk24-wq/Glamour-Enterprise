import React from 'react';
import { MessageSquare } from 'lucide-react';
import { BUSINESS_INFO } from '../data/categoriesData';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group">
      <a
        href={BUSINESS_INFO.whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl shadow-emerald-900/30 hover:shadow-2xl transition-all duration-300 active:scale-95"
        aria-label="Direct WhatsApp Chat with Glamour Enterprises Factory"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-white text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-600 animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-600"></span>
        </div>
        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[10px] text-emerald-100 font-semibold uppercase tracking-wider leading-none">
            Direct WhatsApp
          </span>
          <span className="text-xs font-bold leading-tight">
            Chat with Factory
          </span>
        </div>
      </a>
    </div>
  );
};
