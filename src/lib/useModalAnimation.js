'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for smooth modal mount/unmount animations.
 * 
 * Instead of using CSS `hidden` (display:none) which kills close animations,
 * this hook manages a two-phase lifecycle:
 * 
 * 1. OPEN: mount element first → next frame add `open` class → animation plays
 * 2. CLOSE: remove `open` class → wait for animation → unmount element
 * 
 * @param {boolean} isOpen - The open/close state from context
 * @param {number} duration - Animation duration in ms (default 400)
 * @returns {{ mounted: boolean, active: boolean }}
 */
export function useModalAnimation(isOpen, duration = 400) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isOpen) {
      // Phase 1: Mount immediately
      setMounted(true);
      // Phase 2: Activate on next frame for CSS transition to work
      timeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          setActive(true);
        });
      }, 10);
    } else {
      // Phase 1: Deactivate (triggers close animation)
      setActive(false);
      // Phase 2: Unmount after animation completes
      timeoutRef.current = setTimeout(() => {
        setMounted(false);
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, duration]);

  return { mounted, active };
}
