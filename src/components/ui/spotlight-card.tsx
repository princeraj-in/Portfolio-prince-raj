import React, { useRef, useState, useCallback } from 'react';
import { motion, HTMLMotionProps, useReducedMotion } from 'motion/react';

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
  liquidGlow?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
  children, 
  className = "",
  spotlightColor = "rgba(6, 182, 212, 0.3)",
  enableTilt = true,
  liquidGlow = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    // Do not tilt on touch devices or reduced motion to ensure smooth native scrolling and zoom stability
    if ('touches' in e || shouldReduceMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setPosition({ x, y });

    if (enableTilt && !shouldReduceMotion) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Gentle subtle tilt angles for zoom stability
      const rX = ((y - centerY) / centerY) * -3.5;
      const rY = ((x - centerX) / centerX) * 3.5;
      setRotateX(rX);
      setRotateY(rY);
    }
  }, [enableTilt, shouldReduceMotion]);

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      animate={{ 
        rotateX: isHovered && !shouldReduceMotion ? rotateX : 0, 
        rotateY: isHovered && !shouldReduceMotion ? rotateY : 0,
        y: isHovered && !shouldReduceMotion ? -4 : 0,
        scale: isHovered && !shouldReduceMotion ? 1.008 : 1,
        transformPerspective: 1200,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 350, 
        damping: 24, 
        mass: 0.5 
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden backdrop-blur-3xl bg-white/75 dark:bg-slate-950/65 border border-white/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] rounded-[2.2rem] sm:rounded-[2.5rem] transition-all duration-300 group min-w-0 w-full ${className}`}
      {...props}
    >
      {/* Liquid Organic Morphing Underglow Blob */}
      {liquidGlow && (
        <div 
          className="absolute -inset-10 opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-2xl pointer-events-none liquid-morph-1 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-500" 
        />
      )}

      {/* 3D Glass Inner Bevel & Multi-layer Specular Refraction */}
      <div className="absolute inset-0 rounded-[inherit] border-[1.5px] border-white/80 dark:border-white/20 opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent dark:from-white/15 dark:via-transparent dark:to-transparent pointer-events-none rounded-[inherit]" />
      
      {/* Interactive Liquid Specular Spotlight Tracking Mouse */}
      <div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
        }}
      />

      {/* Dynamic Cursor Border Highlight Sheen */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: opacity * 0.8,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.4), transparent 50%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          padding: '1.5px',
        }}
      />

      {/* Liquid Specular Light Sheen sweep on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-full bg-gradient-to-tr from-transparent via-white/15 dark:via-white/10 to-transparent skew-x-12 z-0"
        animate={{
          x: isHovered && !shouldReduceMotion ? ["120%", "-120%"] : "-120%",
        }}
        transition={{
          duration: 1.4,
          ease: "easeInOut",
          repeat: isHovered && !shouldReduceMotion ? Infinity : 0,
          repeatDelay: 2.5,
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col min-w-0">
        {children}
      </div>
    </motion.div>
  );
};
