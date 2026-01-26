import { useCallback, useRef } from 'react';

type Platform = 'youtube' | 'twitter' | 'whatsapp';

const PLATFORM_COLORS: Record<Platform, string> = {
  youtube: '#EA4237',
  twitter: '#186BE0',
  whatsapp: '#00FF41',
};

export const useBinaryDissolve = (platform: Platform) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerDissolve = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const color = PLATFORM_COLORS[platform];
    const numDigits = Math.floor(Math.random() * 21) + 30; // 30-50 digits

    // Set container styles
    container.style.position = 'relative';
    container.style.overflow = 'hidden';

    // Create binary digits
    for (let i = 0; i < numDigits; i++) {
      const digit = document.createElement('span');
      digit.textContent = Math.random() > 0.5 ? '1' : '0';
      
      const fontSize = Math.floor(Math.random() * 7) + 12; // 12-18px
      const startX = Math.random() * 100;
      const startY = Math.random() * 50;
      
      digit.style.cssText = `
        position: absolute;
        font-family: 'Consolas', 'Courier New', monospace;
        font-size: ${fontSize}px;
        font-weight: 700;
        color: ${color};
        left: ${startX}%;
        top: ${startY}%;
        opacity: 1;
        pointer-events: none;
        z-index: 10;
        text-shadow: 0 0 12px ${color}, 0 0 24px ${color};
        box-shadow: 0 0 12px ${color};
      `;
      
      container.appendChild(digit);

      // Animation timing
      const delay = Math.random() * 400;
      const duration = 1800 + Math.random() * 400; // 1.8-2.2 seconds
      const fallDistance = 80 + Math.random() * 70; // 80-150px
      const horizontalDrift = (Math.random() - 0.5) * 60;

      // Main falling animation
      digit.animate([
        { 
          opacity: 1, 
          transform: 'translateY(0) translateX(0)',
        },
        { 
          opacity: 1, 
          transform: `translateY(${fallDistance * 0.2}px) translateX(${horizontalDrift * 0.2}px)`,
          offset: 0.2 
        },
        { 
          opacity: 0.9, 
          transform: `translateY(${fallDistance * 0.4}px) translateX(${horizontalDrift * 0.4}px)`,
          offset: 0.4 
        },
        { 
          opacity: 0.7, 
          transform: `translateY(${fallDistance * 0.6}px) translateX(${horizontalDrift * 0.6}px)`,
          offset: 0.6 
        },
        { 
          opacity: 0.4, 
          transform: `translateY(${fallDistance * 0.8}px) translateX(${horizontalDrift * 0.8}px)`,
          offset: 0.8 
        },
        { 
          opacity: 0, 
          transform: `translateY(${fallDistance}px) translateX(${horizontalDrift}px)`,
        },
      ], {
        duration,
        delay,
        easing: 'ease-out',
        fill: 'forwards',
      });

      // Slow flicker effect - pulses twice during fall
      const flickerKeyframes = [
        { opacity: 1 },
        { opacity: 0.4 },
        { opacity: 1 },
        { opacity: 0.4 },
        { opacity: 1 },
      ];
      
      digit.animate(flickerKeyframes, {
        duration: duration * 0.8,
        delay: delay + 100,
        easing: 'ease-in-out',
      });

      // Remove digit after animation
      setTimeout(() => {
        digit.remove();
      }, duration + delay + 100);
    }

    // Fade out the content (keep at ~1.5s as requested)
    container.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95)';
  }, [platform]);

  return { containerRef, triggerDissolve };
};
