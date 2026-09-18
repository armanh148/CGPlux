"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { urlFor } from "@/lib/data";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  photo?: unknown;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  image?: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".team-card");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const fallback = [
    {
      _id: "1",
      name: "Ali Murtaza",
      role: "CHIEF EXECUTIVE OFFICER",
      image: "/CEO Founder.avif",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      github: "https://github.com",
    },
    {
      _id: "ai-card",
      isAiCard: true,
      name: "AI Talent Matcher",
      role: "CORE ENGINE",
    },
    {
      _id: "2",
      name: "Haseeb Haider",
      role: "CREATIVE DIRECTOR",
      image: "/Creative Director.avif",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      github: "https://github.com",
    },
    {
      _id: "3",
      name: "Syeda Aemal",
      role: "MARKETING LEAD",
      image: "/Girl-2.avif",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      github: "https://github.com",
    },
    {
      _id: "4",
      name: "Yawer Abbas",
      role: "FINANCE & OPS DIRECTOR",
      image: "/Finance Manager.avif",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      github: "https://github.com",
    },
    {
      _id: "5",
      name: "Ozaib Khan",
      role: "LEAD SALES STRATEGIST",
      image: "/Sales Manager.avif",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      github: "https://github.com",
    },
    {
      _id: "6",
      name: "Eiman Zehra",
      role: "OPERATIONS MANAGER",
      image: "/Client-2.avif",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      github: "https://github.com",
    },
    {
      _id: "7",
      name: "Hamza Tariq",
      role: "SR. FULL-STACK ARCHITECT",
      image: "/Client-1.avif",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      github: "https://github.com",
    },
  ];

  const defaultItems = members.length > 0
    ? members.map((m, idx) => ({
        _id: m._id || String(idx),
        name: m.name,
        role: m.role.toUpperCase(),
        linkedin: m.linkedin || "https://linkedin.com",
        instagram: m.instagram || "https://instagram.com",
        twitter: m.twitter || "https://x.com",
        github: m.github || "https://github.com",
        image: m.photo
          ? urlFor(m.photo).width(800).height(1000).url()
          : idx === 0
          ? "/CEO Founder.avif"
          : idx === 1
          ? "/Creative Director.avif"
          : idx === 2
          ? "/Girl-2.avif"
          : "/Client-1.avif",
      }))
    : fallback;

  return (
    <div className="w-full flex flex-col gap-16">
      {/* Team Cards Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
      >
        {defaultItems.map((item: any) => {
          if (item.isAiCard) {
            return (
              <div
                key={item._id}
                className="team-card relative aspect-[3/4] rounded-none border border-white/[0.12] bg-[#0c0d12] p-6 flex flex-col justify-between overflow-hidden shadow-2xl group transition-all duration-300 hover:border-white/30"
              >
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-white/[0.08] border border-white/10 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
                    <span className="text-white">✦</span>
                    <span>Core-4.0</span>
                    <span className="text-zinc-500 text-[9px] ml-0.5">▼</span>
                  </div>
                </div>

                {/* Center Animation / Scanner */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                  <div className="relative w-20 h-20 rounded-none overflow-hidden mb-3 border border-white/15 p-1 bg-white/[0.02]">
                    <div className="w-full h-full rounded-none bg-zinc-800/60 backdrop-blur-sm flex items-center justify-center relative">
                      <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
                    LOOKING FOR A CANDIDATE
                  </span>
                </div>

                {/* Bottom Query & Action */}
                <div className="relative z-10 flex flex-col gap-4">
                  <p className="text-[13px] leading-relaxed text-zinc-200 font-normal">
                    Find <strong className="text-white font-semibold">Middle UI/UX Designers</strong> with strong{" "}
                    <strong className="text-white font-semibold">3D &amp; Next.js</strong> skills, 5+ years&apos; experience, remote.
                  </p>

                  <div className="flex items-center justify-center pt-1">
                    <Link
                      href="/contact"
                      className="w-full py-2.5 px-4 rounded-none bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-mono tracking-wider text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <span>FINDING...</span>
                      <svg
                        className="w-3.5 h-3.5 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item._id}
              className="team-card relative aspect-[3/4] rounded-none border border-white/[0.08] bg-[#0c0c0f] overflow-hidden group transition-all duration-500 shadow-xl hover:border-white/25"
            >
              {/* Photo Background */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={item.image || "/Client-1.avif"}
                  alt={item.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Seamless Dark Gradient Vignette for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />

              {/* Card Bottom Details & Social Links */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col z-10">
                {/* Name */}
                <h3 className="font-heading font-bold text-xl md:text-[22px] tracking-tight text-white mb-1 leading-snug">
                  {item.name}
                </h3>

                {/* Role */}
                <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-3 font-medium">
                  {item.role}
                </div>

                {/* Social Media Links Row */}
                <div className="flex items-center gap-2 pt-2.5 border-t border-white/10">
                  {/* LinkedIn */}
                  <a
                    href={item.linkedin || "https://linkedin.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-none border border-white/15 bg-black/60 hover:bg-white hover:text-black text-zinc-300 flex items-center justify-center transition-all duration-300 shadow-xs"
                    title="LinkedIn"
                    aria-label={`${item.name} LinkedIn`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href={item.instagram || "https://instagram.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-none border border-white/15 bg-black/60 hover:bg-white hover:text-black text-zinc-300 flex items-center justify-center transition-all duration-300 shadow-xs"
                    title="Instagram"
                    aria-label={`${item.name} Instagram`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href={item.twitter || "https://x.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-none border border-white/15 bg-black/60 hover:bg-white hover:text-black text-zinc-300 flex items-center justify-center transition-all duration-300 shadow-xs"
                    title="X"
                    aria-label={`${item.name} X`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href={item.github || "https://github.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-none border border-white/15 bg-black/60 hover:bg-white hover:text-black text-zinc-300 flex items-center justify-center transition-all duration-300 shadow-xs"
                    title="GitHub"
                    aria-label={`${item.name} GitHub`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Conversion Bar matching the screenshot */}
      <div className="w-full pt-10 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-8">
        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-2xl">
          Harness the power of digital engineering to streamline your workflow, match talent with
          precision, and build scalable systems — faster than ever.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-between gap-6 px-7 py-4 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 shadow-xl shadow-white/5 group self-start md:self-auto"
        >
          <span>Get started</span>
          <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
