import React, { useEffect, useRef } from 'react';

export const NeuralVortexBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 200,
      active: false,
    };

    let scrollY = window.scrollY;

    interface Particle {
      x: number;
      y: number;
      z: number; // depth layer 0.2 to 1.5
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 9000), 140);

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 1.2 + 0.3;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * 0.6 * z,
        vy: (Math.random() - 0.5) * 0.6 * z,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size: (Math.random() * 2.2 + 0.8) * z,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.6 ? 190 + Math.random() * 30 : 220 + Math.random() * 40,
      });
    }

    const render = () => {
      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle glowing ambient gradients in corners
      const isDark = document.documentElement.classList.contains('dark') || true;
      
      const grad1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.2 + scrollY * 0.1,
        0,
        width * 0.2,
        height * 0.2,
        width * 0.45
      );
      grad1.addColorStop(0, isDark ? 'rgba(59, 130, 246, 0.09)' : 'rgba(59, 130, 246, 0.04)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.7,
        0,
        width * 0.8,
        height * 0.7,
        width * 0.4
      );
      grad2.addColorStop(0, isDark ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0.03)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        // Wrap edges smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Interactive gravity vortex with cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.8 * p.z;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        const dynamicAlpha = Math.max(0.15, p.alpha + Math.sin(p.pulsePhase) * 0.25);

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `hsla(${p.hue}, 90%, 65%, ${dynamicAlpha})`
          : `hsla(${p.hue}, 80%, 45%, ${dynamicAlpha * 0.8})`;
        ctx.fill();

        // High-depth particles get faint glow
        if (p.z > 0.9) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `hsla(${p.hue}, 100%, 70%, ${dynamicAlpha * 0.2})`
            : `hsla(${p.hue}, 90%, 50%, ${dynamicAlpha * 0.15})`;
          ctx.fill();
        }
      }

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 135 * ((p1.z + p2.z) / 2);

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.22 * ((p1.z + p2.z) / 2);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(37, 99, 235, ${lineAlpha * 0.7})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-85 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
