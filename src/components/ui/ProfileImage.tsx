import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from 'motion/react';

export interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
  glowColor?: string;
  floatDistance?: number; // Y-axis translation distance (10-15px)
}

interface ShockwaveRing {
  id: number;
  color: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  src = '/avatar.webp',
  alt = 'Prince Raj',
  className = '',
  glowColor = '#00FFFF',
  floatDistance = 14,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shockwaves, setShockwaves] = useState<ShockwaveRing[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Mouse offset relative to container center normalized to [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for fluid, organic 3D parallax
  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Parallax: High-depth tilt based on cursor position
  const rotateX = useTransform(smoothY, [-1, 1], [14, -14]);
  const rotateY = useTransform(smoothX, [-1, 1], [-16, 16]);

  // Image translation shift based on cursor
  const shiftX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const shiftY = useTransform(smoothY, [-1, 1], [-14, 14]);

  // Dynamic parallax depth for background glow and orbital rings
  const glowShiftX = useTransform(smoothX, [-1, 1], [22, -22]);
  const glowShiftY = useTransform(smoothY, [-1, 1], [22, -22]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

  // Web Audio API synthesized sci-fi energy chirp (pure synthesizer, zero files needed)
  const playSciFiEnergySound = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.32);
    } catch {
      // Audio playback failsafe (e.g. autoplay permissions)
    }
  }, []);

  // Trigger energy shockwave on avatar click or hover
  const triggerEnergyShockwave = useCallback((e?: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : (e ? e.clientX : window.innerWidth / 2);
    const centerY = rect ? rect.top + rect.height / 2 : (e ? e.clientY : window.innerHeight / 2);

    // 1. Dispatch custom event for HeroVortexCanvas particle burst
    window.dispatchEvent(
      new CustomEvent('hero-avatar-shockwave', {
        detail: {
          clientX: centerX,
          clientY: centerY,
          intensity: 1.8,
        },
      })
    );

    // 2. Play subtle sci-fi energy audio chirp
    playSciFiEnergySound();

    // 3. Local expanding ripple ring animation
    const id = Date.now();
    const colors = ['#00FFFF', '#38bdf8', '#818cf8', '#a855f7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setShockwaves((prev) => [...prev.slice(-3), { id, color: randomColor }]);

    setTimeout(() => {
      setShockwaves((prev) => prev.filter((sw) => sw.id !== id));
    }, 1100);
  }, [playSciFiEnergySound]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    triggerEnergyShockwave(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isTouchDevice || prefersReducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      data-hero-avatar-core="true"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={triggerEnergyShockwave}
      className={`relative z-20 flex flex-col items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ perspective: 1400 }}
      title="Click or hover to trigger Quantum Energy Shockwave"
    >
      {/* 3D Interactive Mouse Parallax Container */}
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          rotateX: prefersReducedMotion || isTouchDevice ? 0 : rotateX,
          rotateY: prefersReducedMotion || isTouchDevice ? 0 : rotateY,
          x: prefersReducedMotion || isTouchDevice ? 0 : shiftX,
          y: prefersReducedMotion || isTouchDevice ? 0 : shiftY,
        }}
        whileHover={
          prefersReducedMotion || isTouchDevice
            ? {}
            : {
                scale: 1.04,
                transition: { type: 'spring', stiffness: 260, damping: 18 },
              }
        }
        whileTap={{ scale: 0.96 }}
        className="relative flex items-center justify-center"
      >
        {/* Dynamic Expanding Click/Hover Shockwave Rings */}
        <AnimatePresence>
          {shockwaves.map((sw) => (
            <motion.div
              key={sw.id}
              initial={{ scale: 0.6, opacity: 0.95 }}
              animate={{ scale: [0.6, 2.8], opacity: [0.9, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-full border-2 pointer-events-none -z-10"
              style={{
                borderColor: sw.color,
                boxShadow: `0 0 35px ${sw.color}, inset 0 0 25px ${sw.color}`,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Futuristic Pulsating Cyan (#00FFFF) Radial Gradient Backlight */}
        <motion.div
          style={{
            x: prefersReducedMotion || isTouchDevice ? 0 : glowShiftX,
            y: prefersReducedMotion || isTouchDevice ? 0 : glowShiftY,
            background: `radial-gradient(circle at center, rgba(0, 255, 255, 0.48) 0%, rgba(6, 182, 212, 0.28) 38%, rgba(99, 102, 241, 0.12) 62%, transparent 76%)`,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.5 }
              : {
                  scale: isHovered ? [1.1, 1.25, 1.1] : [0.95, 1.15, 0.95],
                  opacity: isHovered ? [0.65, 0.95, 0.65] : [0.45, 0.75, 0.45],
                  filter: ['blur(42px)', 'blur(58px)', 'blur(42px)'],
                }
          }
          transition={{
            duration: isHovered ? 2.2 : 3.6,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute inset-0 sm:-inset-10 w-[128%] h-[128%] -translate-x-[12%] -translate-y-[12%] rounded-full pointer-events-none -z-10"
        />

        {/* Secondary Deep Cyan Ambient Specular Aura */}
        <motion.div
          animate={
            prefersReducedMotion
              ? { opacity: 0.3 }
              : {
                  scale: [1.1, 0.95, 1.1],
                  opacity: [0.25, 0.55, 0.25],
                }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute -inset-4 sm:-inset-12 w-[132%] h-[132%] -translate-x-[14%] -translate-y-[14%] rounded-full blur-[68px] pointer-events-none -z-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.38) 0%, rgba(6, 182, 212, 0.18) 50%, transparent 72%)',
          }}
        />

        {/* Multi-Layered Cybernetic HUD Orbit Rings */}
        {!prefersReducedMotion && (
          <>
            {/* Outer Slow Orbit with Quantum Satellite Particles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -inset-8 sm:-inset-12 rounded-full border border-dashed border-cyan-400/25 pointer-events-none -z-10"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_#00ffff]" />
              <div className="absolute bottom-4 right-1/4 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6]" />
              <div className="absolute top-1/3 left-2 w-2 h-2 rounded-full bg-teal-300 shadow-[0_0_10px_#2dd4bf]" />
            </motion.div>

            {/* Middle Fast Counter-Rotating HUD Calibration Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -inset-4 sm:-inset-6 rounded-full border border-cyan-500/20 pointer-events-none -z-10"
              style={{
                borderTopColor: 'rgba(6, 182, 212, 0.7)',
                borderRightColor: 'rgba(59, 130, 246, 0.5)',
              }}
            >
              <div className="absolute top-1/4 -right-1.5 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#00ffff]" />
              <div className="absolute -bottom-1 left-1/3 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
            </motion.div>
          </>
        )}

        {/* Continuous Smooth Floating Animation Container */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-floatDistance, floatDistance, -floatDistance],
                }
          }
          transition={{
            duration: 4.4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center overflow-hidden rounded-2xl"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(40px)',
          }}
        >
          {/* Holographic Biometric Laser Scan Sweep */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{
                top: ['-10%', '110%'],
                opacity: [0, 0.85, 0.85, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 2.2,
              }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#00FFFF] pointer-events-none z-20"
            />
          )}

          {/* Sharp Profile Image with Transparent Background & Clean Natural Shadow */}
          <div className="relative w-44 sm:w-56 md:w-64 lg:w-72 h-[264px] sm:h-[336px] md:h-[384px] lg:h-[432px] aspect-[2/3]">
            <img
              src={src}
              alt={alt}
              width={1024}
              height={1536}
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain object-bottom pointer-events-none select-none drop-shadow-[0_18px_32px_rgba(0,0,0,0.7)] drop-shadow-[0_0_22px_rgba(0,255,255,0.25)] transition-all duration-300 group-hover:brightness-105"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileImage;
