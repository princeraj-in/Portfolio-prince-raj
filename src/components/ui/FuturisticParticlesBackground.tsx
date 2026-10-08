import React, { useMemo } from 'react';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export interface FuturisticParticlesBackgroundProps {
  className?: string;
}

export const FuturisticParticlesBackground: React.FC<FuturisticParticlesBackgroundProps> = ({
  className = '',
}) => {
  const options: ISourceOptions = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
      fpsLimit: isMobile ? 30 : 60,
      detectRetina: !isMobile,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      background: {
        color: {
          value: 'transparent',
        },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: {
            enable: !isMobile,
            mode: 'attract',
          },
          onClick: {
            enable: true,
            mode: 'repulse',
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          attract: {
            distance: 200,
            duration: 0.4,
            speed: 2.2,
            maxSpeed: 3.5,
          },
          repulse: {
            distance: 180,
            duration: 0.4,
            speed: 1.5,
          },
        },
      },
      particles: {
        number: {
          value: isMobile ? 22 : 42,
          density: {
            enable: true,
            area: isMobile ? 1200 : 950,
          },
        },
        color: {
          value: ['#00FFFF', '#06b6d4', '#3b82f6', '#00d2ff'],
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
          animation: {
            enable: !isMobile,
            speed: 0.8,
            minimumValue: 0.2,
            sync: false,
          },
        },
        size: {
          value: { min: 1.6, max: 3.4 },
          animation: {
            enable: !isMobile,
            speed: 1.2,
            minimumValue: 1.2,
            sync: false,
          },
        },
        shadow: {
          enable: !isMobile,
          color: '#00FFFF',
          blur: 6,
        },
        links: {
          enable: true,
          distance: isMobile ? 110 : 140,
          color: '#00FFFF',
          opacity: isMobile ? 0.15 : 0.22,
          width: 1,
          triangles: {
            enable: false,
          },
        },
        collisions: {
          enable: !isMobile,
          mode: 'bounce',
        },
        move: {
          enable: true,
          speed: isMobile ? 0.6 : 0.85,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'bounce',
          },
        },
      },
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Dark Futuristic Ambient Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-slate-950/70 pointer-events-none" />

      {/* Interactive tsParticles Canvas */}
      <ParticlesProvider init={loadSlim}>
        <Particles
          id="dark-futuristic-tsparticles"
          options={options}
          className="w-full h-full"
        />
      </ParticlesProvider>
    </div>
  );
};

export default FuturisticParticlesBackground;
