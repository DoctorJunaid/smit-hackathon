import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useHoverAnimation } from '@/hooks/useGSAP';

const AnimatedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  loading = false,
  icon,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);

  // Hover animation
  const hoverRef = useHoverAnimation(
    (element) => {
      gsap.to(element, {
        scale: 1.05,
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Animate the ripple effect
      if (rippleRef.current) {
        gsap.to(rippleRef.current, {
          scale: 1.2,
          opacity: 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    },
    (element) => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      
      if (rippleRef.current) {
        gsap.to(rippleRef.current, {
          scale: 1,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  );

  // Click animation
  const handleClick = (e) => {
    if (disabled || loading) return;
    
    // Create ripple effect
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Animate click
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    // Create ripple at click position
    if (rippleRef.current) {
      gsap.set(rippleRef.current, {
        x: x - 50,
        y: y - 50,
        scale: 0,
        opacity: 0.5
      });
      
      gsap.to(rippleRef.current, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
    
    if (onClick) onClick(e);
  };

  // Loading animation
  useEffect(() => {
    if (loading && buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 0.7,
        duration: 0.3
      });
    } else if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        duration: 0.3
      });
    }
  }, [loading]);

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  return (
    <button
      ref={(el) => {
        buttonRef.current = el;
        hoverRef.current = el;
      }}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {/* Ripple effect */}
      <div
        ref={rippleRef}
        className="absolute w-24 h-24 bg-white rounded-full pointer-events-none"
        style={{ opacity: 0, scale: 0 }}
      />
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : icon ? (
          <span className="flex items-center">{icon}</span>
        ) : null}
        <span>{children}</span>
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
};

export default AnimatedButton;