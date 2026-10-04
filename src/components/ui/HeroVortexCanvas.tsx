import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  angle: number;
  distanceFromCenter: number;
  orbitSpeed: number;
  alpha: number;
  hue: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const HeroVortexCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse tracking with smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      prevX: -1000,
      prevY: -1000,
      speed: 0,
      isHovered: false,
      radius: 220,
    };

    const particles: Particle[] = [];
    const sparks: Spark[] = [];
    const shockwaves: Shockwave[] = [];

    // Avatar core gravitational attractor coordinates
    const avatarCore = {
      x: -1000,
      y: -1000,
      active: false,
      radius: 280,
    };

    const updateAvatarPosition = () => {
      if (!canvas) return;
      const avatarEl = document.querySelector('[data-hero-avatar-core]');
      if (avatarEl) {
        const cRect = canvas.getBoundingClientRect();
        const aRect = avatarEl.getBoundingClientRect();
        avatarCore.x = aRect.left + aRect.width / 2 - cRect.left;
        avatarCore.y = aRect.top + aRect.height / 2 - cRect.top;
        avatarCore.active = true;
      }
    };

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(Math.floor((width * height) / 8000), 120);

      for (let i = 0; i < count; i++) {
        const z = Math.random() * 1.4 + 0.5;
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.max(width, height) * 0.5;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.8 * z,
          vy: (Math.random() - 0.5) * 0.8 * z,
          baseRadius: (Math.random() * 2.4 + 1.2) * z,
          radius: (Math.random() * 2.4 + 1.2) * z,
          angle,
          distanceFromCenter: dist,
          orbitSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          alpha: Math.random() * 0.5 + 0.35,
          hue: Math.random() > 0.5 ? 190 + Math.random() * 25 : 220 + Math.random() * 45, // Cyan to Indigo
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.015,
        });
      }
    };

    // Resize Handler
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

      if (particles.length === 0) {
        initParticles();
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    handleResize();

    // Mouse movement on parent container or window
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.targetX = x;
        mouse.targetY = y;
        mouse.isHovered = true;

        // Calculate speed
        if (mouse.prevX !== -1000) {
          const dx = x - mouse.prevX;
          const dy = y - mouse.prevY;
          mouse.speed = Math.sqrt(dx * dx + dy * dy);

          // Emit sparks on active mouse motion
          if (mouse.speed > 2 && sparks.length < 90) {
            const spawnCount = Math.min(Math.floor(mouse.speed / 4), 4);
            for (let s = 0; s < spawnCount; s++) {
              const sparkAngle = Math.random() * Math.PI * 2;
              const sparkSpeed = Math.random() * 2.5 + 0.8;
              sparks.push({
                x: x + (Math.random() - 0.5) * 16,
                y: y + (Math.random() - 0.5) * 16,
                vx: Math.cos(sparkAngle) * sparkSpeed,
                vy: Math.sin(sparkAngle) * sparkSpeed,
                life: 1,
                maxLife: Math.random() * 25 + 20,
                size: Math.random() * 2.2 + 0.8,
                hue: Math.random() > 0.4 ? 185 + Math.random() * 30 : 260 + Math.random() * 40,
              });
            }
          }
        }

        mouse.prevX = x;
        mouse.prevY = y;
      } else {
        mouse.isHovered = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX >= 0 && clickX <= rect.width && clickY >= 0 && clickY <= rect.height) {
        // Trigger shockwave
        shockwaves.push({
          x: clickX,
          y: clickY,
          radius: 10,
          maxRadius: 180,
          alpha: 0.8,
        });

        // Trigger radial spark burst
        for (let i = 0; i < 28; i++) {
          const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.2;
          const speed = Math.random() * 4 + 2;
          sparks.push({
            x: clickX,
            y: clickY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            maxLife: Math.random() * 35 + 25,
            size: Math.random() * 2.8 + 1.2,
            hue: Math.random() > 0.3 ? 185 + Math.random() * 35 : 280 + Math.random() * 40,
          });
        }
      }
    };

    // Avatar Quantum Energy Shockwave Listener
    const handleAvatarShockwave = (e: Event) => {
      const detail = (e as CustomEvent<{ clientX?: number; clientY?: number; intensity?: number }>).detail;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const burstX = detail?.clientX !== undefined ? detail.clientX - rect.left : width / 2;
      const burstY = detail?.clientY !== undefined ? detail.clientY - rect.top : height * 0.32;
      const intensity = detail?.intensity || 1.5;

      // 1. Spawning high-energy multi-tier radial shockwaves
      shockwaves.push({
        x: burstX,
        y: burstY,
        radius: 15,
        maxRadius: Math.max(width, height) * 0.75,
        alpha: 0.95,
      });
      shockwaves.push({
        x: burstX,
        y: burstY,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.5,
        alpha: 0.8,
      });

      // 2. High-speed radial particle dispersion (impulse shock)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - burstX;
        const dy = p.y - burstY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 460) {
          const force = (1 - dist / 460) * 14 * intensity * p.z;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          p.pulseSpeed *= 1.6;
        }
      }

      // 3. Dense quantum spark explosion around avatar
      for (let i = 0; i < 44; i++) {
        const angle = (i / 44) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 6.5 + 3.2;
        sparks.push({
          x: burstX,
          y: burstY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: Math.random() * 42 + 28,
          size: Math.random() * 3.4 + 1.2,
          hue: Math.random() > 0.4 ? 185 + Math.random() * 35 : 275 + Math.random() * 45,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('hero-avatar-shockwave', handleAvatarShockwave);
    window.addEventListener('scroll', updateAvatarPosition, { passive: true });
    updateAvatarPosition();
    if (canvas.parentElement) {
      canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Default center vortex position
    mouse.x = width / 2;
    mouse.y = height / 2;
    mouse.targetX = width / 2;
    mouse.targetY = height / 2;

    // Animation Render Loop
    const render = () => {
      // Smooth mouse easing
      const ease = mouse.isHovered ? 0.12 : 0.04;
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // 1. Draw Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 5.5;
        sw.alpha = Math.max(0, 0.8 * (1 - sw.radius / sw.maxRadius));

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(6, 182, 212, ${sw.alpha * 0.7})`
          : `rgba(6, 182, 212, ${sw.alpha * 0.5})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw Active Vortex Glow at Cursor
      if (mouse.isHovered && mouse.x > 0 && mouse.y > 0) {
        const vortexGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 0.9
        );
        vortexGlow.addColorStop(0, isDark ? 'rgba(6, 182, 212, 0.22)' : 'rgba(6, 182, 212, 0.12)');
        vortexGlow.addColorStop(0.4, isDark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.06)');
        vortexGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = vortexGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Update and Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulsePhase += p.pulseSpeed;
        const currentRadius = p.baseRadius * (1 + Math.sin(p.pulsePhase) * 0.2);

        // Vector to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.isHovered && dist < mouse.radius && dist > 10) {
          // Neural Vortex Physics: Tangential swirl + Centripetal attraction
          const force = (1 - dist / mouse.radius) * 2.2 * p.z;
          const tangentAngle = Math.atan2(dy, dx) + Math.PI / 2;

          // Swirling tangential velocity
          p.vx += Math.cos(tangentAngle) * force * 0.8;
          p.vy += Math.sin(tangentAngle) * force * 0.8;

          // Pull towards vortex center
          p.vx += (dx / dist) * force * 0.45;
          p.vy += (dy / dist) * force * 0.45;
        }

        // Avatar Core Gravitational Well physics
        if (avatarCore.active) {
          const adx = avatarCore.x - p.x;
          const ady = avatarCore.y - p.y;
          const aDist = Math.sqrt(adx * adx + ady * ady);
          if (aDist < avatarCore.radius && aDist > 12) {
            const aForce = (1 - aDist / avatarCore.radius) * 1.6 * p.z;
            const tangentAngle = Math.atan2(ady, adx) + Math.PI / 2;
            // Orbital accretion swirl around avatar
            p.vx += Math.cos(tangentAngle) * aForce * 0.55;
            p.vy += Math.sin(tangentAngle) * aForce * 0.55;
            // Centripetal gravitational pull towards avatar core
            p.vx += (adx / aDist) * aForce * 0.35;
            p.vy += (ady / aDist) * aForce * 0.35;
          }
        }

        // Apply friction & natural drift
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Base ambient orbital drift
        p.x += p.vx + Math.cos(p.angle) * 0.35 * p.z;
        p.y += p.vy + Math.sin(p.angle) * 0.35 * p.z;
        p.angle += p.orbitSpeed;

        // Screen edge bounds wrap
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        const dynamicAlpha = Math.max(0.18, p.alpha + Math.sin(p.pulsePhase) * 0.25);

        // Draw particle outer corona/glow
        if (p.z > 0.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius * 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `hsla(${p.hue}, 90%, 65%, ${dynamicAlpha * 0.18})`
            : `hsla(${p.hue}, 85%, 50%, ${dynamicAlpha * 0.12})`;
          ctx.fill();
        }

        // Draw primary node
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `hsla(${p.hue}, 95%, 70%, ${dynamicAlpha})`
          : `hsla(${p.hue}, 85%, 45%, ${dynamicAlpha * 0.85})`;
        ctx.fill();

        // Hot center core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Draw synaptic ray connection to cursor if within close vortex range
        if (mouse.isHovered && dist < mouse.radius * 0.75) {
          const lineAlpha = (1 - dist / (mouse.radius * 0.75)) * 0.65;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark
            ? `rgba(6, 182, 212, ${lineAlpha})`
            : `rgba(6, 182, 212, ${lineAlpha * 0.7})`;
          ctx.lineWidth = 1.2 * p.z;
          ctx.stroke();
        }
      }

      // 4. Draw Inter-particle Neural Synapse Connections
      const maxConnectDist = 95;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.22 * ((p1.z + p2.z) / 2);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(59, 130, 246, ${lineAlpha})`
              : `rgba(59, 130, 246, ${lineAlpha * 0.7})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // 5. Update and Draw Micro Sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        const spark = sparks[s];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.96;
        spark.vy *= 0.96;
        spark.life += 1;

        const lifeRatio = 1 - spark.life / spark.maxLife;

        if (spark.life >= spark.maxLife || lifeRatio <= 0) {
          sparks.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * lifeRatio, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `hsla(${spark.hue}, 100%, 75%, ${lifeRatio * 0.9})`
          : `hsla(${spark.hue}, 95%, 50%, ${lifeRatio * 0.8})`;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('hero-avatar-shockwave', handleAvatarShockwave);
      window.removeEventListener('scroll', updateAvatarPosition);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
    </div>
  );
};
