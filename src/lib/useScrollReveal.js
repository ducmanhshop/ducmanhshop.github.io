'use client';

import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger children if they have data-reveal-delay
          const children = el.querySelectorAll('[data-reveal]');
          if (children.length > 0) {
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * 80}ms`;
            });
          }
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}
