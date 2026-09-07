"use client";

import { useEffect, useRef } from "react";
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
  coFounderInstagramUrl?: string;
  coFounderLinkedinUrl?: string;
  photo?: unknown;
  instagramUrl?: string;
  linkedinUrl?: string;
}

export default function FounderSection({ 
  sectionEyebrow, sectionTitle, imageEyebrow, imageTitle,
  name, role, designation, bio, 
  coFounderName, coFounderRole, coFounderBio, coFounderInstagramUrl, coFounderLinkedinUrl,
  photo, instagramUrl, linkedinUrl 
}: FounderProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".founder-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { 
            trigger: ref.current, 
            start: "top 80%",
            toggleActions: "play none none none" 
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const defaultBio1 = [
    "Driven by a passion for CGI, VFX, and cinematic storytelling, our CEO built this studio with a vision to create world-class advertising visuals that leave a lasting impact.",
  ];
  
  const defaultBio2 = [
    "Under their combined direction, the studio continues to push the boundaries of modern advertising through visually striking and emotionally engaging content. Our CTO ensures cutting-edge technology drives our pipelines.",
  ];

  const displayBio1 = bio && bio.length > 0 ? bio : defaultBio1;
  const displayBio2 = coFounderBio && coFounderBio.length > 0 ? coFounderBio : defaultBio2;

  const photoSrc = photo
    ? urlFor(photo).width(1600).url()
    : "/CEO Founder.avif";

  return (
    <section ref={ref} className="py-24 md:py-32 bg-brand-dark overflow-hidden">
      <div className="w-full px-6 lg:px-12 flex flex-col items-center">
        
        {/* Top Header Panel (Centered) */}
        <div className="founder-animate w-full flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-brand-accent"></span>
            {sectionEyebrow || "Leadership"}
            <span className="w-8 h-[1px] bg-brand-accent"></span>
          </div>
          
          {sectionTitle ? (
            <h2 
              className="font-heading font-medium tracking-tight text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.1] text-white whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: sectionTitle }}
            />
          ) : (
            <h2 className="font-heading font-medium tracking-tight text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.1] text-white">
              The Minds Behind<br/>
              <span className="text-white/50 italic font-light">The Studio</span>
            </h2>
          )}
        </div>

        {/* 3 Columns Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.8fr_1fr] xl:grid-cols-[1fr_2.5fr_1fr] gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Co-Founder Intro */}
          <div className="founder-animate flex flex-col items-center lg:items-end text-center lg:text-right order-2 lg:order-1">
            <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-brand-accent mb-2">
              {coFounderRole || "Co-Founder & CTO"}
            </div>
            <div className="font-heading text-xl text-white mb-4">
              {coFounderName || "The CTO"}
            </div>
            <div className="flex flex-col gap-4 text-white/60 leading-[1.8] text-[15px] max-w-[45ch]">
              {displayBio2.map((para, i) => (
                <p key={i}>
                  {para}
                </p>
              ))}
            </div>
            {/* Social Links for Co-Founder */}
            {(coFounderInstagramUrl || coFounderLinkedinUrl) && (
              <div className="flex items-center justify-center lg:justify-end gap-5 mt-10">
                {coFounderInstagramUrl && (
                  <a href={coFounderInstagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                )}
                {coFounderLinkedinUrl && (
                  <a href={coFounderLinkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300" aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Center Column: Image */}
          <div className="founder-animate flex justify-center relative order-1 lg:order-2 w-full">
            <div className="w-full relative bg-black/50 overflow-hidden border border-white/[0.08] group rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-brand-accent/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <img
                src={photoSrc}
                alt="Founders"
                className="w-full h-auto object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-center lg:text-left">
                <div className="font-mono text-[10px] tracking-widest text-brand-accent uppercase mb-1">{imageEyebrow || "Founders"}</div>
                <div className="font-heading font-bold tracking-tight text-white text-xl">{imageTitle || "The Leadership"}</div>
              </div>
            </div>

            {/* Minimal Background Blur Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-brand-accent/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>
          </div>

          {/* Right Column: Founder & CEO Intro */}
          <div className="founder-animate flex flex-col items-center lg:items-start text-center lg:text-left order-3">
            <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-brand-accent mb-2">
              {role || "CEO & Founder"}
            </div>
            <div className="font-heading text-xl text-white mb-4">
              {name || "The CEO"}
            </div>
            <div className="flex flex-col gap-4 text-white/60 leading-[1.8] text-[15px] max-w-[45ch]">
              {displayBio1.map((para, i) => (
                <p key={i}>
                  {para}
                </p>
              ))}
            </div>

            {/* Social Links */}
            {(instagramUrl || linkedinUrl) && (
              <div className="flex items-center justify-center lg:justify-start gap-5 mt-10">
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300" aria-label="Instagram">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                )}
                {linkedinUrl && (
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-accent hover:border-brand-accent/50 transition-all duration-300" aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>

        </div>
        
      </div>
    </section>
  );
}
