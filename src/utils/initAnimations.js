import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize global animations
export const initGlobalAnimations = () => {
  // Set default GSAP settings for better performance
  gsap.config({
    force3D: true,
    nullTargetWarn: false
  });

  // Global scroll-triggered animations
  gsap.utils.toArray('.fade-in-up').forEach((element) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Global scale animations
  gsap.utils.toArray('.scale-in').forEach((element) => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Global stagger animations
  gsap.utils.toArray('.stagger-container').forEach((container) => {
    const items = container.querySelectorAll('.stagger-item');
    gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Parallax effects
  gsap.utils.toArray('.parallax').forEach((element) => {
    gsap.to(element, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Smooth scroll for anchor links
  gsap.utils.toArray('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: "power3.inOut"
        });
      }
    });
  });

  // Refresh ScrollTrigger after initialization
  ScrollTrigger.refresh();
};

// Initialize animations when DOM is ready
export const initOnDOMReady = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalAnimations);
  } else {
    initGlobalAnimations();
  }
};

// Performance optimization: batch DOM updates
export const batchAnimations = (animations) => {
  gsap.set(document.body, { autoAlpha: 0 });
  
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(document.body, { autoAlpha: 1 });
      ScrollTrigger.refresh();
    }
  });

  animations.forEach((animation, index) => {
    tl.add(animation, index * 0.1);
  });

  return tl;
};

// Cleanup function for route changes
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf("*");
};