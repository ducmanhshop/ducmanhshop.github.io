'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for smooth modal mount/unmount animations with body scroll lock.
 * 
 * Lifecycle:
 * 1. OPEN: mount → next frame add `open` class → lock body scroll
 * 2. CLOSE: remove `open` class → wait for animation → unmount → unlock body scroll
 */
export function useModalAnimation(isOpen, duration = 380) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isOpen) {
      // Save scroll position and lock body
      scrollYRef.current = window.scrollY;
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollYRef.current}px`;
      
      setMounted(true);
      // Double rAF ensures the browser has painted the initial state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setActive(true);
        });
      });
    } else {
      setActive(false);
      timeoutRef.current = setTimeout(() => {
        setMounted(false);
        // Unlock body scroll and restore position
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollYRef.current);
      }, duration);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, duration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, []);

  return { mounted, active };
}
