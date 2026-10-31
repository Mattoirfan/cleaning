import React, { useState } from 'react';
import { X, Copy, Check, Download, Sparkles } from 'lucide-react';
import { Logo, BrandIcon } from './Logo';

interface BrandAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAssetModal: React.FC<BrandAssetModalProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const fullSvgCode = `<svg width="240" height="48" viewBox="0 0 240 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="purenest-water-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2DD4BF" />
      <stop offset="100%" stop-color="#0D9488" />
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="44" height="44" rx="12" fill="#F0FDFA" stroke="#CCFBF1" stroke-width="1.5"/>
  <path d="M12 25L24 14L36 25" stroke="#0D9488" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 23.5V34C16 35.1 16.9 36 18 36H30C31.1 36 32 35.1 32 34V23.5" stroke="#14B8A6" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M24 19.5C24 19.5 28 25.5 28 28.5C28 30.7 26.2 32.5 24 32.5C21.8 32.5 20 30.7 20 28.5C20 25.5 24 19.5 24 19.5Z" fill="url(#purenest-water-grad)"/>
  <path d="M34 11L35 13.5L37.5 14.5L35 15.5L34 18L33 15.5L30.5 14.5L33 13.5L34 11Z" fill="#0D9488"/>
  <text x="56" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#0F172A">Pure<tspan fill="#0D9488">Nest</tspan></text>
  <text x="56" y="40" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="#64748B">CLEANING CO.</text>
</svg>`;

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <h3 className="text-sm font-bold">PureNest Brand Identity & SVG Assets</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Logo Variations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light Mode Variation */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-3">
                  Light Theme Wordmark
                </span>
                <div className="py-4">
                  <Logo variant="full" theme="light" size="lg" />
                </div>
              </div>
              <button
                onClick={() => copyCode(fullSvgCode, 'light')}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId === 'light' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'light' ? 'SVG Copied!' : 'Copy SVG Code'}</span>
              </button>
            </div>

            {/* Dark Mode Variation */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider block mb-3">
                  Dark Theme Wordmark
                </span>
                <div className="py-4">
                  <Logo variant="full" theme="dark" size="lg" />
                </div>
              </div>
              <button
                onClick={() => copyCode(fullSvgCode, 'dark')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId === 'dark' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'dark' ? 'SVG Copied!' : 'Copy SVG Code'}</span>
              </button>
            </div>
          </div>

          {/* Icon Only & Favicon */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <BrandIcon size={44} theme="light" />
              <div>
                <div className="font-semibold text-slate-900">App Favicon & Compact Icon</div>
                <div className="text-slate-500 text-[11px]">Saved at /public/favicon.svg (48x48 vector)</div>
              </div>
            </div>
            <a
              href="/favicon.svg"
              download="purenest_favicon.svg"
              className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-100 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download SVG</span>
            </a>
          </div>

          {/* Raw SVG Source Display */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Inline SVG Source Code
            </span>
            <pre className="p-4 bg-slate-900 text-teal-300 rounded-xl text-[11px] font-mono overflow-x-auto leading-relaxed max-h-44">
              {fullSvgCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
