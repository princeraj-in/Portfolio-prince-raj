import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  life: number;
  maxLife: number;
  color: string;
  glow: string;
  alpha: number;
  trail: { x: number; y: number }[];
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const HeroLiquidParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse tracker with smooth velocity interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      isHovered: false,
    };

    const particles: Particle[] = [];
    const ambientParticles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      phase: number;
      color: string;
    }[] = [];
    const ripples: Ripple[] = [];

    // Color palettes matching the Hero image lighting (Amber Gold + Cyber Cyan)
    const palettes = [
      { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.65)' }, // Warm Amber
      { color: '#FBBF24', glow: 'rgba(251, 191, 36, 0.7)' },  // Gold
      { color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.65)' }, // Electric Sky
      { color: '#06B6D4', glow: 'rgba(6, 182, 212, 0.65)' },  // Cyan
      { color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.8)' },  // White Stardust
    ];

    // Initialize subtle floating ambient stardust
    const initAmbient = () => {
      ambientParticles.length = 0;
      const count = Math.min(Math.floor((width * height) / 22000), 45);
      for (let i = 0; i < count; i++) {
        ambientParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.4 - 0.1, // gently rising
          size: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.4 + 0.15,
          phase: Math.random() * Math.PI * 2,
          color: palettes[Math.floor(Math.random() * palettes.length)].color,
        });
      }
    };

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      if (ambientParticles.length === 0) {
        initAmbient();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    handleResize();

    // Spawn fluid micro-droplets along cursor path
    const spawnFluidDroplets = (x: number, y: number, speed: number) => {
      // Scale count with mouse speed (max 7 per move event)
      const count = Math.min(Math.floor(speed / 4) + 1, 6);

      for (let i = 0; i < count; i++) {
        if (particles.length > 180) break;

        const palette = palettes[Math.floor(Math.random() * palettes.length)];
        const angle = Math.random() * Math.PI * 2;
        // Fluid inertia: combination of mouse momentum + radial dispersal
        const spraySpeed = Math.random() * 2.2 + 0.4;
        const vx = mouse.vx * 0.22 + Math.cos(angle) * spraySpeed;
        const vy = mouse.vy * 0.22 + Math.sin(angle) * spraySpeed;
        const size = Math.random() * 2.2 + 1.1;

        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx,
          vy,
          size,
          baseSize: size,
          life: 0,
          maxLife: Math.random() * 28 + 26,
          color: palette.color,
          glow: palette.glow,
          alpha: 1,
          trail: [{ x, y }],
        });
      }
    };

    // Mouse movement handler
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.isHovered = true;

        if (mouse.prevX !== -1000) {
          mouse.vx = x - mouse.prevX;
          mouse.vy = y - mouse.prevY;
          mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

          if (mouse.speed > 1.2) {
            spawnFluidDroplets(x, y, mouse.speed);
          }
        }

        mouse.prevX = mouse.x = x;
        mouse.prevY = mouse.y = y;
      } else {
        mouse.isHovered = false;
      }
    };

    const handlePointerLeave = () => {
      mouse.isHovered = false;
      mouse.prevX = -1000;
      mouse.prevY = -1000;
    };

    // Click / Tap Liquid Shockwave
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        // 1. Concentric fluid ripple
        ripples.push({
          x,
          y,
          radius: 8,
          maxRadius: 160,
          alpha: 0.75,
          color: Math.random() > 0.5 ? '#F59E0B' : '#06B6D4',
        });

        // 2. Burst of radial micro sparks
        for (let i = 0; i < 22; i++) {
          const angle = (i / 22) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
          const speed = Math.random() * 4.5 + 2.0;
          const palette = palettes[Math.floor(Math.random() * palettes.length)];
          const size = Math.random() * 2.6 + 1.2;

          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            baseSize: size,
            life: 0,
            maxLife: Math.random() * 34 + 26,
            color: palette.color,
            glow: palette.glow,
            alpha: 1,
            trail: [{ x, y }],
          });
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerDown, { passive: true });
    if (canvas.parentElement) {
      canvas.parentElement.addEventListener('mouseleave', handlePointerLeave);
    }

    // Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- 1. Ambient Floating Stardust ---
      for (let i = 0; i < ambientParticles.length; i++) {
        const p = ambientParticles[i];
        p.phase += 0.025;
        p.x += p.vx + Math.sin(p.phase) * 0.2;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + Math.sin(p.phase) * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, currentAlpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // --- 2. Fluid Ripples ---
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 4.5;
        rip.alpha *= 0.95;

        if (rip.radius >= rip.maxRadius || rip.alpha <= 0.02) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = rip.alpha;
        ctx.shadowColor = rip.color;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
      }

      // --- 3. Fluid Micro-droplets & Liquid Filaments ---
      // Draw filaments between nearby micro-droplets
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 46) {
            const filamentAlpha = (1 - dist / 46) * 0.28 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = filamentAlpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Render individual micro-droplets with liquid viscosity
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        const lifeRatio = 1 - p.life / p.maxLife;
        if (lifeRatio <= 0 || p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Viscous damping (liquid slowing down)
        p.vx *= 0.93;
        p.vy *= 0.93;

        // Subtle buoyant drift
        p.vy -= 0.02;

        p.x += p.vx;
        p.y += p.vy;

        p.alpha = Math.max(0, lifeRatio);
        const currentSize = Math.max(0.4, p.baseSize * (0.4 + lifeRatio * 0.6));

        // Soft outer glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.glow;
        ctx.globalAlpha = p.alpha * 0.35;
        ctx.fill();

        // Sharp core droplet
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.95;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerDown);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mouseleave', handlePointerLeave);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default HeroLiquidParticles;
