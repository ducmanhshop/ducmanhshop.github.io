'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { supabaseClient } from '@/lib/supabase';
import { ADMIN_EMAILS } from '@/lib/config';
import { getTodayStr } from '@/lib/utils';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // State
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [warrantyOpen, setWarrantyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const toastTimeoutRef = useRef(null);

  // Toast
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastVisible(false), 3000);
  }, []);

  // Tracking
  const trackAction = useCallback(async (type, amount = 0) => {
    const today = getTodayStr();
    if (type === 'visit') {
      if (typeof window !== 'undefined' && sessionStorage.getItem('visited_today')) return;
      if (typeof window !== 'undefined') sessionStorage.setItem('visited_today', 'true');
    }
    try {
      if (supabaseClient) {
        await supabaseClient.rpc('increment_stat', {
          p_date: today,
          p_type: type,
          p_amount: type === 'order' ? parseInt(amount) : 0,
        });
      }
    } catch (e) {
      console.error("Lỗi gửi tracking:", e);
    }
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    if (!supabaseClient) return;
    try {
      const { data, error } = await supabaseClient.from('products').select('*');
      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Lỗi Fetch:", err.message);
      setProducts([]);
      showToast("Không thể tải sản phẩm từ Database");
    }
  }, [showToast]);

  // Auth
  const checkUser = useCallback(async () => {
    if (!supabaseClient) return;
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      setCurrentUser(user);
      setIsAdmin(user ? ADMIN_EMAILS.includes(user.email) : false);
    } catch (e) {
      console.error("Lỗi kiểm tra user:", e);
    }
  }, []);

  // Cart functions
  const addToCart = useCallback((id, openDrawer = true) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    setCart(prev => {
      const existing = prev.find(x => x.id === id);
      if (existing) {
        return prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x);
      }
      return [...prev, { ...p, qty: 1 }];
    });
    if (openDrawer) setCartOpen(true);
  }, [products]);

  const changeQty = useCallback((index, delta) => {
    setCart(prev => {
      const next = [...prev];
      next[index] = { ...next[index], qty: next[index].qty + delta };
      if (next[index].qty <= 0) {
        next.splice(index, 1);
      }
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // Init
  useEffect(() => {
    const init = async () => {
      await fetchProducts();
      await checkUser();
      trackAction('visit');
      setIsLoading(false);
    };
    init();
  }, [fetchProducts, checkUser, trackAction]);

  const value = {
    products, currentUser, setCurrentUser, isAdmin, setIsAdmin,
    cart, setCart, addToCart, changeQty, clearCart,
    toastMessage, toastVisible, showToast,
    currentCategory, setCurrentCategory,
    searchTerm, setSearchTerm,
    isLoading,
    cartOpen, setCartOpen,
    paymentOpen, setPaymentOpen,
    profileOpen, setProfileOpen,
    settingsOpen, setSettingsOpen,
    searchOpen, setSearchOpen,
    welcomeOpen, setWelcomeOpen,
    warrantyOpen, setWarrantyOpen,
    termsOpen, setTermsOpen,
    trackAction, checkUser, fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
