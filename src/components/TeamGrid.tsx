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
  image?: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [hiredMembers, setHiredMembers] = useState<Record<string, boolean>>({});
  const [declinedMembers, setDeclinedMembers] = useState<Record<string, boolean>>({});

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
    },
    {
      _id: "3",
      name: "Syeda Aemal",
      role: "MARKETING LEAD",
      image: "/Girl-2.avif",
    },
    {
      _id: "4",
      name: "Yawer Abbas",
      role: "FINANCE & OPS DIRECTOR",
      image: "/Finance Manager.avif",
    },
    {
      _id: "5",
      name: "Ozaib Khan",
      role: "LEAD SALES STRATEGIST",
      image: "/Sales Manager.avif",
    },
    {
      _id: "6",
      name: "Eiman Zehra",
      role: "OPERATIONS MANAGER",
      image: "/Client-2.avif",
    },
    {
      _id: "7",
      name: "Hamza Tariq",
      role: "SR. FULL-STACK ARCHITECT",
      image: "/Client-1.avif",
    },
  ];

  const defaultItems = members.length > 0
    ? members.map((m, idx) => ({
        _id: m._id || String(idx),
        name: m.name,
        role: m.role.toUpperCase(),
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

  const toggleHire = (id: string) => {
    setHiredMembers((prev) => ({ ...prev, [id]: !prev[id] }));
    setDeclinedMembers((prev) => ({ ...prev, [id]: false }));
  };

  const toggleDecline = (id: string) => {
    setDeclinedMembers((prev) => ({ ...prev, [id]: !prev[id] }));
    setHiredMembers((prev) => ({ ...prev, [id]: false }));
  };

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
                className="team-card relative aspect-[3/4] rounded-xl border border-white/[0.12] bg-[#0c0d12] p-6 flex flex-col justify-between overflow-hidden shadow-2xl group transition-all duration-300 hover:border-white/30"
              >
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
                    <span className="text-white">✦</span>
                    <span>Core-4.0</span>
                    <span className="text-zinc-500 text-[9px] ml-0.5">▼</span>
                  </div>
                </div>

                {/* Center Animation / Scanner */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border border-white/15 p-1 bg-white/[0.02]">
                    <div className="w-full h-full rounded-full bg-zinc-800/60 backdrop-blur-sm flex items-center justify-center relative">
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
                      className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-mono tracking-wider text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-all"
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

          const isHired = hiredMembers[item._id];
          const isDeclined = declinedMembers[item._id];

          return (
            <div
              key={item._id}
              className={`team-card relative aspect-[3/4] rounded-xl border border-white/[0.08] bg-[#0c0c0f] overflow-hidden group transition-all duration-500 shadow-xl ${
                isDeclined ? "opacity-35 grayscale" : "opacity-100"
              } hover:border-white/25`}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

              {/* Card Bottom Details & Actions */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col z-10">
                {/* Name */}
                <h3 className="font-heading font-bold text-xl md:text-[22px] tracking-tight text-white mb-1 leading-snug">
                  {item.name}
                </h3>

                {/* Role */}
                <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-zinc-400 mb-4 font-medium">
                  {item.role}
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center gap-2.5 pt-1">
                  {/* HIRE Button */}
                  <button
                    type="button"
                    onClick={() => toggleHire(item._id)}
                    className={`flex-1 py-2 px-3.5 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isHired
                        ? "bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                        : "bg-white hover:bg-zinc-200 text-black shadow-md shadow-white/5"
                    }`}
                  >
                    <span>{isHired ? "HIRED" : "HIRE"}</span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isHired ? "bg-black text-emerald-400" : "bg-black text-white"
                      }`}
                    >
                      ✓
                    </span>
                  </button>

                  {/* DECLINE Button */}
                  <button
                    type="button"
                    onClick={() => toggleDecline(item._id)}
                    className={`flex-1 py-2 px-3.5 rounded-full font-mono text-[11px] font-medium tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                      isDeclined
                        ? "bg-red-500/20 border-red-500/50 text-red-300"
                        : "bg-black/40 backdrop-blur-md border-white/20 hover:border-white/50 text-zinc-300 hover:text-white"
                    }`}
                  >
                    <span>{isDeclined ? "DECLINED" : "DECLINE"}</span>
                    <span className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center text-[10px] text-zinc-300 leading-none">
                      ✕
                    </span>
                  </button>
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
