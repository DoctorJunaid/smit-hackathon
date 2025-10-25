import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimation } from '@/hooks/useGSAP';
import { scrollAnimations } from '@/utils/animations';
import AnimatedButton from './AnimatedButton';
import LoadingSpinner, { LoadingDots } from './LoadingSpinner';

gsap.registerPlugin(ScrollTrigger);

const AnimationShowcase = () => {
  const showcaseRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  // Scroll animations
  const titleScrollRef = useScrollAnimation((element) => {
    scrollAnimations.fadeInUp(element);
  });

  const cardsScrollRef = useScrollAnimation((element) => {
    const cards = element.querySelectorAll('.showcase-card');
    scrollAnimations.staggerCards(cards);
  });

  // Floating elements animation
  useEffect(() => {
    const floatingElements = showcaseRef.current?.querySelectorAll('.floating');
    if (floatingElements) {
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.3
        });
      });
    }
  }, []);

  const showcaseItems = [
    {
      title: "Hover Effects",
      description: "Premium hover animations with smooth transitions",
      demo: (
        <div className="space-y-4">
          <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover-lift cursor-pointer flex items-center justify-center text-white font-semibold">
            Hover me!
          </div>
          <AnimatedButton variant="primary">Animated Button</AnimatedButton>
        </div>
      )
    },
    {
      title: "Loading States",
      description: "Smooth loading animations and spinners",
      demo: (
        <div className="space-y-4 flex flex-col items-center">
          <LoadingSpinner size="lg" color="primary" />
          <LoadingDots size="lg" color="accent" />
          <AnimatedButton loading variant="secondary">Loading...</AnimatedButton>
        </div>
      )
    },
    {
      title: "Floating Elements",
      description: "Subtle floating animations for visual interest",
      demo: (
        <div className="relative h-32 flex items-center justify-center">
          <div className="floating w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
            ✨
          </div>
          <div className="floating w-12 h-12 bg-pink-400 rounded-full absolute top-0 right-0 flex items-center justify-center">
            💫
          </div>
          <div className="floating w-10 h-10 bg-green-400 rounded-full absolute bottom-0 left-0 flex items-center justify-center">
            🌟
          </div>
        </div>
      )
    },
    {
      title: "Stagger Animations",
      description: "Sequential animations with perfect timing",
      demo: (
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className={`w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold bounce-in stagger-${num % 5 + 1}`}
            >
              {num}
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div ref={showcaseRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div 
          ref={titleScrollRef}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Animations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience smooth, fast, and lively animations that enhance user interaction
          </p>
        </div>

        <div 
          ref={cardsScrollRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {showcaseItems.map((item, index) => (
            <div
              key={index}
              className="showcase-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 card-hover"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                {item.description}
              </p>
              <div className="demo-area">
                {item.demo}
              </div>
            </div>
          ))}
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full opacity-30"></div>
          <div className="floating absolute top-40 right-20 w-6 h-6 bg-purple-300 rounded-full opacity-20"></div>
          <div className="floating absolute bottom-20 left-1/4 w-3 h-3 bg-pink-300 rounded-full opacity-40"></div>
          <div className="floating absolute bottom-40 right-1/3 w-5 h-5 bg-green-300 rounded-full opacity-25"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimationShowcase;