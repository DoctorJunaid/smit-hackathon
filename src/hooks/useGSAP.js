import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom hook for GSAP animations
export const useGSAP = (animationFn, dependencies = []) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && animationFn) {
      // Kill previous animations
      if (animationRef.current) {
        animationRef.current.kill();
      }
      
      // Create new animation
      animationRef.current = animationFn(elementRef.current);
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, dependencies);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      // Refresh ScrollTrigger on unmount
      ScrollTrigger.refresh();
    };
  }, []);

  return elementRef;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (animationFn, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && animationFn) {
      const animation = animationFn(elementRef.current);
      
      return () => {
        if (animation && animation.kill) {
          animation.kill();
        }
        ScrollTrigger.refresh();
      };
    }
  }, dependencies);

  return elementRef;
};

// Hook for hover animations
export const useHoverAnimation = (hoverInFn, hoverOutFn) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (hoverInFn) {
        animationRef.current = hoverInFn(element);
      }
    };

    const handleMouseLeave = () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (hoverOutFn) {
        animationRef.current = hoverOutFn(element);
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [hoverInFn, hoverOutFn]);

  return elementRef;
};