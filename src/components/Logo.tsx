import React, { useState } from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'md', 
  onClick, 
  className = '' 
}) => {
  const isLight = variant === 'light';
  const [logoSrc, setLogoSrc] = useState('https://glamourenterprize.com/images/logo.png');
  const [hasError, setHasError] = useState(false);

  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-12 sm:h-14',
  }[size];

  const handleImageError = () => {
    // If external URL fails, fallback to locally saved public/images/logo.png
    if (logoSrc !== '/images/logo.png') {
      setLogoSrc('/images/logo.png');
    } else {
      setHasError(true);
    }
  };

  return (
    <div 
      id="brand-logo"
      onClick={onClick} 
      className={`inline-flex items-center cursor-pointer select-none group transition-transform active:scale-95 ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Glamour Enterprises Home"
    >
      {!hasError ? (
        <div className={isLight ? 'bg-white rounded-xl px-2.5 py-1.5 shadow-xs border border-white/20 inline-flex items-center' : 'inline-flex items-center'}>
          <img
            src={logoSrc}
            alt="Glamour Enterprises"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className={`${heightClasses} w-auto object-contain transition-opacity duration-200 group-hover:opacity-90`}
          />
        </div>
      ) : (
        /* Crisp vector fallback if image loading fails */
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-800 text-white shadow-md font-['Jost',sans-serif] font-black text-lg">
            GE
          </div>
          <div className="flex flex-col leading-tight">
            <span className={`font-['Jost',sans-serif] font-extrabold text-lg ${isLight ? 'text-white' : 'text-slate-900 group-hover:text-red-600'}`}>
              GLAMOUR
            </span>
            <span className="font-['Jost',sans-serif] font-bold text-[10px] tracking-[0.22em] text-red-600 uppercase">
              ENTERPRISE
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

