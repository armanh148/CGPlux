"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/data";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PortfolioItem {
  _id: string;
  title: string;
  slug: { current: string };
  image?: any;
  category?: string;
  excerpt?: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
}

const categories = [
  { label: "All", value: "" },
  { label: "3D Animation", value: "3d-animation" },
  { label: "3D Visualization", value: "3d-visualization" },
  { label: "3D Architectural", value: "3d-architectural" },
  { label: "CGI Advertisement", value: "cgi-advertisement" },
  { label: "Motion Graphics", value: "motion-graphics" },
];

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter
    ? items.filter((item) => item.category === activeFilter)
    : items;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".portfolio-card");
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, rotateX: 15, transformPerspective: 800 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, [activeFilter]);

  const fallback = [
    { title: "Dream Glaze CGI Animation", category: "3d-animation" },
    { title: "Valentino Uomo Perfume 3D", category: "3d-animation" },
    { title: "3D Visualization For Baaroq", category: "3d-visualization" },
    { title: "Ultra Realistic 3D Product Rendering", category: "3d-visualization" },
    { title: "Rolex Submarine Watch 3D", category: "3d-animation" },
    { title: "3D Animation Of Shoes", category: "3d-animation" },
  ];

  const displayItems: PortfolioItem[] = items.length > 0
    ? filtered
    : fallback
        .filter((f) => !activeFilter || f.category === activeFilter)
        .map((f, i) => ({ _id: String(i), title: f.title, slug: { current: f.title.toLowerCase().replace(/\s+/g, "-") }, category: f.category }));

  return (
    <>
      <div ref={headerRef}>
        <div className="opacity-0">
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-brand-accent/90 mb-3">
            Portfolio
          </div>
          <h1 className="font-extrabold tracking-tight text-[48px] max-md:text-[36px] mb-6">
            Our Work
          </h1>
        </div>

        {/* Category filters - scrollable on mobile */}
        <div className="flex gap-2 mb-10 opacity-0 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`
                font-mono text-[11px] uppercase tracking-[0.16em] px-4 py-2 rounded-sm border cursor-pointer
                transition-all duration-300 ease-out
                ${
                  activeFilter === cat.value
                    ? "border-brand-accent/55 bg-brand-accent/[0.08] text-brand-accent"
                    : "border-white/[0.18] bg-transparent text-white/62 hover:border-brand-accent/30 hover:text-white/90"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {displayItems.map((item) => (
          <div
            key={item._id}
            className="portfolio-card opacity-0 project-card magnetic relative aspect-[3/4] rounded-xl border border-white/[0.08] bg-black overflow-hidden group cursor-default filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
          >
            <div className="absolute inset-0 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
              {item.image ? (
                <Image
                  src={urlFor(item.image).width(600).height(800).url()}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] filter grayscale group-hover:grayscale-0 brightness-[0.85] group-hover:brightness-100"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-black filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700 filter grayscale group-hover:grayscale-0" />
                </>
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="absolute left-0 right-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)] z-10 pointer-events-none">
              {item.category && (
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-3">
                  {categories.find((c) => c.value === item.category)?.label || item.category}
                </div>
              )}
              <h3 className="font-heading font-extrabold tracking-tighter text-2xl text-white mb-2 group-hover:text-brand-accent transition-colors duration-500">
                {item.title}
              </h3>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_80px_rgba(56,199,192,0.06)]" />
          </div>
        ))}
      </div>
    </>
  );
}
