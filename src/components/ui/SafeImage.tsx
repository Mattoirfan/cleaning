import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Cleaning service photo',
  className = '',
  containerClassName = '',
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200/70 animate-pulse flex items-center justify-center z-10">
          <Sparkles className="w-6 h-6 text-teal-600/40 animate-spin" />
        </div>
      )}

      {hasError ? (
        <div className="w-full h-full min-h-[180px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-teal-900 to-slate-900 text-white">
          <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-teal-300" />
          </div>
          <span className="text-sm font-semibold text-teal-100 tracking-wide">
            {fallbackTitle || alt || 'PureNest Cleaning Co.'}
          </span>
          <span className="text-xs text-teal-300/80 mt-1">
            Pristine Residential & Commercial Care
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
