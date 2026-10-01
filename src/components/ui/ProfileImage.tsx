import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';

export interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
  glowColor?: string;
  floatDistance?: number; // Y-axis translation distance (10-15px)
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
  const prefersReducedMotion = useReducedMotion();

  // Mouse offset relative to container center normalized to [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for fluid, organic 3D parallax
  const springConfig = { stiffness: 150, damping: 20, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Parallax: Subtle tilt based on cursor position
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-9, 9]);

  // Image translation shift based on cursor
  const shiftX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const shiftY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Subtle opposite parallax depth for the background glow
  const glowShiftX = useTransform(smoothX, [-1, 1], [15, -15]);
  const glowShiftY = useTransform(smoothY, [-1, 1], [15, -15]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
    }
  }, []);

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

  const handleMouseLeave = () => {
    if (isTouchDevice || prefersReducedMotion) return;
    // Smooth return to neutral center position
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative z-20 flex flex-col items-center justify-center select-none ${className}`}
      style={{ perspective: 1200 }}
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
                scale: 1.03,
                transition: { type: 'spring', stiffness: 220, damping: 20 },
              }
        }
        className="relative flex items-center justify-center cursor-pointer"
      >
        {/* Futuristic Pulsating Cyan (#00FFFF) Radial Gradient Backlight */}
        <motion.div
          style={{
            x: prefersReducedMotion || isTouchDevice ? 0 : glowShiftX,
            y: prefersReducedMotion || isTouchDevice ? 0 : glowShiftY,
            background: `radial-gradient(circle at center, rgba(0, 255, 255, 0.42) 0%, rgba(0, 255, 255, 0.22) 38%, rgba(0, 255, 255, 0.08) 60%, transparent 75%)`,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.5 }
              : {
                  scale: [0.95, 1.15, 0.95],
                  opacity: [0.45, 0.75, 0.45],
                  filter: ['blur(40px)', 'blur(55px)', 'blur(40px)'],
                }
          }
          transition={{
            duration: 3.6,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute inset-0 sm:-inset-10 w-[125%] h-[125%] -translate-x-[10%] -translate-y-[10%] rounded-full pointer-events-none -z-10"
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
          className="absolute -inset-4 sm:-inset-12 w-[130%] h-[130%] -translate-x-[12%] -translate-y-[12%] rounded-full blur-[65px] pointer-events-none -z-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.35) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)',
          }}
        />

        {/* Continuous Slow-Speed Rotating Circular Living Orbit */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -inset-6 sm:-inset-10 rounded-full border border-dashed border-cyan-500/20 pointer-events-none -z-10"
          >
            {/* Ambient quantum orbit particles */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00ffff]" />
            <div className="absolute bottom-4 right-1/4 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
            <div className="absolute top-1/3 left-2 w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#2dd4bf]" />
          </motion.div>
        )}

        {/* Counter-Rotating Inner Specular Circular Ring */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 44,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -inset-2 sm:-inset-4 rounded-full border border-cyan-400/10 pointer-events-none -z-10"
          >
            <div className="absolute top-1/4 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00ffff]" />
          </motion.div>
        )}

        {/* Continuous Smooth Floating Animation (Y-axis translation 10-15px infinitely) */}
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
          className="relative flex items-center justify-center"
        >
          {/* Sharp Profile Image with Transparent Background & Clean Natural Shadow */}
          <div className="relative w-44 sm:w-56 md:w-64 lg:w-72 h-[264px] sm:h-[336px] md:h-[384px] lg:h-[432px] aspect-[2/3]">
            <img
              src={src}
              alt={alt}
              width={1024}
              height={1536}
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain object-bottom pointer-events-none select-none drop-shadow-[0_18px_32px_rgba(0,0,0,0.7)] drop-shadow-[0_0_20px_rgba(0,255,255,0.2)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileImage;
