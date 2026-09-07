"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface HeroProps {
  eyebrow?: string;
  title?: string;
  titleStroke?: string;
  subtitle?: string;
  projectsDelivered?: string;
  techStack?: string;
  successRate?: string;
}

export default function Hero({
  eyebrow = "Full-Cycle Digital Studio",
  title = "CUSTOM CRM, DESIGN,",
  titleStroke = "APP & WEB DEVELOPMENT",
  subtitle = "We engineer high-performance web solutions, bespoke mobile apps, and scalable digital infrastructure. Business process optimization, rapid launch, and end-to-end technical support.",
  projectsDelivered = "250+",
  techStack = "Next.js • React • Node • Cloud",
  successRate = "99.4%",
}: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.1 }
      );

      tl.fromTo(
        ".hero-headline-line",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-actions",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.6"
      );

      tl.fromTo(
        ".hero-metric-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] pt-28 sm:pt-32 lg:pt-36 flex flex-col justify-between overflow-hidden bg-[#09090b] border-b border-white/[0.08]"
    >
      {/* Fine Architectural Grid & Subtle Radial Ambient */}
      <div className="absolute inset-0 redstone-grid-lines opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full px-6 lg:px-12 pt-6 lg:pt-12 pb-16 flex-1 flex flex-col justify-center">
        {/* Top Badges (Trust Proof) */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="hero-badge redstone-pill text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {eyebrow}
          </div>
          <div className="hero-badge redstone-pill text-zinc-400">
            ★ 5.0 CLUTCH VERIFIED
          </div>
          <div className="hero-badge redstone-pill text-zinc-400 hidden sm:inline-flex">
            AWWWARDS NOMINEE
          </div>
        </div>

        {/* Editorial Headline */}
        <div ref={textContainerRef} className="max-w-6xl mb-8">
          <h1 className="font-heading font-black tracking-tighter text-[44px] sm:text-[62px] md:text-[80px] lg:text-[92px] leading-[0.96] text-white uppercase">
            <div className="hero-headline-line overflow-hidden">
              <span className="block">{title}</span>
            </div>
            <div className="hero-headline-line overflow-hidden mt-1">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                {titleStroke}
              </span>
            </div>
          </h1>

          <p className="hero-desc mt-8 text-zinc-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="hero-actions flex flex-wrap items-center gap-4 pt-2 mb-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 shadow-lg shadow-white/5 group"
          >
            <span className="text-black">Start a Project</span>
            <span className="text-black transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>

          <Link
            href="#portfolio"
            className="inline-flex items-center gap-3 px-7 py-4 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 hover:bg-zinc-850 text-zinc-200 font-mono text-xs uppercase tracking-widest font-medium rounded-sm transition-all duration-300"
          >
            <span>Explore Portfolio</span>
            <span className="text-zinc-500">↓</span>
          </Link>
        </div>
      </div>

      {/* Redstone Signature Bottom Metrics Bar */}
      <div className="relative z-10 w-full border-t border-white/[0.08] bg-[#0c0c0f]/80 backdrop-blur-md">
        <div className="w-full px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          <div className="hero-metric-item py-5 sm:py-6 lg:py-7 pr-4 sm:pr-6">
            <div className="text-xl sm:text-2xl lg:text-4xl font-black font-heading text-white tracking-tight">
              {projectsDelivered}
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mt-1">
              Projects Launched
            </div>
          </div>

          <div className="hero-metric-item py-5 sm:py-6 lg:py-7 px-4 sm:px-6">
            <div className="text-xl sm:text-2xl lg:text-4xl font-black font-heading text-white tracking-tight">
              {successRate}
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mt-1">
              Client Satisfaction
            </div>
          </div>

          <div className="hero-metric-item py-5 sm:py-6 lg:py-7 px-4 sm:px-6">
            <div className="text-xl sm:text-2xl lg:text-4xl font-black font-heading text-white tracking-tight">
              25 - 70 d
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mt-1">
              Avg. Delivery Cycle
            </div>
          </div>

          <div className="hero-metric-item py-5 sm:py-6 lg:py-7 pl-4 sm:pl-6">
            <div className="text-xl sm:text-2xl lg:text-4xl font-black font-heading text-white tracking-tight">
              24 / 7
            </div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mt-1">
              Support & SLA Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
