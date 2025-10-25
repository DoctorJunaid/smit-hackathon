import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    const smoothScroll = () => {
      gsap.registerPlugin(ScrollTrigger);
      
      // Create smooth scroll effect
      let scrollTween = gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 1,
        ease: "power3.out"
      });

      // Update scroll position on scroll
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (scrollTween) {
            scrollTween.progress(self.progress);
          }
        }
      });
    };

    // Initialize smooth scroll
    smoothScroll();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;