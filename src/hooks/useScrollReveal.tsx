import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  childSelector?: string;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  const {
    y = 30,
    x = 0,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    ease = 'power2.out',
    start = 'top 75%',
    childSelector,
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const targets = childSelector
      ? element.querySelectorAll(childSelector)
      : element;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        x,
        opacity,
        duration,
        delay,
        stagger: stagger || undefined,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          once: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [y, x, opacity, duration, delay, stagger, ease, start, childSelector]);

  return ref;
}