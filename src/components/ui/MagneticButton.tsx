import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'motion/react';

export interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  className?: string;
  magneticStrength?: number; // 0 to 1, default 0.35
  glowColor?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  className = '',
  magneticStrength = 0.35,
  glowColor = 'rgba(0, 255, 255, 0.5)',
  disabled = false,
  type = 'button',
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth magnetic pull
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for organic magnetic snap and release
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Parallax spring for inner content
  const contentSpringConfig = { damping: 18, stiffness: 180, mass: 0.1 };
  const contentX = useSpring(useMotionValue(0), contentSpringConfig);
  const contentY = useSpring(useMotionValue(0), contentSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || disabled || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * magneticStrength;
    const distanceY = (e.clientY - centerY) * magneticStrength;

    mouseX.set(distanceX);
    mouseY.set(distanceY);

    contentX.set(distanceX * 0.4);
    contentY.set(distanceY * 0.4);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    contentX.set(0);
    contentY.set(0);
  };

  // Base inner button content
  const buttonInner = (
    <div className="relative group rounded-full p-[1.5px] overflow-hidden select-none transition-transform duration-200">
      {/* 1. Ambient Glow on Hover (Backlight blur) */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.8 : 0,
          scale: isHovered ? 1.08 : 0.95,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          boxShadow: `0 0 35px 8px ${glowColor}`,
        }}
        className="absolute -inset-1 rounded-full pointer-events-none -z-10 blur-xl"
        aria-hidden="true"
      />

      {/* 2. Continuously Rotating Gradient Border (Cyan to Deep Blue) */}
      <motion.div
        className="absolute -inset-[150%] pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg, #00FFFF 0%, #06b6d4 25%, #1e3a8a 50%, #0284c7 75%, #00FFFF 100%)',
        }}
        animate={{
          rotate: shouldReduceMotion ? 0 : 360,
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        aria-hidden="true"
      />

      {/* 3. Dark Futuristic Sleek Inner Core */}
      <div className="relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-950/90 hover:bg-slate-900/90 backdrop-blur-2xl transition-colors duration-300 border border-white/5">
        {/* Subtle radial inner highlight */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.18),transparent_70%)] pointer-events-none" />

        {/* 4. Magnetic Content with Secondary Parallax Layer */}
        <motion.div
          style={{ x: contentX, y: contentY }}
          className="relative z-10 flex items-center justify-center gap-2 font-['Space_Grotesk'] text-xs sm:text-sm font-bold tracking-wide text-slate-100 group-hover:text-white transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`inline-block relative cursor-pointer ${disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''} ${className}`}
    >
      {href ? (
        <a
          href={href}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          aria-label={ariaLabel}
          className="block outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full"
        >
          {buttonInner}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
          disabled={disabled}
          aria-label={ariaLabel}
          className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full bg-transparent border-0 p-0"
        >
          {buttonInner}
        </button>
      )}
    </motion.div>
  );
};

export default MagneticButton;
