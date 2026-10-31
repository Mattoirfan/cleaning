import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImg: string;
  afterImg: string;
  description: string;
}

const COMPARISONS: BeforeAfterItem[] = [
  {
    id: 'kitchen-restoration',
    title: 'Gourmet Kitchen Deep Scrub',
    category: 'Deep Cleaning',
    beforeLabel: 'Before: Heavy grease, dull stone & surface buildup',
    afterLabel: 'After: Sanitized quartz, gleaming stainless steel & streak-free tiles',
    beforeImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=70',
    afterImg: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    description: '4-hour deep kitchen restoration including oven interior, cooktop degreasing, and grout line brightening.',
  },
  {
    id: 'living-turnover',
    title: 'Executive Living Room Turnover',
    category: 'Residential Care',
    beforeLabel: 'Before: Dust accumulation, scuffed floor & cluttered surfaces',
    afterLabel: 'After: High-filtration HEPA vacuumed, polished wood & curated air freshness',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=70',
    afterImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    description: 'Signature maintenance clean with non-toxic botanical solutions and anti-allergen HEPA sweep.',
  },
  {
    id: 'bathroom-renewal',
    title: 'Master Bath Grout & Glass Renewal',
    category: 'Restorative Clean',
    beforeLabel: 'Before: Hard water stains, soap scum & neglected baseboards',
    afterLabel: 'After: Sparkling crystal shower door, disinfected porcelain & sanitized grout',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=70',
    afterImg: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    description: 'Eco-acid descaling treatment that dissolves mineral deposits without damaging delicate chrome fixtures.',
  },
];

export const BeforeAfterSlider: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = COMPARISONS[selectedIdx];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full">
      {/* Tab Selectors */}
      <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
        {COMPARISONS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedIdx(idx);
              setSliderPos(50);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
              selectedIdx === idx
                ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-300 hover:text-teal-700'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Main Comparison Canvas */}
      <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl select-none">
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/10] cursor-ew-resize overflow-hidden"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER Image (Full background) */}
          <img
            src={active.afterImg}
            alt={active.afterLabel}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover select-none"
          />

          {/* After Label */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-md bg-teal-900/90 text-teal-100 text-xs font-medium tracking-wide border border-teal-500/30 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>After PureNest Detail</span>
          </div>

          {/* BEFORE Image (Clipped by slider position) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
              <img
                src={active.beforeImg}
                alt={active.beforeLabel}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover filter saturate-75 brightness-90 select-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              />
            </div>
            {/* Before Label */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-md bg-slate-900/90 text-slate-200 text-xs font-medium tracking-wide border border-slate-700 flex items-center gap-1.5 shadow-sm">
              <span>Before Cleaning</span>
            </div>
          </div>

          {/* Divider Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-2xl"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-teal-800 shadow-lg border border-slate-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
              <MoveHorizontal className="w-4 h-4 text-teal-700" />
            </div>
          </div>
        </div>

        {/* Drag Hint & Info bar */}
        <div className="bg-slate-900 text-slate-300 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-slate-800">
          <div>
            <span className="font-semibold text-white text-sm">{active.title}</span>
            <span className="text-slate-400 block mt-0.5">{active.description}</span>
          </div>
          <div className="flex items-center gap-2 text-teal-400 shrink-0">
            <MoveHorizontal className="w-4 h-4 animate-pulse" />
            <span>Drag slider to compare transformation</span>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-500 mt-3">
        *Sample demonstration portfolio. Individual service times vary by property condition.
      </p>
    </div>
  );
};
