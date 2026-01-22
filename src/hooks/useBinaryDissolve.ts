import { useCallback, useRef } from 'react';

type Platform = 'youtube' | 'twitter' | 'whatsapp';

const PLATFORM_COLORS: Record<Platform, string> = {
  youtube: '#FF0000',
  twitter: '#1D9BF0',
  whatsapp: '#25D366',
};

export const useBinaryDissolve = (platform: Platform) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerDissolve = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const color = PLATFORM_COLORS[platform];
    const rect = container.getBoundingClientRect();
    const numDigits = Math.floor(Math.random() * 16) + 15; // 15-30 digits

    // Create binary digits
    for (let i = 0; i < numDigits; i++) {
      const digit = document.createElement('span');
      digit.textContent = Math.random() > 0.5 ? '1' : '0';
      digit.style.cssText = `
        position: absolute;
        font-family: monospace;
        font-size: ${Math.floor(Math.random() * 7) + 8}px;
        font-weight: bold;
        color: ${color};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 60}%;
        opacity: 0;
        pointer-events: none;
        z-index: 10;
        text-shadow: 0 0 8px ${color};
      `;
      
      container.style.position = 'relative';
      container.style.overflow = 'hidden';
      container.appendChild(digit);

      // Animate the digit
      const delay = Math.random() * 300;
      const duration = 800 + Math.random() * 400;
      const horizontalDrift = (Math.random() - 0.5) * 40;

      digit.animate([
        { 
          opacity: 0, 
          transform: 'translateY(0) translateX(0)',
        },
        { 
          opacity: 1, 
          transform: `translateY(10px) translateX(${horizontalDrift * 0.3}px)`,
          offset: 0.2 
        },
        { 
          opacity: 1, 
          transform: `translateY(30px) translateX(${horizontalDrift * 0.6}px)`,
          offset: 0.4 
        },
        { 
          opacity: 0.8, 
          transform: `translateY(50px) translateX(${horizontalDrift * 0.8}px)`,
          offset: 0.6 
        },
        { 
          opacity: 0.5, 
          transform: `translateY(70px) translateX(${horizontalDrift}px)`,
          offset: 0.8 
        },
        { 
          opacity: 0, 
          transform: `translateY(${rect.height + 20}px) translateX(${horizontalDrift}px)`,
        },
      ], {
        duration,
        delay,
        easing: 'ease-out',
        fill: 'forwards',
      });

      // Flicker effect
      const flickerKeyframes = [
        { opacity: 1 },
        { opacity: 0.3 },
        { opacity: 1 },
        { opacity: 0.5 },
        { opacity: 1 },
      ];
      
      digit.animate(flickerKeyframes, {
        duration: 200,
        delay: delay + 100,
        iterations: 3,
      });

      // Remove digit after animation
      setTimeout(() => {
        digit.remove();
      }, duration + delay + 100);
    }

    // Fade out the content
    container.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95)';
  }, [platform]);

  return { containerRef, triggerDissolve };
};
