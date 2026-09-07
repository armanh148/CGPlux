"use client";

import React, { useEffect, useRef } from "react";

interface GlitterParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  isDiamond: boolean;
  color: string;
}

export interface GlitterWrapProps {
  /** Total number of glitter particles (default: 120) */
  particleCount?: number;
  count?: number; // fallback alias
  /** Global speed multiplier (default: 1) */
  speed?: number;
  /** Global canvas opacity (default: 0.85) */
  opacity?: number;
  /** Custom particle colors (defaults to luminous white & platinum zinc) */
  colors?: string[];
  /** Container CSS classes */
  className?: string;
  /** Optional wrapped children */
  children?: React.ReactNode;
}

export default function GlitterWrap({
  particleCount,
  count,
  speed = 1,
  opacity = 0.85,
  colors = ["#ffffff", "#e4e4e7", "#f4f4f5", "#a1a1aa"],
  className = "",
  children,
}: GlitterWrapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCount = particleCount ?? count ?? 130;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse tracking for subtle parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const getDimensions = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      return {
        w: Math.max(w, 300),
        h: Math.max(h, 300),
      };
    };

    const resize = () => {
      const { w, h } = getDimensions();
      width = w;
      height = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();

    // Spawn glitter particles
    const createParticle = (): GlitterParticle => {
      const isDiamond = Math.random() < 0.22; // 22% are sparkling diamond stars
      return {
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        vx: (Math.random() - 0.5) * 0.35 * speed,
        vy: (-(Math.random() * 0.45 + 0.15)) * speed, // gently float upward
        size: isDiamond ? Math.random() * 1.6 + 1.2 : Math.random() * 1.5 + 0.6,
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        phase: Math.random() * Math.PI * 2,
        isDiamond,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const particles: GlitterParticle[] = Array.from({ length: totalCount }, createParticle);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - rect.width / 2) * 0.04;
      targetMouseY = (e.clientY - rect.top - rect.height / 2) * 0.04;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", resize);

    let tick = 0;

    const render = () => {
      tick++;

      // Lerp mouse offset for smooth parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Twinkle factor
        const twinkle = Math.sin(tick * p.twinkleSpeed + p.phase);
        const currentAlpha = Math.max(0.05, Math.min(1, p.baseAlpha * (0.45 + 0.55 * twinkle)));

        // Position with slight mouse parallax
        const drawX = p.x + mouseX * (p.size * 0.4);
        const drawY = p.y + mouseY * (p.size * 0.4);

        // Draw soft glow halo for brighter particles
        if (currentAlpha > 0.45) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.18})`;
          ctx.fill();
        }

        // Draw center sparkle circle
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // If diamond star and twinkling bright, draw 4-pointed starburst flare
        if (p.isDiamond && currentAlpha > 0.4) {
          const flare = p.size * 3.2 * (0.6 + 0.4 * twinkle);
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.75})`;
          ctx.lineWidth = 0.75;
          ctx.lineCap = "round";

          // Horizontal spike
          ctx.beginPath();
          ctx.moveTo(drawX - flare, drawY);
          ctx.lineTo(drawX + flare, drawY);
          ctx.stroke();

          // Vertical spike
          ctx.beginPath();
          ctx.moveTo(drawX, drawY - flare);
          ctx.lineTo(drawX, drawY + flare);
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [totalCount, speed, colors]);

  if (children) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{ opacity }}
          aria-hidden="true"
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
