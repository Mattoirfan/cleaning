import React, { useState } from 'react';
import { MapPin, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';

interface ServiceAreaCheckerProps {
  onSelectZip?: (zip: string) => void;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ onSelectZip }) => {
  const [inputZip, setInputZip] = useState('');
  const [checkedResult, setCheckedResult] = useState<{
    status: 'idle' | 'matched' | 'unmatched';
    areaName?: string;
    turnaround?: string;
  }>({ status: 'idle' });

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = inputZip.trim();
    if (!cleanZip) return;

    const match = BRAND_CONFIG.serviceAreas.find((area) =>
      area.postalCodes.includes(cleanZip)
    );

    if (match) {
      setCheckedResult({
        status: 'matched',
        areaName: match.name,
        turnaround: match.turnaround,
      });
      if (onSelectZip) onSelectZip(cleanZip);
    } else {
      setCheckedResult({
        status: 'unmatched',
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="max-w-xl mx-auto text-center mb-6">
        <div className="inline-flex items-center gap-2 text-teal-700 text-xs font-semibold mb-2">
          <MapPin className="w-4 h-4" />
          <span>Regional Availability</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
          Check Service Coverage in Your Area
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Enter your 5-digit ZIP code to confirm dispatch availability and route schedules.
        </p>
      </div>

      <form onSubmit={handleCheck} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            maxLength={5}
            value={inputZip}
            onChange={(e) => {
              setInputZip(e.target.value.replace(/\D/g, ''));
              setCheckedResult({ status: 'idle' });
            }}
            placeholder="e.g. 97201"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
        >
          Verify ZIP
        </button>
      </form>

      {/* Result feedback */}
      {checkedResult.status === 'matched' && (
        <div className="max-w-md mx-auto mt-4 p-3.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 flex items-start gap-3 text-xs">
          <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-teal-800 text-sm block">
              Great news! PureNest operates in your district.
            </span>
            <span className="text-teal-700">
              Assigned hub: <strong>{checkedResult.areaName}</strong> · Service frequency: {checkedResult.turnaround}.
            </span>
          </div>
        </div>
      )}

      {checkedResult.status === 'unmatched' && (
        <div className="max-w-md mx-auto mt-4 p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-800 text-sm block">
              ZIP code outside primary auto-dispatch zone
            </span>
            <span className="text-amber-700">
              We frequently service adjacent regions by custom arrangement. Please contact our team directly for a custom travel quote.
            </span>
          </div>
        </div>
      )}

      {/* Quick list of primary service zones */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3 text-center">
          Active Metro Hubs & Priority Routes
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {BRAND_CONFIG.serviceAreas.map((area) => (
            <div
              key={area.name}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-white transition-colors"
            >
              <div className="font-semibold text-slate-800">{area.name}</div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                ZIPs: {area.postalCodes.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
