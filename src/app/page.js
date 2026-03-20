'use client';

import { useEffect } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import AmbientBackground from '@/components/AmbientBackground';
import PageLoader from '@/components/PageLoader';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import HeroSlider from '@/components/HeroSlider';
import ProductGrid from '@/components/ProductGrid';
import ProductDetail from '@/components/ProductDetail';
import AdminDashboard from '@/components/AdminDashboard';
import WhyChooseUs from '@/components/WhyChooseUs';
import FeedbackCarousel from '@/components/FeedbackCarousel';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import PaymentModal from '@/components/PaymentModal';
import AuthModal from '@/components/AuthModal';
import ProfileModal from '@/components/ProfileModal';
import SettingsModal from '@/components/SettingsModal';
import SearchModal from '@/components/SearchModal';
import WelcomeModal from '@/components/WelcomeModal';
import WarrantyModal from '@/components/WarrantyModal';
import TermsModal from '@/components/TermsModal';
import Toast from '@/components/Toast';

function AppContent() {
  const { currentView, isLoading, setSettingsOpen, setPaymentOpen, setAuthOpen, setProfileOpen, setSearchOpen, setWarrantyOpen, setTermsOpen, setWelcomeOpen, setCartOpen } = useApp();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSettingsOpen(false);
        setPaymentOpen(false);
        setAuthOpen(false);
        setProfileOpen(false);
        setSearchOpen(false);
        setWarrantyOpen(false);
        setTermsOpen(false);
        setWelcomeOpen(false);
        setCartOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setSettingsOpen, setPaymentOpen, setAuthOpen, setProfileOpen, setSearchOpen, setWarrantyOpen, setTermsOpen, setWelcomeOpen, setCartOpen]);

  return (
    <>
      <PageLoader />
      <AmbientBackground />
      <Header />

      {/* Main Content */}
      {currentView === 'home' && (
        <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-32 pb-12 transition-opacity duration-300 relative z-10">
          <HeroSlider />
          <ProductGrid />
          <WhyChooseUs />
          <FeedbackCarousel />
          <CTASection />
        </main>
      )}

      {currentView === 'product' && <ProductDetail />}
      {currentView === 'admin' && <AdminDashboard />}

      <Footer />
      <MobileNav />

      {/* Modals */}
      <CartDrawer />
      <PaymentModal />
      <AuthModal />
      <ProfileModal />
      <SettingsModal />
      <SearchModal />
      <WelcomeModal />
      <WarrantyModal />
      <TermsModal />
      <Toast />
    </>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
