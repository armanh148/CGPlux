"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollAnimOpts {
  /** CSS selector or element(s) to animate. Default: direct children. */
  targets?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string;
  start?: string;
  stagger?: number;
  duration?: number;
}

/**
 * Reusable scroll-trigger animation hook.
 * Scope is pinned to the returned `ref` element.
 */
export function useScrollAnimation(opts: ScrollAnimOpts = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const {
      targets = "[data-animate]",
      from = { y: 48, opacity: 0 },
      to,
      start = "top 82%",
      stagger = 0.12,
      duration = 0.9,
    } = opts;

    const ctx = gsap.context(() => {
      const toVars: gsap.TweenVars = {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "expo.out",
        ...(to || {}),
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
          ...((to as any)?.scrollTrigger || {}),
        },
      };
      gsap.fromTo(targets, from, toVars);
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.refresh());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Lightweight hover tilt effect — attach to any card container.
 * Returns an onMouseMove / onMouseLeave pair.
 */
export function useTiltHover(intensity = 8) {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -intensity;
    gsap.to(el, { rotateX: y, rotateY: x, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1,0.6)" });
  };

  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
