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

    // Linear fade from 100% to 0% over 3 seconds
    container.style.transition = 'opacity 3s linear';
    container.style.opacity = '0';

    // Number of rain columns
    const columnWidth = 16;
    const numColumns = Math.ceil(rect.width / columnWidth) + 2;
    
    // Store all streams for the fade effect at end
    const streams: HTMLElement[] = [];
    
    // Create rain streams
    for (let col = 0; col < numColumns; col++) {
      // Random chance to create a stream in this column
      if (Math.random() > 0.6) continue;
      
      const streamLength = Math.floor(Math.random() * 15) + 8; // 8-23 characters
      const stream = document.createElement('div');
      const xPos = col * columnWidth + (Math.random() * 8 - 4);
      const startDelay = Math.random() * 400;
      const duration = 2700 + Math.random() * 1000; // 2.7-3.7 seconds
      
      stream.style.cssText = `
        position: absolute;
        left: ${xPos}px;
        top: -${streamLength * 16}px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 10;
        pointer-events: none;
        opacity: 1;
        transition: opacity 0.3s ease-out;
      `;

      // Create characters in the stream with fade trail - ALL in platform color
      for (let i = 0; i < streamLength; i++) {
        const char = document.createElement('span');
        char.textContent = Math.random() > 0.5 ? '1' : '0';
        
        // Head is brightest, fading towards tail - ALL same color
        const fadeAmount = i / streamLength;
        const isHead = i === streamLength - 1;
        
        char.style.cssText = `
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 14px;
          font-weight: ${isHead ? '700' : '500'};
          line-height: 1.15;
          color: ${color};
          opacity: ${isHead ? 1 : Math.max(0.15, 1 - fadeAmount * 0.85)};
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
      streams.push(stream);

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
      }, duration + startDelay + 500);
    }

    // Fade all streams to 70% opacity in the last second
    setTimeout(() => {
      streams.forEach(stream => {
        stream.style.opacity = '0.7';
      });
    }, 2000); // Start fading streams at 2s (1s before end)

  }, [platform]);

  return { containerRef, triggerDissolve };
};
