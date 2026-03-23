'use client';

import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import AmbientBackground from '@/components/AmbientBackground';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import PaymentModal from '@/components/PaymentModal';
import ProfileModal from '@/components/ProfileModal';
import SettingsModal from '@/components/SettingsModal';
import SearchModal from '@/components/SearchModal';
import WelcomeModal from '@/components/WelcomeModal';
import WarrantyModal from '@/components/WarrantyModal';
import TermsModal from '@/components/TermsModal';
import Toast from '@/components/Toast';

export default function SharedLayout({ children }) {
  const { setSettingsOpen, setPaymentOpen, setProfileOpen, setSearchOpen, setWarrantyOpen, setTermsOpen, setWelcomeOpen, setCartOpen } = useApp();

  // Escape key handler  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSettingsOpen(false);
        setPaymentOpen(false);
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
  }, [setSettingsOpen, setPaymentOpen, setProfileOpen, setSearchOpen, setWarrantyOpen, setTermsOpen, setWelcomeOpen, setCartOpen]);

  return (
    <>
      <AmbientBackground />
      <Header />
      {children}
      <Footer />
      <MobileNav />

      {/* Modals */}
      <CartDrawer />
      <PaymentModal />
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
