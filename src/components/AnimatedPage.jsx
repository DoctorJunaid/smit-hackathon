import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pageTransitions } from '@/utils/animations';

gsap.registerPlugin(ScrollTrigger);

const AnimatedPage = ({ children, className = "", animationType = "fadeSlideUp" }) => {
  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (pageRef.current) {
      // Kill any existing animations
      gsap.killTweensOf(pageRef.current);
      
      // Apply page transition based on type
      switch (animationType) {
        case 'scaleIn':
          pageTransitions.scaleIn(pageRef.current);
          break;
        case 'slideInLeft':
          pageTransitions.slideInLeft(pageRef.current);
          break;
        case 'slideInRight':
          pageTransitions.slideInRight(pageRef.current);
          break;
        default:
          pageTransitions.fadeSlideUp(pageRef.current);
      }

      // Refresh ScrollTrigger after page transition
      gsap.delayedCall(0.5, () => {
        ScrollTrigger.refresh();
      });
    }
  }, [location.pathname, animationType]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pageRef.current) {
        gsap.killTweensOf(pageRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={pageRef} 
      className={`min-h-screen ${className}`}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
};

export default AnimatedPage;