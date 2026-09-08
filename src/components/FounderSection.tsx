"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { urlFor } from "@/lib/data";

interface FounderProps {
  sectionEyebrow?: string;
  sectionTitle?: string;
  imageEyebrow?: string;
  imageTitle?: string;
  name?: string;
  role?: string;
  designation?: string;
  bio?: string[];
  coFounderName?: string;
  coFounderRole?: string;
  coFounderBio?: string[];
  coFounderPhoto?: unknown;
  coFounderInstagramUrl?: string;
  coFounderLinkedinUrl?: string;
  photo?: unknown;
  instagramUrl?: string;
  linkedinUrl?: string;
}

export default function FounderSection({
  sectionEyebrow,
  sectionTitle,
  name,
  role,
  bio,
  coFounderName,
  coFounderRole,
  coFounderBio,
  coFounderPhoto,
  coFounderInstagramUrl,
  coFounderLinkedinUrl,
  photo,
  instagramUrl,
  linkedinUrl,
}: FounderProps) {
  const ref = useRef<HTMLElement>(null);
  const [activeLeaderIndex, setActiveLeaderIndex] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".leadership-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  // Leader Data
  const ceoPhotoSrc = photo ? urlFor(photo).width(1200).url() : "/CEO Founder.avif";
  const coFounderPhotoSrc = coFounderPhoto
    ? urlFor(coFounderPhoto).width(1200).url()
    : "/Creative Director.avif";

  const leaders = [
    {
      id: "ceo",
      name: name || "Ali Murtaza",
      role: role || "CEO & Founder",
      photo: ceoPhotoSrc,
      signature: "Ali Murtaza",
      bio: bio && bio.length > 0
        ? bio[0]
        : "Welcome to a visual journey that transcends standard boundaries. Discover the artistry of cinematic CGI and high-performance digital engineering.",
      stat1: "+500k",
      stat1Label: "Visuals delivered reaching global audiences with lasting impact",
      stat2: "+99.4%",
      stat2Label: "Client satisfaction rate driven by precision and storytelling",
      instagram: instagramUrl,
      linkedin: linkedinUrl,
    },
    {
      id: "cofounder",
      name: coFounderName || "Haseeb Haider",
      role: coFounderRole || "Co-Founder & CTO",
      photo: coFounderPhotoSrc,
      signature: "Haseeb Haider",
      bio: coFounderBio && coFounderBio.length > 0
        ? coFounderBio[0]
        : "Engineered pipelines and next-gen digital systems that power immersive brand experiences across modern web and 3D architectures.",
      stat1: "+120+",
      stat1Label: "Scalable web applications and custom digital infrastructure built",
      stat2: "24/7",
      stat2Label: "Technical performance SLA maintaining peak operational uptime",
      instagram: coFounderInstagramUrl,
      linkedin: coFounderLinkedinUrl,
    },
  ];

  const currentLeader = leaders[activeLeaderIndex] || leaders[0];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Showcase Panel (Light Cream Background matching reference image) */}
        <div className="leadership-animate w-full bg-[#00000] rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 lg:p-14 text-black shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Large Typography, Social Pills & Key Metrics */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between h-full pr-0 lg:pr-4">
            <div>
              {/* Eyebrow Tag */}
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mb-4 flex items-center gap-3">
                <span className="w-6 h-[1.5px] bg-zinc-400/40" />
                {sectionEyebrow || "Leadership & Vision"}
              </div>

              {/* Massive Bold Headline matching reference image */}
              <h2 className="font-heading font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] tracking-tighter leading-[0.92] text-black mb-6 uppercase">
                {sectionTitle ? (
                  <span dangerouslySetInnerHTML={{ __html: sectionTitle }} />
                ) : (
                  <>
                    visual
                    <br />
                    poetry
                  </>
                )}
              </h2>

              {/* Subtitle / Bio Description */}
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed font-normal mb-8">
                {currentLeader.bio}
              </p>

              {/* Social Buttons with Official Brand Colors & White SVG Icons */}
              <div className="flex items-center gap-3 mb-10 sm:mb-14">
                {/* YouTube */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-red-500/30 transition-all duration-300"
                  title="YouTube"
                >
                  <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
                    <path fill="white" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={currentLeader.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-pink-500/30 transition-all duration-300"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
                    <path fill="white" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-blue-500/30 transition-all duration-300"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
                    <path fill="white" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={currentLeader.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-blue-600/30 transition-all duration-300"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
                    <path fill="white" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-black/30 transition-all duration-300"
                  title="X"
                >
                  <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
                    <path fill="white" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Bottom Stats Metrics matching reference image */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/10">
              {/* Stat 1 */}
              <div>
                <div className="font-heading font-extrabold italic text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight mb-2">
                  {currentLeader.stat1}
                </div>
                <p className="text-zinc-600 text-xs sm:text-sm leading-snug font-normal">
                  {currentLeader.stat1Label}
                </p>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="font-heading font-extrabold italic text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight mb-2">
                  {currentLeader.stat2}
                </div>
                <p className="text-zinc-600 text-xs sm:text-sm leading-snug font-normal">
                  {currentLeader.stat2Label}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Vibrant Yellow Notched Card & Visual Leader Portrait */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full flex items-center justify-center">
            {/* The Signature Yellow Card Container */}
            <div className="relative w-full aspect-[4/4.8] sm:aspect-[4/4.3] lg:aspect-[4/4.6] bg-[#F4AC3B] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-xl flex flex-col justify-between">
              
              {/* Top Bar inside Yellow Card */}
              <div className="relative z-20 p-6 sm:p-8 flex items-center justify-between">
                {/* Handwritten / Script Watermark Signature */}
                <div className="font-serif italic text-2xl sm:text-3xl font-normal text-white/90 tracking-wide select-none drop-shadow-xs">
                  {currentLeader.signature}
                </div>

                {/* Top Right Globe Badge (matching screenshot) */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
              </div>

              {/* Central Leader Portrait Photo */}
              <div className="absolute inset-0 w-full h-full z-10 overflow-hidden flex items-end justify-center bg-[#F4AC3B]">
                <img
                  key={currentLeader.id}
                  src={currentLeader.photo}
                  alt={currentLeader.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.08] brightness-100 transition-all duration-700 ease-out animate-in fade-in"
                />
              </div>

              {/* Left Cutout Scoop / Notched Column with Avatar Switchers & Arrow */}
              <div className="absolute left-0 bottom-6 sm:bottom-8 z-30 flex flex-col items-center gap-3 p-3 bg-[#F9F7F2] rounded-r-3xl shadow-lg border-y border-r border-black/5">
                {/* Avatar Switcher 1 (CEO) */}
                <button
                  type="button"
                  onClick={() => setActiveLeaderIndex(0)}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    activeLeaderIndex === 0
                      ? "border-black scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  title="Ali Murtaza - CEO"
                >
                  <img
                    src={leaders[0].photo}
                    alt="Ali Murtaza"
                    className="w-full h-full object-cover grayscale"
                  />
                </button>

                {/* Avatar Switcher 2 (Co-Founder) */}
                <button
                  type="button"
                  onClick={() => setActiveLeaderIndex(1)}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                    activeLeaderIndex === 1
                      ? "border-black scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  title="Haseeb Haider - Co-Founder"
                >
                  <img
                    src={leaders[1].photo}
                    alt="Haseeb Haider"
                    className="w-full h-full object-cover grayscale"
                  />
                </button>

                {/* Bottom Action Button (Black Circle Arrow ↗ matching screenshot) */}
                <a
                  href="/contact"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-md mt-1"
                  title="Contact Leadership"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>

              {/* Leader Role Badge at Bottom Right of Yellow Card */}
              <div className="relative z-20 p-6 sm:p-8 flex justify-end">
                <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest font-semibold shadow-lg">
                  {currentLeader.name} — {currentLeader.role}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
