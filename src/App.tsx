import React, { useState, useEffect } from 'react';
import { Header, PageRoute } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BrandAssetModal } from './components/brand/BrandAssetModal';
import { LegalModal } from './components/common/LegalModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('residential-regular');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isBrandAssetOpen, setIsBrandAssetOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
  }>({
    isOpen: false,
    title: '',
    content: '',
  });

  // Handle URL hash routing for browser back/forward and direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'about', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageRoute);
      } else if (hash === 'admin') {
        setIsAdminOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    if (page === 'admin') {
      setIsAdminOpen(true);
      return;
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleNavigate('contact');
  };

  const handleOpenLegalModal = (title: string, content: string) => {
    setLegalModalState({
      isOpen: true,
      title,
      content,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-teal-600 selection:text-white">
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleNavigate('contact')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            onNavigate={handleNavigate}
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onOpenBooking={() => handleNavigate('contact')}
          />
        )}

        {currentPage === 'services' && (
          <Services
            onNavigate={handleNavigate}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentPage === 'about' && (
          <About onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <Contact preselectedServiceId={selectedServiceId} />
        )}
      </main>

      {/* Subtle Brand Asset button floating quietly at bottom-left */}
      <div className="fixed bottom-4 left-4 z-30">
        <button
          onClick={() => setIsBrandAssetOpen(true)}
          className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold rounded-lg shadow-md border border-slate-200 backdrop-blur-xs flex items-center gap-1.5 transition-all cursor-pointer hover:border-teal-400"
          title="Inspect & Export Brand SVG Assets"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Brand Assets (SVG)</span>
        </button>
      </div>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegalModal={handleOpenLegalModal}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.location.hash = currentPage;
          }
        }}
      />

      {/* Brand Asset SVG Export Modal */}
      <BrandAssetModal
        isOpen={isBrandAssetOpen}
        onClose={() => setIsBrandAssetOpen(false)}
      />

      {/* Legal Dialog Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        title={legalModalState.title}
        content={legalModalState.content}
        onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
