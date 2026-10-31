import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Sparkles, Clock } from 'lucide-react';

interface PriceEstimatorProps {
  onProceedToBooking?: (details: {
    serviceType: string;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    estimatedPrice: number;
    estimatedHours: number;
  }) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ onProceedToBooking }) => {
  const [propertyType, setPropertyType] = useState('residential');
  const [serviceType, setServiceType] = useState('deep-cleaning');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [frequency, setFrequency] = useState('one-time'); // 'one-time', 'bi-weekly', 'monthly'

  // Dynamic pricing calculation
  let basePrice = 110;
  if (serviceType === 'deep-cleaning') basePrice = 210;
  if (serviceType === 'move-in-out') basePrice = 260;
  if (serviceType === 'commercial') basePrice = 180;

  const bedroomCost = bedrooms * 25;
  const bathroomCost = bathrooms * 35;
  let subtotal = basePrice + bedroomCost + bathroomCost;

  // Frequency discounts
  let discountMultiplier = 1;
  let discountLabel = '';
  if (frequency === 'bi-weekly') {
    discountMultiplier = 0.85; // 15% off
    discountLabel = '15% Recurring Discount';
  } else if (frequency === 'weekly') {
    discountMultiplier = 0.75; // 25% off
    discountLabel = '25% Weekly Discount';
  } else if (frequency === 'monthly') {
    discountMultiplier = 0.90; // 10% off
    discountLabel = '10% Monthly Discount';
  }

  const finalPrice = Math.round(subtotal * discountMultiplier);
  const estimatedHours = Math.max(2, Math.round((2 + bedrooms * 0.5 + bathrooms * 0.75) * 10) / 10);

  const handleBook = () => {
    if (onProceedToBooking) {
      onProceedToBooking({
        serviceType,
        propertyType,
        bedrooms,
        bathrooms,
        estimatedPrice: finalPrice,
        estimatedHours,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-2 text-teal-700 text-xs font-semibold mb-2">
        <Calculator className="w-4 h-4" />
        <span>Instant Transparent Estimate</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
        Custom Cleaning Price Estimator
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Service Type Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Cleaning Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'residential-regular', label: 'Standard' },
                { id: 'deep-cleaning', label: 'Deep Clean' },
                { id: 'move-in-out', label: 'Move In/Out' },
                { id: 'commercial', label: 'Commercial' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setServiceType(tier.id)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer whitespace-nowrap ${
                    serviceType === tier.id
                      ? 'border-teal-600 bg-teal-50 text-teal-800 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Bedrooms</span>
                <span className="text-teal-700">{bedrooms} {bedrooms === 1 ? 'bed' : 'beds'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setBedrooms(num)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md border text-center transition-colors cursor-pointer ${
                      bedrooms === num
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num === 5 ? '5+' : num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Bathrooms</span>
                <span className="text-teal-700">{bathrooms} {bathrooms === 1 ? 'bath' : 'baths'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setBathrooms(num)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md border text-center transition-colors cursor-pointer ${
                      bathrooms === num
                        ? 'bg-teal-700 text-white border-teal-700'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num === 4 ? '4+' : num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Frequency selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Service Frequency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'one-time', label: 'One-Time' },
                { id: 'bi-weekly', label: 'Bi-Weekly (-15%)' },
                { id: 'weekly', label: 'Weekly (-25%)' },
              ].map((freq) => (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => setFrequency(freq.id)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer whitespace-nowrap ${
                    frequency === freq.id
                      ? 'border-teal-600 bg-teal-50 text-teal-800 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Quote Result Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-teal-300 mb-1">
              <span className="uppercase tracking-wider font-semibold">Estimated Quote</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~{estimatedHours} hrs
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl md:text-5xl font-extrabold text-white font-mono tracking-tight">
                ${finalPrice}
              </span>
              <span className="text-xs text-slate-400">
                / {frequency === 'one-time' ? 'flat rate' : 'clean'}
              </span>
            </div>

            {discountLabel && (
              <span className="inline-block mt-2 text-[11px] font-semibold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800">
                {discountLabel} applied
              </span>
            )}

            <div className="mt-5 space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>All eco-certified supplies and equipment provided</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>$2M bonded & insured with 24h satisfaction guarantee</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBook}
            className="w-full mt-6 py-3 px-4 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Proceed to Booking Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
