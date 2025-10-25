# Premium GSAP Animation System

This project now includes a comprehensive, premium animation system built with GSAP that provides fast, smooth, and lively animations throughout the application.

## 🚀 Features

### Core Animation System
- **GSAP Integration**: Professional-grade animations using GSAP
- **Scroll Triggers**: Smooth scroll-based animations
- **Page Transitions**: Seamless page-to-page animations
- **Interactive Elements**: Hover, click, and focus animations
- **Performance Optimized**: Hardware-accelerated animations

### Animation Types

#### 1. Page Transitions
- `fadeSlideUp`: Smooth fade and slide from bottom
- `scaleIn`: Scale animation with bounce effect
- `slideInLeft/Right`: Directional slide animations

#### 2. Scroll Animations
- `fadeInUp`: Elements fade and slide up on scroll
- `scaleOnScroll`: Scale elements as they enter viewport
- `staggerCards`: Sequential card animations

#### 3. Interactive Animations
- `buttonHover`: Premium button hover effects
- `cardHover`: Card lift and shadow animations
- `iconSpin`: Smooth icon rotations
- `pulse`: Attention-grabbing pulse effects

#### 4. Loading Animations
- `LoadingSpinner`: Animated loading spinners
- `LoadingDots`: Bouncing dot loaders
- `shimmer`: Skeleton loading effects

## 📁 File Structure

```
src/
├── utils/
│   ├── animations.js          # Core animation configurations
│   └── initAnimations.js      # Global animation initialization
├── hooks/
│   └── useGSAP.js            # Custom GSAP hooks
├── components/
│   ├── AnimatedPage.jsx       # Page transition wrapper
│   ├── AnimatedButton.jsx     # Premium button component
│   ├── LoadingSpinner.jsx     # Loading animations
│   ├── AnimationShowcase.jsx  # Demo component
│   └── SmoothScroll.jsx       # Smooth scrolling
└── index.css                  # Enhanced CSS animations
```

## 🎯 Usage Examples

### Basic Page Animation
```jsx
import AnimatedPage from '@/components/AnimatedPage';

const MyPage = () => (
  <AnimatedPage animationType="fadeSlideUp">
    <div>Your content here</div>
  </AnimatedPage>
);
```

### Custom Hook Usage
```jsx
import { useGSAP, useHoverAnimation } from '@/hooks/useGSAP';

const MyComponent = () => {
  const hoverRef = useHoverAnimation(
    (element) => gsap.to(element, { scale: 1.1, duration: 0.3 }),
    (element) => gsap.to(element, { scale: 1, duration: 0.3 })
  );

  return <div ref={hoverRef}>Hover me!</div>;
};
```

### Scroll-Triggered Animations
```jsx
import { useScrollAnimation } from '@/hooks/useGSAP';
import { scrollAnimations } from '@/utils/animations';

const MyComponent = () => {
  const scrollRef = useScrollAnimation((element) => {
    scrollAnimations.fadeInUp(element);
  });

  return <div ref={scrollRef}>I'll animate on scroll!</div>;
};
```

### CSS Classes
Add these classes to elements for automatic animations:

```html
<!-- Scroll animations -->
<div class="fade-in-up">Fades in from bottom</div>
<div class="scale-in">Scales in with bounce</div>

<!-- Hover effects -->
<div class="hover-lift">Lifts on hover</div>
<div class="card-hover">Premium card hover</div>

<!-- Stagger animations -->
<div class="stagger-container">
  <div class="stagger-item">Item 1</div>
  <div class="stagger-item">Item 2</div>
  <div class="stagger-item">Item 3</div>
</div>
```

## 🎨 Animation Configurations

### Speed Settings
```javascript
const animationConfig = {
  fast: { duration: 0.3, ease: "power2.out" },
  medium: { duration: 0.6, ease: "power3.out" },
  slow: { duration: 1, ease: "power4.out" },
  bounce: { duration: 0.8, ease: "back.out(1.7)" },
  elastic: { duration: 1.2, ease: "elastic.out(1, 0.3)" }
};
```

### Custom Animations
```javascript
import { gsap } from 'gsap';
import { animationConfig } from '@/utils/animations';

// Create custom animation
const myAnimation = (element) => {
  gsap.fromTo(element,
    { opacity: 0, x: -100 },
    { opacity: 1, x: 0, ...animationConfig.medium }
  );
};
```

## 🔧 Components Enhanced

### Navbar
- Smooth slide-in animation on load
- Floating logo animation
- Mobile menu slide transitions
- Staggered navigation links
- Cart badge bounce animation

### Product Cards
- Hover lift effects
- Image zoom on hover
- Button animations
- Heart pulse on favorite
- Scroll-triggered entrance

### Buttons
- Ripple click effects
- Hover scale animations
- Loading state transitions
- Shine effects

## 🎭 Performance Features

- **Hardware Acceleration**: All animations use GPU acceleration
- **Reduced Motion Support**: Respects user accessibility preferences
- **Optimized Rendering**: Batch DOM updates for smooth performance
- **Memory Management**: Proper cleanup on component unmount
- **ScrollTrigger Optimization**: Efficient scroll event handling

## 🎪 Animation Showcase

The `AnimationShowcase` component demonstrates all animation types:
- Hover effects
- Loading states
- Floating elements
- Stagger animations

Visit the home page to see all animations in action!

## 🛠️ Customization

### Adding New Animations
1. Add to `src/utils/animations.js`
2. Create corresponding CSS classes in `src/index.css`
3. Use in components with hooks or direct GSAP calls

### Modifying Timing
Update the `animationConfig` object in `animations.js` to adjust global timing.

### Accessibility
All animations respect `prefers-reduced-motion` and can be disabled for accessibility.

## 🚀 Best Practices

1. **Use Hardware Acceleration**: Always include `force3D: true`
2. **Cleanup Animations**: Use proper cleanup in useEffect
3. **Batch Updates**: Group DOM changes for better performance
4. **Progressive Enhancement**: Ensure functionality without animations
5. **Test Performance**: Monitor frame rates on lower-end devices

## 🎉 Result

Your app now features:
- ⚡ Fast, responsive animations
- 🎨 Premium visual effects
- 📱 Mobile-optimized performance
- ♿ Accessibility-compliant
- 🔄 Smooth page transitions
- 🎯 Interactive feedback
- 📊 Professional polish

The animation system transforms your app into a premium, engaging experience that feels fast and lively without being overwhelming!