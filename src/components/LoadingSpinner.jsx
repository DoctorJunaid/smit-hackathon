import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const spinnerRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    if (spinnerRef.current) {
      // Create spinning animation
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        ease: "none",
        repeat: -1
      });
    }

    // Animate dots with stagger
    if (dotsRef.current.length > 0) {
      gsap.to(dotsRef.current, {
        scale: 1.5,
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    accent: 'text-purple-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        ref={spinnerRef}
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
      >
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="31.416"
            className="animate-pulse"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const LoadingDots = ({ size = 'md', color = 'primary' }) => {
  const dotsRef = useRef([]);

  useEffect(() => {
    if (dotsRef.current.length > 0) {
      gsap.to(dotsRef.current, {
        y: -10,
        duration: 0.6,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    accent: 'bg-purple-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          ref={(el) => (dotsRef.current[index] = el)}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;