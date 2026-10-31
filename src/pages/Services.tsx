import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle,
  Building,
  Home as HomeIcon,
  Repeat,
  PackagePlus,
  Check,
  X as XIcon,
} from 'lucide-react';
import { SERVICES_CATALOG, BRAND_CONFIG, ServiceDetail } from '../config/brand';
import { SafeImage } from '../components/ui/SafeImage';
import { PageRoute } from '../components/layout/Header';

interface ServicesProps {
  onNavigate: (page: PageRoute) => void;
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({
  onNavigate,
  onSelectServiceForBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial' | 'specialized'>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_CATALOG
    : SERVICES_CATALOG.filter((s) => s.category === activeCategory);

  const handleEnquire = (serviceId: string) => {
    onSelectServiceForBooking(serviceId);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 md:space-y-24 py-8">
      {/* 1. HERO HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Comprehensive Cleaning Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Professional Cleaning Services <br className="hidden sm:inline" />
            <span className="text-teal-700">Engineered for Flawless Living</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From recurring residential care to exhaustive turnover sanitization and corporate facility
            maintenance, every PureNest service is executed with hospital-grade non-toxic chemistry
            and verified checklists.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 p-1.5 bg-slate-100 rounded-xl max-w-md mx-auto mt-6">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'specialized', label: 'Move In/Out & Add-ons' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-white text-teal-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DETAILED SERVICE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-12">
          {filteredServices.map((service, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.slug}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-all p-6 sm:p-8 lg:p-10"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Column */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-sm group">
                      <SafeImage
                        src={service.imageUrl}
                        alt={service.name}
                        fallbackTitle={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        Est. Duration: {service.durationEstimate}
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className={`lg:col-span-7 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                          {service.category.toUpperCase()}
                        </span>
                        {service.popular && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                            Client Favorite
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {service.name}
                      </h2>
                      <p className="text-sm font-medium text-teal-800">
                        {service.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.fullDescription}
                    </p>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                      <span className="font-semibold text-slate-800 block mb-1">
                        Best Suited For:
                      </span>
                      <span className="text-slate-600">{service.idealFor}</span>
                    </div>

                    {/* What's Included Checklist */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
                        Standard Inclusions & Checklist:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        {service.inclusions.map((inclusion, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>{inclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA Strip */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-[11px] text-slate-500 uppercase tracking-wider">
                          Transparent Pricing
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-slate-900 font-mono">
                            ${service.startingPrice}
                          </span>
                          <span className="text-xs text-slate-500 font-normal">
                            ({service.priceNote})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEnquire(service.id)}
                          className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          <span>Book This Service</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. COMPARISON MATRIX (Standard vs Deep Clean vs Move Out) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
              Detailed Transparency
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              Service Scope Comparison Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Compare standard maintenance with our deep detailing and move-out turnover programs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 font-semibold text-slate-900">Cleaning Task</th>
                  <th className="py-3 px-4 font-semibold text-slate-800 text-center">Residential Standard</th>
                  <th className="py-3 px-4 font-semibold text-teal-800 text-center bg-teal-50/50">Intensive Deep Clean</th>
                  <th className="py-3 px-4 font-semibold text-slate-800 text-center">Move In / Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {[
                  { task: 'Kitchen countertops, sink & exterior appliances', standard: true, deep: true, move: true },
                  { task: 'Bathroom showers, tubs, toilets & faucets sanitized', standard: true, deep: true, move: true },
                  { task: 'All accessible floors vacuumed & damp-mopped', standard: true, deep: true, move: true },
                  { task: 'High and low dusting (fans, frames, light fixtures)', standard: true, deep: true, move: true },
                  { task: 'Hand-washing all baseboards, door moldings & trim', standard: false, deep: true, move: true },
                  { task: 'Heavy soap scum & mineral descaling in tile grout', standard: false, deep: true, move: true },
                  { task: 'Degreasing range vent hood & stovetop details', standard: false, deep: true, move: true },
                  { task: 'Cleaning inside empty kitchen drawers and cabinets', standard: false, deep: false, move: true },
                  { task: 'Cleaning inside refrigerator & oven interior', standard: 'Add-on', deep: 'Add-on', move: true },
                  { task: 'Wiping down inside empty closet shelving', standard: false, deep: false, move: true },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-800">{row.task}</td>
                    <td className="py-3 px-4 text-center">
                      {row.standard === true ? (
                        <Check className="w-4 h-4 text-teal-600 mx-auto" />
                      ) : row.standard === 'Add-on' ? (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Optional</span>
                      ) : (
                        <XIcon className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center bg-teal-50/30">
                      {row.deep === true ? (
                        <Check className="w-4 h-4 text-teal-600 mx-auto" />
                      ) : row.deep === 'Add-on' ? (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Optional</span>
                      ) : (
                        <XIcon className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.move === true ? (
                        <Check className="w-4 h-4 text-teal-600 mx-auto" />
                      ) : (
                        <XIcon className="w-4 h-4 text-slate-300 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold">Need a Custom Commercial or Event Scope?</h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            We provide tailored proposals for medical practices, retail flagship spaces, post-construction
            final wipe-downs, and Airbnb turnover programs.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                onSelectServiceForBooking('commercial-office');
                onNavigate('contact');
              }}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer"
            >
              Request Custom Proposal
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
