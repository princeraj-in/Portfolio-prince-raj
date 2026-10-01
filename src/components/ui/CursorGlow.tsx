import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CursorGlow: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Primary Liquid Core Aura */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-500"
        style={{ opacity: isHovering ? 1 : 0 }}
        animate={{
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.12), transparent 75%)`,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
      />
      {/* Secondary Deep Indigo Specular Halo */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-700"
        style={{ opacity: isHovering ? 1 : 0 }}
        animate={{
          background: `radial-gradient(750px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.08), transparent 85%)`,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      />
    </>
  );
};
