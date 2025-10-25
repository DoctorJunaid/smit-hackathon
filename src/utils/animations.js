import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animation configurations for consistent feel - More subtle
export const animationConfig = {
  fast: { duration: 0.2, ease: "power2.out" },
  medium: { duration: 0.4, ease: "power2.out" },
  slow: { duration: 0.6, ease: "power2.out" },
  bounce: { duration: 0.5, ease: "back.out(1.2)" },
  elastic: { duration: 0.8, ease: "power3.out" }
};

// Page transition animations - More subtle
export const pageTransitions = {
  fadeSlideUp: (element) => {
    gsap.fromTo(element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ...animationConfig.medium }
    );
  },

  scaleIn: (element) => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, ...animationConfig.medium }
    );
  },

  slideInLeft: (element) => {
    gsap.fromTo(element,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, ...animationConfig.medium }
    );
  },

  slideInRight: (element) => {
    gsap.fromTo(element,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, ...animationConfig.medium }
    );
  }
};

// Scroll-triggered animations - More subtle
export const scrollAnimations = {
  fadeInUp: (element, trigger) => {
    gsap.fromTo(element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        ...animationConfig.medium,
        scrollTrigger: {
          trigger: trigger || element,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse"
        }
      }
    );
  },

  scaleOnScroll: (element, trigger) => {
    gsap.fromTo(element,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ...animationConfig.medium,
        scrollTrigger: {
          trigger: trigger || element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    );
  },

  staggerCards: (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        ...animationConfig.medium,
        stagger: 0.1,
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
};

// Interactive animations
export const interactiveAnimations = {
  buttonHover: (element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, { scale: 1.05, ...animationConfig.fast })
      .to(element.querySelector('.button-bg'), { scale: 1.1, opacity: 0.8 }, 0);
    return tl;
  },

  cardHover: (element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      ...animationConfig.fast
    });
    return tl;
  },

  iconSpin: (element) => {
    gsap.to(element, { rotation: 360, duration: 0.6, ease: "power2.out" });
  },

  pulse: (element) => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  }
};

// Loading animations
export const loadingAnimations = {
  skeletonShimmer: (element) => {
    gsap.to(element, {
      backgroundPosition: "200% 0",
      duration: 1.5,
      ease: "none",
      repeat: -1
    });
  },

  fadeInStagger: (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        ...animationConfig.fast,
        stagger: 0.1
      }
    );
  }
};

// Navigation animations
export const navAnimations = {
  mobileMenuSlide: (element, isOpen) => {
    gsap.to(element, {
      x: isOpen ? 0 : "100%",
      ...animationConfig.medium
    });
  },

  navItemsStagger: (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        ...animationConfig.fast,
        stagger: 0.1
      }
    );
  },

  logoFloat: (element) => {
    gsap.to(element, {
      y: -5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
  }
};

// Cart animations
export const cartAnimations = {
  addToCart: (element) => {
    const tl = gsap.timeline();
    tl.to(element, { scale: 1.2, duration: 0.1 })
      .to(element, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
    return tl;
  },

  removeFromCart: (element) => {
    return gsap.to(element, {
      x: 100,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      ...animationConfig.fast
    });
  },

  cartBadgeBounce: (element) => {
    gsap.fromTo(element,
      { scale: 0 },
      { scale: 1, ...animationConfig.bounce }
    );
  }
};

// Product detail animations
export const productAnimations = {
  imageZoom: (element) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      scale: 1.1,
      ...animationConfig.medium
    });
    return tl;
  },

  quantityPulse: (element) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  },

  priceHighlight: (element) => {
    const tl = gsap.timeline();
    tl.to(element, {
      color: "#FD3B3B",
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    })
      .to(element, {
        color: "#111827",
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    return tl;
  },

  featureIconFloat: (elements) => {
    elements.forEach((element, index) => {
      gsap.to(element, {
        y: -3,
        duration: 2 + (index * 0.2),
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: index * 0.3
      });
    });
  },

  relatedProductsStagger: (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
};

// About page specific animations
export const aboutAnimations = {
  heroFloatingElements: (elements) => {
    elements.forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        rotation: 360,
        duration: 6 + (index * 2),
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: index * 0.5
      });
    });
  },

  testimonialCards: (elements) => {
    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotationY: -15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  },

  contactCards: (elements) => {
    gsap.fromTo(elements,
      {
        opacity: 0,
        y: 40,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  },

  timelineItems: (elements) => {
    elements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }
};

// Hero section animations - Enhanced and Optimized
export const heroAnimations = {
  titleStagger: (elements) => {
    return gsap.fromTo(elements,
      { 
        opacity: 0, 
        y: 60, 
        rotationX: -15,
        transformOrigin: "center bottom"
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        force3D: true
      }
    );
  },

  buttonFloat: (elements) => {
    return gsap.fromTo(elements,
      { 
        opacity: 0, 
        y: 40, 
        scale: 0.9,
        transformOrigin: "center"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        delay: 0.6,
        force3D: true
      }
    );
  },

  imageReveal: (element) => {
    const tl = gsap.timeline();
    tl.fromTo(element,
      { 
        opacity: 0, 
        scale: 1.1, 
        rotationY: -10,
        transformOrigin: "center"
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.8,
        force3D: true
      }
    );
    return tl;
  },

  floatingBadges: (elements) => {
    const tl = gsap.timeline();
    
    elements.forEach((element, index) => {
      // Initial reveal animation
      tl.fromTo(element,
        { 
          opacity: 0, 
          scale: 0, 
          rotation: -45,
          transformOrigin: "center"
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 12,
          duration: 0.6,
          ease: "back.out(1.4)",
          force3D: true
        },
        index * 0.1
      );

      // Continuous floating animation with performance optimization
      gsap.to(element, {
        y: -10,
        duration: 2 + (index * 0.3),
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: 1.8 + (index * 0.2),
        force3D: true
      });
    });
    
    return tl;
  },

  parallaxBackground: (element) => {
    return gsap.to(element, {
      yPercent: -30,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  },

  // New optimized master timeline
  masterTimeline: (refs) => {
    const tl = gsap.timeline();
    
    // Set initial states for performance
    gsap.set([refs.titleRef, refs.subtitleRef, refs.descriptionRef, refs.buttonsRef], {
      opacity: 0,
      force3D: true
    });
    
    return tl;
  }
};

// Video player animations
export const videoPlayerAnimations = {
  modalEntrance: (element) => {
    gsap.fromTo(element,
      { opacity: 0, scale: 0.8, rotationY: -15 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 0.5, ease: "back.out(1.2)" }
    );
  },

  modalExit: (element, onComplete) => {
    gsap.to(element, {
      opacity: 0,
      scale: 0.8,
      rotationY: 15,
      duration: 0.3,
      ease: "power2.in",
      onComplete
    });
  },

  playerSlideIn: (element) => {
    gsap.fromTo(element,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );
  },

  controlsFadeIn: (element) => {
    gsap.fromTo(element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  },

  controlsFadeOut: (element) => {
    gsap.to(element, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in"
    });
  },

  playButtonPulse: (element) => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  }
};

// Utility functions
export const animationUtils = {
  // Kill all animations on an element
  killAnimations: (element) => {
    gsap.killTweensOf(element);
  },

  // Create a master timeline
  createTimeline: (config = {}) => {
    return gsap.timeline(config);
  },

  // Batch animate elements
  batchAnimate: (elements, animation, stagger = 0.1) => {
    elements.forEach((element, index) => {
      gsap.delayedCall(index * stagger, () => animation(element));
    });
  },

  // Smooth scroll to element
  scrollToElement: (target, duration = 1) => {
    gsap.to(window, {
      duration: duration,
      scrollTo: {
        y: target,
        offsetY: 80
      },
      ease: "power2.inOut"
    });
  }
};