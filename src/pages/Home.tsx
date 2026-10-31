import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  HeartHandshake,
  Leaf,
  ChevronDown,
  Star,
  Calendar,
  Building2,
  Home as HomeIcon,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { BRAND_CONFIG, SERVICES_CATALOG, TESTIMONIALS_SAMPLE, FAQ_DATA } from '../config/brand';
import { BeforeAfterSlider } from '../components/home/BeforeAfterSlider';
import { ServiceAreaChecker } from '../components/home/ServiceAreaChecker';
import { PriceEstimator } from '../components/common/PriceEstimator';
import { SafeImage } from '../components/ui/SafeImage';
import { PageRoute } from '../components/layout/Header';

interface HomeProps {
  onNavigate: (page: PageRoute) => void;
  onSelectServiceForBooking: (serviceId: string) => void;
  onOpenBooking: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onSelectServiceForBooking,
  onOpenBooking,
}) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleBookService = (serviceId: string) => {
    onSelectServiceForBooking(serviceId);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 md:space-y-28">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-12 md:py-16 overflow-hidden">
        {/* Soft subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-50/80 to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Premier Residential & Commercial Cleaning</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
                A Cleaner Space. <br />
                <span className="text-teal-700">A Better Everyday.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Experience meticulous, hotel-grade cleaning tailored to your home and business. 
                Vetted cleaning professionals, EPA-certified non-toxic products, and upfront 
                transparent pricing with zero hidden fees.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Calendar className="w-4 h-4 text-teal-200" />
                  <span>Book a Cleaning</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-lg border border-slate-300 hover:border-slate-400 transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Explore Our Services</span>
                </button>
              </div>

              {/* Trust Indicators Strip */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-medium">$2M Bonded & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-medium">100% Vetted W-2 Staff</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-medium">Eco-Friendly & Pet Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-medium">24h Reclean Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-[4/3] lg:aspect-[1/1]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
                  alt="Spotless sunlit living room cleaned by PureNest Cleaning Co."
                  fallbackTitle="Pristine Living Room After PureNest Detail"
                  className="w-full h-full object-cover"
                />

                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200/90 shadow-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold shrink-0">
                      ★ 4.9
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Over 3,500+ Homes Cleaned</div>
                      <div className="text-slate-500 text-[11px]">Consistent 5-star customer feedback</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-teal-700 hover:text-teal-900 font-semibold cursor-pointer whitespace-nowrap ml-2"
                  >
                    Get Quote →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR CLEANING SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
              <span>Tailored Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Popular Cleaning Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-sm font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Service Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Asymmetric Bento-style Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CATALOG.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <SafeImage
                    src={service.imageUrl}
                    alt={service.name}
                    fallbackTitle={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {service.popular && (
                    <span className="absolute top-3 right-3 bg-teal-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      Most Requested
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 pt-2 text-xs text-slate-600">
                    {service.inclusions.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                    Starting from
                  </span>
                  <span className="text-lg font-bold text-slate-900 font-mono">
                    ${service.startingPrice}
                  </span>
                </div>
                <button
                  onClick={() => handleBookService(service.id)}
                  className="px-4 py-2 bg-slate-900 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider block mb-2">
              The PureNest Standard
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Why Hundreds of Homeowners & Businesses Rely on PureNest
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2">
              We reject high worker turnover and harsh chemical shortcuts. Our company was built 
              around respect for your living space and well-trained career cleaners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Zero-Toxin Botanical Care</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We exclusively use EPA Safer Choice certified solutions. Safe for babies, cats, 
                dogs, and chemically sensitive individuals.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">80-Hour Certified Cleaners</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full W-2 employees vetted through multi-state criminal background checks, insured up 
                to $2M, and trained in fine stone and wood care.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">100% Satisfaction Guarantee</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Not fully thrilled with any spot? Notify us within 24 hours and a lead supervisor 
                will return to reclean the area free of charge.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Flexible On-Time Scheduling</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive 15-minute SMS arrival alerts. Convenient keyless entry management for when 
                you are away at work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE-STEP BOOKING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-2">
            Effortless Experience
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No phone tag, no ambiguous hourly fees. Schedule your cleaning in under two minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm relative">
            <div className="w-12 h-12 mx-auto rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold flex items-center justify-center text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Customize Your Clean</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select your service type, home size, and preferred schedule. Choose helpful add-ons like 
              inside oven or refrigerator detailing.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm relative">
            <div className="w-12 h-12 mx-auto rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold flex items-center justify-center text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">We Dispatch Vetted Pros</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our insured technicians arrive on time with commercial HEPA vacuums and EPA-certified 
              supplies. Relax or run your daily errands.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm relative">
            <div className="w-12 h-12 mx-auto rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold flex items-center justify-center text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">Enjoy Your Spotless Space</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Walk into a revitalized sanctuary that smells naturally fresh. If anything is amiss, 
              our 24h guarantee ensures an immediate reclean.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE BEFORE-AND-AFTER GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-2">
            Proven Results
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Real Transformations Before & After
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Drag the interactive slider to see how our detail-oriented specialists restore dull 
            and neglected surfaces.
          </p>
        </div>

        <BeforeAfterSlider />
      </section>

      {/* 6. INSTANT ESTIMATOR WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <PriceEstimator
          onProceedToBooking={(calcData) => {
            onSelectServiceForBooking(calcData.serviceType);
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-2">
            Client Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Trusted by Homeowners & Local Businesses
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            *Demonstration client testimonials reflecting genuine customer experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_SAMPLE.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="font-semibold text-xs text-slate-900">{test.author}</div>
                <div className="text-[11px] text-slate-500">{test.role} · {test.location}</div>
                <div className="text-[10px] text-teal-700 font-medium mt-1">{test.service}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SERVICE AREA COVERAGE CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <ServiceAreaChecker
          onSelectZip={(zip) => {
            onNavigate('contact');
          }}
        />
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-2">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-teal-700 cursor-pointer"
                >
                  <span className="text-sm md:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-700' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <div className="rounded-3xl bg-gradient-to-br from-teal-900 via-teal-950 to-slate-950 text-white p-8 md:p-14 border border-teal-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-teal-300 text-xs uppercase tracking-wider font-semibold">
              Ready For Spotless Simplicity?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Reclaim Your Free Time with PureNest Cleaning Co.
            </h2>
            <p className="text-teal-100/80 text-sm leading-relaxed">
              Book online in 60 seconds or speak directly with our concierge team. Every appointment 
              is backed by our $2M insurance and 100% satisfaction guarantee.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Get Your Free Quote</span>
            </button>
            <a
              href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                BRAND_CONFIG.contact.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white font-semibold rounded-lg border border-teal-500/30 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
