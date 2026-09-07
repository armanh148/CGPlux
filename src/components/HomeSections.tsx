'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HomeSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1200',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(heroRef.current, {
        scale: 0.92,
        opacity: 0.4,
        filter: 'blur(8px)',
        duration: 1,
      })
      .fromTo(
        servicesRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 1 },
        '<'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      
      {/* 1. HOME SECTION */}
      <div
        ref={heroRef}
        className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 md:p-16 bg-black z-10"
      >
        <nav className="flex justify-between items-center text-xs tracking-widest text-zinc-400">
          <span className="text-white font-bold tracking-tighter text-lg">cgplux.</span>
          <div className="hidden md:flex space-x-8 uppercase">
            <span className="text-white cursor-pointer">Home</span>
            <span className="text-zinc-400 hover:text-white cursor-pointer">Services</span>
            <span className="text-zinc-400 hover:text-white cursor-pointer">Portfolio</span>
            <span className="text-zinc-400 hover:text-white cursor-pointer">Our Team</span>
            <span className="text-zinc-400 hover:text-white cursor-pointer">Blog</span>
            <span className="text-zinc-400 hover:text-white cursor-pointer">Contact</span>
          </div>
        </nav>

        <div className="my-auto max-w-5xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            Engineering <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #fff' }}>
              Digital
            </span>{' '}
            Dominance
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-xl font-light">
            We architect high-performance software, execute clinical technical SEO strategies, and design hyper-conversion digital assets for market leaders.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold tracking-widest uppercase cursor-pointer hover:bg-zinc-200 transition">
            View Work
          </div>
          <span className="text-xs text-zinc-500 tracking-widest">CGPLUX STUDIOS</span>
        </div>
      </div>

      {/* 2. SERVICES SECTION */}
      <div
        ref={servicesRef}
        className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 md:p-16 bg-white text-black z-20"
      >
        <div className="flex justify-between items-center text-xs tracking-widest text-zinc-600">
          <span className="font-bold tracking-tighter text-lg text-black">cgplux.</span>
          <span>(SERVICES) — WHAT WE DO</span>
        </div>

        <div className="my-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              High-Performance Architecture
            </h2>
            <p className="text-zinc-600 text-lg font-light leading-relaxed">
              From enterprise-grade backend infrastructure to pixel-perfect modern frontend execution, we deliver end-to-end digital excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 border-l border-zinc-200 pl-6">
            <div>
              <h3 className="font-bold text-lg">Full-Stack Engineering</h3>
              <p className="text-sm text-zinc-500">Custom web applications built with robust architecture.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Technical & Answer SEO</h3>
              <p className="text-sm text-zinc-500">Clinical optimization strategies to dominate search crawlers.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">Hyper-Conversion UI/UX</h3>
              <p className="text-sm text-zinc-500">Minimalist dark-mode aesthetics designed for maximum impact.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-zinc-500 tracking-widest">
          <span>SCROLL TO EXPLORE PORTFOLIO</span>
          <span>CGP LUX STUDIO — 2026</span>
        </div>
      </div>

    </div>
  );
}
