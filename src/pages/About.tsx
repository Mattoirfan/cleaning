import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  Users,
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
  Smile,
} from 'lucide-react';
import { BRAND_CONFIG, TEAM_MEMBERS } from '../config/brand';
import { SafeImage } from '../components/ui/SafeImage';
import { PageRoute } from '../components/layout/Header';

interface AboutProps {
  onNavigate: (page: PageRoute) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 md:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Our Story & Mission</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Crafting Pristine Living Spaces <br className="hidden sm:inline" />
              <span className="text-teal-700">With Purpose & Care</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Founded in {BRAND_CONFIG.establishedYear}, {BRAND_CONFIG.companyName} was created out of a simple
              realization: modern cleaning services were either chaotic gig-economy apps with unknown
              subcontractors, or traditional services relying on caustic chemical fumes.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              We set out to build an elevated standard — where cleaning technicians are respected,
              career professionals; where botanical EPA-certified solutions replace toxic bleach; and
              where homeowners can step through their doors and breathe pure, uncompromised air.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>100% In-House Trained W-2 Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Zero Animal Testing Chemistry</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>$2,000,000 Liability Coverage</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 aspect-[4/3] lg:aspect-[1/1]">
              <SafeImage
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
                alt="Professional team and clean interior"
                fallbackTitle="PureNest Cleaning Co. Standard"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md text-white p-4 rounded-xl border border-slate-800 text-xs">
                <div className="font-semibold text-teal-300">Dedicated to Client Peace of Mind</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Every technician completes 80+ hours of white-glove training.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION, VISION & CORE VALUES */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-1">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Mission, Vision & Core Values
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              The values that dictate how we scrub, whom we hire, and how we treat our clients' homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Target className="w-6 h-6 text-teal-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To transform chaotic, hurried living environments into serene, hygienic sanctuaries
                through meticulous craftsmanship, non-toxic environmental stewardship, and heartfelt hospitality.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 text-teal-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                To become the gold standard of professional cleaning services in our region, proving
                that an ethical, living-wage workforce and hospital-grade organic standards deliver superior outcomes.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Award className="w-6 h-6 text-teal-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Core Values</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>Uncompromising Integrity:</strong> Total honesty with quotes and belongings.</li>
                <li>• <strong>Health First:</strong> No harsh aerosols or volatile organic compounds.</li>
                <li>• <strong>Meticulous Details:</strong> Cleaning what others overlook.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLEANING METHODS & PROTOCOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/3] bg-slate-100">
              <SafeImage
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80"
                alt="Hospital grade cleaning supplies and methods"
                fallbackTitle="PureNest Cleaning Methods & Chemistry"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block">
              The Science of Clean
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Hospitality Standards Meets Certified Green Chemistry
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We don't mask dust with artificial perfumes. Our method is engineered to physically extract
              particulate matter, bacteria, and allergens while protecting fine stone, unfinished wood,
              and delicate grout.
            </p>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-sm">
                    Color-Coded Microfiber Cross-Contamination System
                  </span>
                  <span className="text-slate-600">
                    Red cloths for toilet bowls, yellow for bathroom tiles, blue for glass/mirrors,
                    and green for kitchen counters. No cloth used in a bathroom ever enters your food prep space.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <Leaf className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-sm">
                    True HEPA-Filtration Vacuum Extraction
                  </span>
                  <span className="text-slate-600">
                    Traps 99.97% of airborne dust, pollen, mold spores, and pet dander down to 0.3 microns,
                    measurably improving indoor air quality with every visit.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROFESSIONAL TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-1">
            People Behind The Polish
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Leadership & Field Training Team
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            *Representative team profiles for demonstration purposes. Configurable in brand settings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <SafeImage
                  src={member.photoUrl}
                  alt={member.name}
                  fallbackTitle={member.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  {member.experience}
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                <div className="text-xs font-medium text-teal-700">{member.role}</div>
                <div className="text-[11px] text-slate-500 font-semibold">{member.specialty}</div>
                <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-teal-900 rounded-3xl p-8 sm:p-12 text-center text-white space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold">Ready to Experience PureNest in Your Home?</h3>
          <p className="text-sm text-teal-100/80 max-w-xl mx-auto">
            Schedule your initial clean today or talk to one of our service specialists.
            You'll receive a flat-rate quote in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-teal-950 font-bold rounded-lg text-sm transition-colors cursor-pointer"
            >
              Get Free Estimate
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="px-6 py-3 bg-teal-800 hover:bg-teal-700 text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer border border-teal-700"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
