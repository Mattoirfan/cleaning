import React from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { BRAND_CONFIG, SERVICES_CATALOG } from '../../config/brand';
import { PageRoute } from './Header';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenLegalModal: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLegalModal }) => {
  const currentYear = new Date().getFullYear();

  const handlePageClick = (page: PageRoute) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handlePageClick('home')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo variant="full" theme="dark" size="md" />
            </button>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {BRAND_CONFIG.shortDescription}
            </p>
            <div className="flex items-center gap-3 text-xs text-teal-400 bg-teal-950/60 border border-teal-900/60 px-3 py-2 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0 text-teal-300" />
              <span>$2,000,000 General Liability & Bond Coverage</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handlePageClick('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Free Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Cleaning Services
            </h4>
            <ul className="space-y-2 text-sm">
              {SERVICES_CATALOG.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => handlePageClick('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Service Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <a
                  href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
                  className="text-slate-300 hover:text-white font-medium"
                >
                  {BRAND_CONFIG.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="text-slate-300 hover:text-white"
                >
                  {BRAND_CONFIG.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  {BRAND_CONFIG.contact.addressLine1}, {BRAND_CONFIG.contact.cityStateZip}
                </span>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-slate-900">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="block text-slate-300 font-medium">Mon – Fri: 7:30 AM – 7:00 PM</span>
                  <span className="block text-slate-500">Sat: 8:00 AM – 5:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {BRAND_CONFIG.companyName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                onOpenLegalModal(
                  'Privacy Policy',
                  'PureNest Cleaning Co. is committed to protecting your privacy. We collect client contact details and property specifications solely to provide cleaning estimates and schedule technician visits. We never sell or distribute your data to third parties.'
                )
              }
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() =>
                onOpenLegalModal(
                  'Terms of Service',
                  'Appointments can be rescheduled or cancelled up to 24 hours prior to service time with zero penalty. If you are not 100% satisfied with your cleaning, notify us within 24 hours for a complimentary reclean of the requested areas.'
                )
              }
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() =>
                onOpenLegalModal(
                  'Safety & Insurance Credentials',
                  'PureNest Cleaning Services LLC maintains active commercial general liability insurance ($2,000,000 policy) and bonding. Proof of insurance certificates can be provided upon request for commercial property management compliance.'
                )
              }
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Insurance & Bonding
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
