import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

interface LogoProps {
  variant?: 'full' | 'icon-only' | 'wordmark';
  theme?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandIcon: React.FC<{ size?: number; className?: string; theme?: 'dark' | 'light' }> = ({
  size = 36,
  className = '',
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:scale-105 ${className}`}
      aria-label={`${BRAND_CONFIG.companyName} Symbol`}
    >
      <defs>
        <linearGradient id="purenest-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#042F2E" />
        </linearGradient>
        <linearGradient id="purenest-water-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <filter id="purenest-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0D9488" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Rounded Hexagonal / Shield Tile */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill={isDark ? "url(#purenest-bg-grad)" : "#F0FDFA"}
        stroke={isDark ? "#14B8A6" : "#CCFBF1"}
        strokeWidth="1.5"
      />

      {/* Modern Home Roofline Arch */}
      <path
        d="M12 25L24 14L36 25"
        stroke={isDark ? "#99F6E4" : "#0D9488"}
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Supporting architectural base */}
      <path
        d="M16 23.5V34C16 35.1 16.9 36 18 36H30C31.1 36 32 35.1 32 34V23.5"
        stroke={isDark ? "#5EEAD4" : "#14B8A6"}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />

      {/* Central Droplet of Cleanliness */}
      <path
        d="M24 19.5C24 19.5 28 25.5 28 28.5C28 30.7 26.2 32.5 24 32.5C21.8 32.5 20 30.7 20 28.5C20 25.5 24 19.5 24 19.5Z"
        fill="url(#purenest-water-grad)"
        filter="url(#purenest-glow)"
      />

      {/* Pristine Sparkle Accent */}
      <path
        d="M34 11L35 13.5L37.5 14.5L35 15.5L34 18L33 15.5L30.5 14.5L33 13.5L34 11Z"
        fill={isDark ? "#FFFFFF" : "#0D9488"}
      />
      <circle cx="15" cy="15" r="1.5" fill={isDark ? "#5EEAD4" : "#14B8A6"} opacity="0.9" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
}) => {
  const isDark = theme === 'dark';

  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 44,
    xl: 52,
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  if (variant === 'icon-only') {
    return <BrandIcon size={iconSizes[size]} className={className} theme={theme} />;
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {variant !== 'wordmark' && (
        <BrandIcon size={iconSizes[size]} theme={theme} />
      )}
      <div className="flex flex-col">
        <span
          className={`font-heading font-extrabold tracking-tight leading-tight whitespace-nowrap ${textSizes[size]} ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Pure<span className="text-teal-600">Nest</span>
        </span>
        <span
          className={`text-[10px] uppercase font-semibold tracking-widest leading-none ${
            isDark ? 'text-teal-400' : 'text-slate-500'
          }`}
        >
          Cleaning Co.
        </span>
      </div>
    </div>
  );
};
