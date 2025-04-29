'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function InteractiveParticles() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const colorsRef = useRef({
    particle: 'hsla(270, 100%, 70%, 0.7)',
    line: 'hsla(270, 100%, 70%, 0.5)'
  });

  const createParticle = useCallback((width, height) => {
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    return {
      x: startX,
      y: startY,
      startX,
      startY,
      vx: 0,
      vy: 0,
      radius: Math.random() * 2 + 1,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = window.devicePixelRatio || 1;

    const updateCanvasSize = () => {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      ctx.scale(dpr, dpr);

      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      return { width: displayWidth, height: displayHeight };
    };

    const { width, height } = updateCanvasSize();

    particlesRef.current = Array.from({ length: 60 }, () => createParticle(width, height));

    const connectionDistanceSq = 120 * 120;
    const mouseInfluenceDistanceSq = 100 * 100;

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const { particle: particleColor, line: lineColor } = colorsRef.current;

      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 2; j < particles.length; j += 2) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistanceSq) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dxMouse = mouse.current.x - p.x;
        const dyMouse = mouse.current.y - p.y;
        const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

        if (distMouseSq < mouseInfluenceDistanceSq) {
          const distMouse = Math.sqrt(distMouseSq);
          p.vx -= (dxMouse / distMouse) * 0.1;
          p.vy -= (dyMouse / distMouse) * 0.1;
        }

        p.vx += (p.startX - p.x) * 0.003;
        p.vy += (p.startY - p.y) * 0.003;

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(update);
    };

    update();

    let resizeTimeout;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        const { width, height } = updateCanvasSize();
        particlesRef.current = Array.from({ length: 60 }, () => createParticle(width, height));
      }, 250);
    };

    const handleMouseMove = (e) => {
      if (mouse.current.lastUpdate && Date.now() - mouse.current.lastUpdate < 16) {
        return;
      }

      mouse.current = {
        x: e.clientX,
        y: e.clientY,
        lastUpdate: Date.now()
      };
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimeout);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
}
