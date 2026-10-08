import React, { useEffect, useRef, useState } from 'react';

/**
 * Ultra-high-performance CursorGlow
 * Uses direct CSS custom properties and requestAnimationFrame to eliminate
 * React component re-renders during mouse movements.
 * Disables itself automatically on touch-only mobile devices to conserve battery and GPU power.
 */
export const CursorGlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let rafId: number | null = null;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (rafId === null) {
        rafId = requestAnimationFrame(updateGlowPosition);
      }
    };

    const updateGlowPosition = () => {
      // Smooth lerp
      currentX += (targetX - currentX) * 0.35;
      currentY += (targetY - currentY) * 0.35;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--cursor-x', `${currentX}px`);
        containerRef.current.style.setProperty('--cursor-y', `${currentY}px`);
      }

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(updateGlowPosition);
      } else {
        rafId = null;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-500 overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        // Default offscreen
        ['--cursor-x' as string]: '-500px',
        ['--cursor-y' as string]: '-500px',
      }}
      aria-hidden="true"
    >
      {/* Primary Liquid Core Aura */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(450px circle at var(--cursor-x) var(--cursor-y), rgba(6, 182, 212, 0.12), transparent 75%)',
        }}
      />
      {/* Secondary Deep Indigo Specular Halo */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(750px circle at var(--cursor-x) var(--cursor-y), rgba(37, 99, 235, 0.08), transparent 85%)',
        }}
      />
    </div>
  );
};

export default CursorGlow;
