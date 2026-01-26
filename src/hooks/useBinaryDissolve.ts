import { useCallback, useRef } from 'react';

type Platform = 'youtube' | 'twitter' | 'whatsapp';

const PLATFORM_COLORS: Record<Platform, { primary: string; glow: string; dim: string }> = {
  youtube: { 
    primary: '#EA4237', 
    glow: 'rgba(234, 66, 55, 0.9)',
    dim: 'rgba(234, 66, 55, 0.2)'
  },
  twitter: { 
    primary: '#186BE0', 
    glow: 'rgba(24, 107, 224, 0.9)',
    dim: 'rgba(24, 107, 224, 0.2)'
  },
  whatsapp: { 
    primary: '#00FF41', 
    glow: 'rgba(0, 255, 65, 0.9)',
    dim: 'rgba(0, 255, 65, 0.2)'
  },
};

export const useBinaryDissolve = (platform: Platform) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerDissolve = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = PLATFORM_COLORS[platform];
    const rect = container.getBoundingClientRect();
    
    // Create overlay for the digital rain effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.95);
      z-index: 100;
      overflow: hidden;
      border-radius: inherit;
    `;
    
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.appendChild(overlay);

    // Number of rain columns based on container width
    const columnWidth = 18;
    const numColumns = Math.ceil(rect.width / columnWidth) + 4;
    
    // Create multiple depth layers for parallax
    const layers = [
      { speed: 1.2, opacity: 1, fontSize: 14, blur: 0, zIndex: 3 },      // Front layer
      { speed: 0.8, opacity: 0.6, fontSize: 12, blur: 0.5, zIndex: 2 },  // Middle layer  
      { speed: 0.5, opacity: 0.3, fontSize: 10, blur: 1, zIndex: 1 },    // Back layer
    ];

    // Create rain streams for each column and layer
    layers.forEach((layer, layerIndex) => {
      for (let col = 0; col < numColumns; col++) {
        // Randomize which columns have streams per layer
        if (Math.random() > 0.7) continue;
        
        const streamLength = Math.floor(Math.random() * 12) + 8; // 8-20 characters
        const stream = document.createElement('div');
        const xPos = (col * columnWidth) + (Math.random() * 10 - 5);
        const startDelay = Math.random() * 400;
        
        stream.style.cssText = `
          position: absolute;
          left: ${xPos}px;
          top: -${streamLength * layer.fontSize}px;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: ${layer.zIndex};
          filter: blur(${layer.blur}px);
          pointer-events: none;
        `;

        // Create characters in the stream
        for (let i = 0; i < streamLength; i++) {
          const char = document.createElement('span');
          char.textContent = Math.random() > 0.5 ? '1' : '0';
          
          // Head of stream is brightest, fades toward tail
          const headDistance = i / streamLength;
          const isHead = i === streamLength - 1;
          
          char.style.cssText = `
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: ${layer.fontSize}px;
            font-weight: ${isHead ? '700' : '500'};
            line-height: 1.1;
            color: ${isHead ? '#ffffff' : colors.primary};
            opacity: ${isHead ? 1 : (1 - headDistance * 0.8) * layer.opacity};
            text-shadow: ${isHead 
              ? `0 0 10px ${colors.glow}, 0 0 20px ${colors.glow}, 0 0 30px ${colors.glow}, 0 0 40px ${colors.primary}`
              : `0 0 ${8 - headDistance * 6}px ${colors.glow}`
            };
          `;
          
          stream.appendChild(char);

          // Randomly change characters during animation for "flickering" effect
          if (Math.random() > 0.5) {
            const flickerInterval = setInterval(() => {
              if (Math.random() > 0.7) {
                char.textContent = Math.random() > 0.5 ? '1' : '0';
              }
            }, 50 + Math.random() * 100);
            
            setTimeout(() => clearInterval(flickerInterval), 2500);
          }
        }

        overlay.appendChild(stream);

        // Animate the stream falling
        const fallDistance = rect.height + (streamLength * layer.fontSize) + 50;
        const duration = (1500 + Math.random() * 800) / layer.speed;

        stream.animate([
          { 
            transform: 'translateY(0)',
            opacity: 0
          },
          { 
            opacity: 1,
            offset: 0.1
          },
          { 
            transform: `translateY(${fallDistance}px)`,
            opacity: 0.8
          }
        ], {
          duration,
          delay: startDelay,
          easing: 'linear',
          fill: 'forwards'
        });

        // Add subtle sway animation
        stream.animate([
          { transform: 'translateX(0)' },
          { transform: `translateX(${(Math.random() - 0.5) * 6}px)` },
          { transform: 'translateX(0)' },
          { transform: `translateX(${(Math.random() - 0.5) * 6}px)` },
          { transform: 'translateX(0)' }
        ], {
          duration: duration * 0.8,
          delay: startDelay,
          easing: 'ease-in-out'
        });
      }
    });

    // Add some floating particles for depth
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${colors.primary};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
        box-shadow: 0 0 ${size * 2}px ${colors.glow};
        pointer-events: none;
        z-index: 0;
      `;
      
      overlay.appendChild(particle);

      particle.animate([
        { opacity: 0, transform: 'scale(0)' },
        { opacity: 0.6, transform: 'scale(1)', offset: 0.2 },
        { opacity: 0.3, transform: 'scale(0.8)', offset: 0.8 },
        { opacity: 0, transform: 'scale(0) translateY(20px)' }
      ], {
        duration: 1500 + Math.random() * 1000,
        delay: Math.random() * 500,
        easing: 'ease-out',
        fill: 'forwards'
      });
    }

    // Add scan line effect
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, ${colors.glow}, transparent);
      box-shadow: 0 0 10px ${colors.glow}, 0 0 20px ${colors.primary};
      z-index: 10;
      opacity: 0.8;
    `;
    overlay.appendChild(scanLine);

    scanLine.animate([
      { top: '0%', opacity: 0 },
      { top: '10%', opacity: 0.8 },
      { top: '100%', opacity: 0.3 }
    ], {
      duration: 800,
      easing: 'ease-in',
      fill: 'forwards'
    });

    // Fade out the original content with glitch effect
    container.style.transition = 'none';
    
    // Quick glitch frames
    const glitchFrames = [
      { transform: 'translateX(0)', filter: 'none' },
      { transform: 'translateX(-3px)', filter: `hue-rotate(90deg) saturate(2)` },
      { transform: 'translateX(3px)', filter: 'none' },
      { transform: 'translateX(-2px)', filter: `hue-rotate(-90deg)` },
      { transform: 'translateX(0)', filter: 'none' }
    ];

    container.animate(glitchFrames, {
      duration: 150,
      iterations: 2
    });

    // Fade container after glitch
    setTimeout(() => {
      container.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      container.style.opacity = '0';
      container.style.transform = 'scale(0.95)';
    }, 300);

    // Clean up overlay
    setTimeout(() => {
      overlay.remove();
    }, 2500);

  }, [platform]);

  return { containerRef, triggerDissolve };
};
