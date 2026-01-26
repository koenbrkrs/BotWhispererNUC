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
    const rect = container.getBoundingClientRect();
    
    container.style.position = 'relative';
    container.style.overflow = 'hidden';

    // Number of rain columns
    const columnWidth = 16;
    const numColumns = Math.ceil(rect.width / columnWidth) + 2;
    
    // Create rain streams
    for (let col = 0; col < numColumns; col++) {
      // Random chance to create a stream in this column
      if (Math.random() > 0.6) continue;
      
      const streamLength = Math.floor(Math.random() * 15) + 8; // 8-23 characters
      const stream = document.createElement('div');
      const xPos = col * columnWidth + (Math.random() * 8 - 4);
      const startDelay = Math.random() * 300;
      const duration = 1800 + Math.random() * 700; // 1.8-2.5 seconds
      
      stream.style.cssText = `
        position: absolute;
        left: ${xPos}px;
        top: -${streamLength * 16}px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
        pointer-events: none;
      `;

      // Create characters in the stream with fade trail
      for (let i = 0; i < streamLength; i++) {
        const char = document.createElement('span');
        char.textContent = Math.random() > 0.5 ? '1' : '0';
        
        // Head is brightest, fading towards tail
        const fadeAmount = i / streamLength;
        const isHead = i === streamLength - 1;
        
        char.style.cssText = `
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.15;
          color: ${isHead ? '#ffffff' : color};
          opacity: ${isHead ? 1 : Math.max(0.1, 1 - fadeAmount * 0.9)};
        `;
        
        stream.appendChild(char);

        // Randomly change some characters during fall
        if (Math.random() > 0.6) {
          const flickerInterval = setInterval(() => {
            char.textContent = Math.random() > 0.5 ? '1' : '0';
          }, 80 + Math.random() * 120);
          
          setTimeout(() => clearInterval(flickerInterval), duration + startDelay);
        }
      }

      container.appendChild(stream);

      // Animate falling
      const fallDistance = rect.height + (streamLength * 16) + 20;

      stream.animate([
        { transform: 'translateY(0)' },
        { transform: `translateY(${fallDistance}px)` }
      ], {
        duration,
        delay: startDelay,
        easing: 'linear',
        fill: 'forwards'
      });

      // Remove stream after animation
      setTimeout(() => {
        stream.remove();
      }, duration + startDelay + 100);
    }

    // Fade out the content
    container.style.transition = 'opacity 1.5s ease-out';
    container.style.opacity = '0';

  }, [platform]);

  return { containerRef, triggerDissolve };
};
