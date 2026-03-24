'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for smooth modal mount/unmount animations.
 * Simple overflow:hidden approach — no position:fixed, no scroll jump.
 */
export function useModalAnimation(isOpen, duration = 380) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(null);
  const openCountRef = useRef(0);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isOpen) {
      openCountRef.current++;
      document.documentElement.style.overflow = 'hidden';
      
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setActive(true);
        });
      });
    } else {
      setActive(false);
      const capturedCount = openCountRef.current;
      timeoutRef.current = setTimeout(() => {
        setMounted(false);
        // Only unlock scroll if no other modal opened since
        if (capturedCount === openCountRef.current) {
          document.documentElement.style.overflow = '';
        }
      }, duration);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, duration]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  return { mounted, active };
}
