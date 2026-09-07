"use client";

import { useEffect, useRef } from "react";

interface GlitterWrapProps {
  /** Number of star particles */
  count?: number;
  /** Speed multiplier — higher = faster warp */
  speed?: number;
  /** Opacity of the canvas overlay */
  opacity?: number;
  className?: string;
}

/**
 * GlitterWrap — Starfield warp / hyperspace effect.
 * Canvas-based, zero-dependency, fully performant (RAF + offscreen state).
 * Adapted from originkit's GlitterWrap component spec.
 */
export default function GlitterWrap({
  count = 180,
  speed = 0.6,
  opacity = 0.55,
  className = "",
}: GlitterWrapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;

    // ── Resize handler ──
    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Star state ──
    interface Star {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
      size: number;
      bright: number;
    }

    const makestar = (): Star => ({
      x: (Math.random() - 0.5) * w * 2,
      y: (Math.random() - 0.5) * h * 2,
      z: Math.random() * w,
      px: 0,
      py: 0,
      size: Math.random() * 1.2 + 0.3,
      bright: Math.random() * 0.6 + 0.4,
    });

    const stars: Star[] = Array.from({ length: count }, makestar);

    // ── Draw loop ──
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (const star of stars) {
        // Save prev projected pos
        const prevZ = star.z;
        star.px = (star.x / prevZ) * w + cx;
        star.py = (star.y / prevZ) * h + cy;

        // Move toward viewer
        star.z -= speed * 1.8;

        if (star.z <= 0) {
          Object.assign(star, makestar());
          star.z = w;
          continue;
        }

        const sx = (star.x / star.z) * w + cx;
        const sy = (star.y / star.z) * h + cy;

        // Out of bounds reset
        if (sx < 0 || sx > w || sy < 0 || sy > h) {
          Object.assign(star, makestar());
          star.z = w;
          continue;
        }

        // Size grows as star approaches
        const size = Math.max(0.2, (1 - star.z / w) * star.size * 2.5);
        const alpha = (1 - star.z / w) * star.bright;

        // Streak from prev to current
        ctx.beginPath();
        ctx.moveTo(star.px, star.py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(255,255,255,${Math.min(alpha, 0.9)})`;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.stroke();

        // Glow dot at tip
        ctx.beginPath();
        ctx.arc(sx, sy, size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(alpha * 1.2, 1)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
