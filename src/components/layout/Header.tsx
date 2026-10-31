import React, { useState } from 'react';
import { Menu, X, Phone, Lock, Calendar } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { BRAND_CONFIG } from '../../config/brand';

export type PageRoute = 'home' | 'services' | 'about' | 'contact' | 'admin';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-teal-400 font-medium">Licensed, Bonded & Insured ($2M)</span>
            <span className="hidden md:inline text-slate-600">·</span>
            <span className="hidden md:inline text-slate-400">100% Satisfaction Guarantee</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${BRAND_CONFIG.contact.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span className="font-medium">{BRAND_CONFIG.contact.phone}</span>
            </a>
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-slate-400 hover:text-teal-300 flex items-center gap-1 transition-colors cursor-pointer"
              title="Staff & Dispatch Access"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark & emblem */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left cursor-pointer focus:outline-none shrink-0"
          aria-label="PureNest Cleaning Co. Home"
        >
          <Logo variant="full" size="md" />
        </button>

        {/* Zone 2: Navigation Links (single-line, clean text with active indicator) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer relative py-2 ${
                  isActive
                    ? 'text-teal-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-150 flex items-center gap-2 cursor-pointer active:scale-98 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 text-teal-200" />
            <span>Get a Free Quote</span>
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 px-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                  currentPage === link.id
                    ? 'bg-teal-50 text-teal-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-teal-700 text-white font-semibold rounded-lg text-center cursor-pointer shadow-sm"
            >
              Get a Free Quote
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Staff Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
