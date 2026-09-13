import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  as?: 'div' | 'section' | 'article' | 'header';
  id?: string;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 750,
  as: Component = 'div',
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // If IntersectionObserver is not supported, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return 'translate3d(0, 28px, 0)';
      case 'down': return 'translate3d(0, -28px, 0)';
      case 'left': return 'translate3d(28px, 0, 0)';
      case 'right': return 'translate3d(-28px, 0, 0)';
      case 'none': return 'translate3d(0, 0, 0)';
      default: return 'translate3d(0, 28px, 0)';
    }
  };

  return (
    <Component
      id={id}
      ref={domRef as any}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </Component>
  );
};
