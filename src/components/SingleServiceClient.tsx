"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/data";
import { gsap } from "@/lib/gsap";
import { ServiceDetailData } from "@/app/(frontend)/services/[slug]/page";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SingleServiceClient({ service }: { service: ServiceDetailData | any }) {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"deliverables" | "process">("deliverables");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate Visual Reveal
      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { scale: 0.95, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );
      }

      // Animate Text Elements Staggered
      tl.fromTo(
        ".svc-animate",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.9"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!visualRef.current) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(visualRef.current, {
      x: x * 20,
      y: y * 20,
      rotationY: x * 8,
      rotationX: -y * 8,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  const handleMouseLeave = () => {
    if (!visualRef.current) return;
    gsap.to(visualRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1, 0.5)",
      duration: 1.2,
    });
  };

  const deliverables = service.deliverables || [];
  const processSteps = service.process || [];
  const specs = service.specs || [];
  const tags = service.tags || [];

  return (
    <section
      ref={containerRef}
      className="pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-32 bg-[#0c0f10] text-white min-h-screen relative overflow-hidden border-b border-white/[0.08]"
    >
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 redstone-grid-lines opacity-30 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Top Navigation & Breadcrumb */}
        <div className="svc-animate flex items-center justify-between gap-4 pb-8 mb-10 border-b border-white/[0.08]">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-200 group"
          >
            <span className="text-zinc-500 group-hover:-translate-x-1 transition-transform duration-200">&larr;</span>
            <span>BACK TO SERVICES ARCHIVE</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            <span>SERVICE ARCHITECTURE</span>
            <span>//</span>
            <span className="text-zinc-300 font-bold">{service.category || "CORE"}</span>
          </div>
        </div>

        {/* Hero Section: Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column — Title, Tagline, Tags, Specs, CTAs */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="svc-animate flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-3">
              <span className="w-6 h-[1.5px] bg-zinc-400" />
              {service.category || "ENGINEERING CAPABILITY"}
            </div>

            <h1 className="svc-animate font-heading font-black tracking-tight text-3xl sm:text-5xl lg:text-6xl text-white uppercase leading-[1.05] mb-6">
              {service.title}
            </h1>

            <p className="svc-animate text-zinc-300 text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-2xl">
              {service.tagline || service.description}
            </p>

            {/* Capability Tags */}
            {tags.length > 0 && (
              <div className="svc-animate flex flex-wrap gap-2 mb-10">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-300 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Technical Specs Metric Grid */}
            {specs.length > 0 && (
              <div className="svc-animate grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-zinc-900/50 border border-zinc-800 rounded-none mb-10">
                {specs.map((spec: { label: string; value: string }, i: number) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                      {spec.label}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="svc-animate flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-widest font-bold rounded-sm text-center transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>REQUEST SERVICE PROPOSAL</span>
                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </Link>

              <Link
                href="/portfolio"
                className="px-7 py-3.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-widest text-center transition-all duration-200 rounded-sm"
              >
                VIEW CASE STUDIES
              </Link>
            </div>
          </div>

          {/* Right Column — 3D Interactive Visual Showcase Container */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-none bg-zinc-900/80 border border-zinc-800 relative p-6 flex items-center justify-center group overflow-hidden shadow-2xl transition-all duration-500 filter grayscale group-hover:grayscale-0"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Top Bar Accents */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-black/40 text-zinc-400 border border-white/10">
                  {service.category}
                </span>
                <span className="font-mono text-xs font-bold text-zinc-500">SPEC: 01</span>
              </div>

              {/* Center Image or 3D Render Device Mockup */}
              <div ref={visualRef} className="relative w-full h-full flex items-center justify-center pt-8">
                {service.image ? (
                  <div className="relative w-full h-full rounded-none overflow-hidden border border-white/15 shadow-2xl">
                    <Image
                      src={
                        typeof service.image === "string"
                          ? service.image
                          : urlFor(service.image).width(1000).height(1250).url()
                      }
                      alt={service.title}
                      fill
                      priority
                      className="object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />
                  </div>
                ) : (
                  <ServiceVisualMockup type={service.type || "laptop-angled"} service={service} />
                )}
              </div>

              {/* Bottom Subtle Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end pointer-events-none">
                <div>
                  <h4 className="font-heading font-bold text-sm text-white line-clamp-1">{service.title}</h4>
                  <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">ENGINEERING SPEC SHEET</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Detailed Overview & Technical Content */}
        <div className="svc-animate pt-14 border-t border-white/[0.08] mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-3">
                <span className="w-5 h-[1.5px] bg-zinc-400" />
                OVERVIEW
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Architectural Approach & Scope
              </h2>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6 text-zinc-300 font-light leading-relaxed text-base sm:text-lg">
              <p>{service.description}</p>

              {service.content ? (
                <div className="prose prose-invert max-w-none text-zinc-300 font-light">
                  <PortableText value={service.content} />
                </div>
              ) : (
                <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-none text-sm font-normal text-zinc-400 space-y-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold mb-1">
                    DEVELOPMENT PROTOCOL & STANDARDS:
                  </p>
                  <p>
                    Every project undergoes strict peer reviews, automated unit testing, and performance benchmark audits prior to production deployment.
                  </p>
                  <p>
                    We maintain strict type safety, modular component hierarchies, and isolated backend services to guarantee effortless maintenance and long-term scalability.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Deliverables & Engineering Methodology Tabs */}
        <div className="svc-animate pt-14 border-t border-white/[0.08] mb-20">
          {/* Tab Selection Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-2">
                <span className="w-5 h-[1.5px] bg-zinc-400" />
                CAPABILITIES & PROCESS
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                EXECUTION BREAKDOWN
              </h2>
            </div>

            <div className="flex gap-2 border border-zinc-800 p-1 bg-zinc-900/90 rounded-sm">
              <button
                type="button"
                onClick={() => setActiveTab("deliverables")}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "deliverables"
                    ? "bg-white text-black font-bold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                KEY DELIVERABLES ({deliverables.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("process")}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer ${
                  activeTab === "process"
                    ? "bg-white text-black font-bold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                5-STAGE METHODOLOGY ({processSteps.length})
              </button>
            </div>
          </div>

          {/* Deliverables Tab Content */}
          {activeTab === "deliverables" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((item: { title: string; desc: string }, idx: number) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800 rounded-none flex flex-col justify-between hover:border-zinc-600 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-white transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-white transition-colors" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white mb-3 tracking-tight group-hover:text-zinc-100">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Process Timeline Tab Content */}
          {activeTab === "process" && (
            <div className="space-y-4">
              {processSteps.map((step: { step: string; title: string; desc: string }, idx: number) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 bg-zinc-900/40 border border-zinc-800 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-zinc-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-6 md:w-4/12">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-zinc-500">
                      {step.step || `0${idx + 1}`}
                    </span>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight uppercase">
                      {step.title}
                    </h3>
                  </div>

                  <div className="md:w-8/12">
                    <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 4: Pre-Footer Action Banner */}
        <div className="svc-animate mt-20 p-8 sm:p-12 lg:p-16 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-zinc-800 rounded-none flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-2 flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-zinc-400" />
              START A PROJECT
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              Ready to Engineer Your Technical Solution?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light mt-2">
              Book a technical discovery session with our engineering leads to discuss requirements, architecture, and timeline estimates.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-widest font-bold rounded-sm flex-shrink-0 transition-all duration-200 shadow-xl flex items-center gap-2 group whitespace-nowrap"
          >
            <span>SCHEDULE DISCOVERY</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

{/* Helper mockup graphic component for Service visual matching high-end 3D device visuals */}
function ServiceVisualMockup({ type, service }: { type: string; service: any }) {
  if (type === "laptop-saas") {
    return (
      <div className="relative w-full h-[240px] sm:h-[270px] flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
        <div className="w-[260px] sm:w-[300px] h-[170px] sm:h-[190px] bg-[#1e1e24] rounded-t-xl p-2 shadow-2xl border border-white/20">
          <div className="w-full h-full bg-slate-900 rounded-lg p-3 text-white flex flex-col justify-between text-[9px]">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1 font-bold">
              <span className="text-emerald-400 font-mono">{service.title?.slice(0, 20)}</span>
              <span className="text-[7px] bg-emerald-500/20 text-emerald-300 px-1 rounded">LIVE SLA</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 my-2">
              <div className="bg-slate-800 p-1.5 rounded">
                <div className="text-[7px] text-slate-400">Throughput</div>
                <div className="font-bold text-xs text-white">99.9%</div>
              </div>
              <div className="bg-slate-800 p-1.5 rounded">
                <div className="text-[7px] text-slate-400">Latency</div>
                <div className="font-bold text-xs text-emerald-400">&lt; 45ms</div>
              </div>
              <div className="bg-slate-800 p-1.5 rounded">
                <div className="text-[7px] text-slate-400">Status</div>
                <div className="font-bold text-xs text-cyan-300">ACTIVE</div>
              </div>
            </div>
            <div className="h-8 bg-slate-800 rounded p-1 flex items-end justify-between gap-1">
              <div className="w-full bg-emerald-500 h-5 rounded-t" />
              <div className="w-full bg-emerald-400 h-7 rounded-t" />
              <div className="w-full bg-emerald-600 h-4 rounded-t" />
              <div className="w-full bg-emerald-300 h-6 rounded-t" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "phone") {
    return (
      <div className="relative w-[170px] sm:w-[190px] h-[250px] sm:h-[280px] bg-[#111] rounded-[30px] p-2 shadow-2xl border-4 border-zinc-700/80 group-hover:scale-105 transition-transform duration-700 ease-out">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-20" />
        <div className="w-full h-full bg-zinc-950 text-white rounded-[22px] overflow-hidden flex flex-col pt-5 px-3 pb-3 text-[8px]">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 font-bold font-mono">
            <span className="truncate">{service.title}</span>
            <span className="text-emerald-400 font-mono text-[9px]">●</span>
          </div>
          <div className="my-3 p-2 bg-zinc-900 rounded border border-zinc-800">
            <div className="text-[7px] text-zinc-400 font-mono">ARCHITECTURE</div>
            <div className="font-bold text-xs text-white mt-0.5">Mobile Native</div>
          </div>
          <div className="grid grid-cols-2 gap-1 flex-1">
            <div className="bg-zinc-800 rounded p-1 flex flex-col justify-center items-center">
              <span className="font-bold text-emerald-400">60 FPS</span>
              <span className="text-[6px] text-zinc-400">FLUID</span>
            </div>
            <div className="bg-zinc-800 rounded p-1 flex flex-col justify-center items-center">
              <span className="font-bold text-cyan-400">OFFLINE</span>
              <span className="text-[6px] text-zinc-400">SYNC</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Angled Macbook Laptop
  return (
    <div className="relative w-full h-[240px] sm:h-[270px] flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-700 ease-out">
      <div className="w-[260px] sm:w-[300px] h-[170px] sm:h-[190px] bg-[#1a1c23] rounded-t-xl p-2 shadow-2xl border border-white/20 relative">
        <div className="w-full h-full bg-zinc-950 rounded-lg overflow-hidden flex flex-col relative text-white">
          <div className="bg-zinc-900 border-b border-zinc-800 px-3 py-1.5 flex items-center justify-between text-[9px] font-mono font-bold">
            <span className="text-zinc-300">{service.title?.slice(0, 18)}</span>
            <span className="text-[7px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-300">CGPLUX SPEC</span>
          </div>
          <div className="p-3 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex-1 flex flex-col justify-center">
            <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              {service.category || "CORE CAPABILITY"}
            </span>
            <h4 className="text-xs font-black text-white uppercase tracking-tight mt-1 leading-snug">
              {service.tagline || service.title}
            </h4>
            <div className="mt-3 w-max px-2 py-1 bg-white text-black text-[8px] font-mono font-bold rounded">
              EXPLORE ARCHITECTURE &rarr;
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-2 w-[290px] sm:w-[330px] h-[12px] bg-[#2a2d37] rounded-b-xl border-t border-white/10 shadow-2xl flex justify-center">
        <div className="w-12 h-1 bg-zinc-600 rounded-b" />
      </div>
    </div>
  );
}
