"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/data";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  image?: any;
  categories?: string[];
  excerpt?: string;
}

interface ProjectCardsProps {
  projects: Project[];
}

const CATEGORIES = [
  "All Projects",
  "Web Development",
  "Creative & Design",
  "Real Estate",
  "E-Commerce",
  "Enterprise & CRM",
];

const fallbackProjects: Project[] = [
  {
    _id: "p1",
    title: "Wishflowers Corporate Platform",
    slug: { current: "wishflowers" },
    categories: ["E-Commerce", "Web Development"],
    excerpt: "Modern headless e-commerce experience with dynamic catalog filtering, real-time inventory synchronization, and custom checkout.",
  },
  {
    _id: "p2",
    title: "Socan Music Licensing System",
    slug: { current: "socan" },
    categories: ["Enterprise & CRM", "Web Development"],
    excerpt: "Enterprise web portal for automated digital rights management, royalty calculations, and high-security client verification.",
  },
  {
    _id: "p3",
    title: "Validsoft Security Infrastructure",
    slug: { current: "validsoft" },
    categories: ["Creative & Design", "Web Development"],
    excerpt: "High-conversion marketing presence and architectural redesign highlighting biometric authentication and enterprise fraud prevention.",
  },
  {
    _id: "p4",
    title: "Boston Prime Real Estate Engine",
    slug: { current: "boston-prime" },
    categories: ["Real Estate", "Web Development"],
    excerpt: "Interactive MLS property search engine featuring automated map queries, virtual 3D tours, and lead routing CRM.",
  },
  {
    _id: "p5",
    title: "Steelfire Industrial Manufacturing",
    slug: { current: "steelfire" },
    categories: ["Enterprise & CRM", "Creative & Design"],
    excerpt: "B2B catalog architecture and quote calculation system engineered for precision manufacturing and procurement teams.",
  },
  {
    _id: "p6",
    title: "Unilock Construction Hub",
    slug: { current: "unilock" },
    categories: ["Real Estate", "Creative & Design"],
    excerpt: "Commercial paving and construction visualization platform with high-resolution material simulators and contractor directories.",
  },
];

export default function ProjectCards({ projects }: ProjectCardsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  const filteredProjects = displayProjects.filter((p) => {
    if (selectedCategory === "All Projects") return true;
    return p.categories?.some(
      (cat) => cat.toLowerCase().includes(selectedCategory.toLowerCase()) ||
               selectedCategory.toLowerCase().includes(cat.toLowerCase())
    );
  });

  // Track active slide via scroll position
  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.scrollWidth / filteredProjects.length;
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveSlide(Math.min(idx, filteredProjects.length - 1));
  }, [filteredProjects.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleCarouselScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleCarouselScroll);
  }, [handleCarouselScroll]);

  // Reset carousel position when filter changes
  useEffect(() => {
    setActiveSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [selectedCategory]);

  // Scroll to a specific slide on dot click
  const scrollToSlide = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / filteredProjects.length;
    el.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
  };

  const ProjectCard = ({ project, idx }: { project: Project; idx: number }) => {
    const projectSlug = project.slug?.current || `project-${idx}`;
    const projectCategories = project.categories || ["Web Development", "Design"];

    return (
      <div className="group redstone-card rounded-sm overflow-hidden flex flex-col justify-between">
        {/* Visual Area */}
        <div className="relative aspect-[16/10] w-full bg-zinc-900 overflow-hidden border-b border-white/[0.06]">
          {project.image ? (
            <Image
              src={urlFor(project.image).width(800).height(500).url()}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">
                Case Study // {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="text-xl font-heading font-bold text-zinc-300 text-center uppercase tracking-tight">
                {project.title}
              </div>
            </div>
          )}
          {/* Corner Index Stamp */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono text-zinc-300 tracking-widest border border-white/10 uppercase">
            {String(idx + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {projectCategories.slice(0, 2).map((cat) => (
                <span key={cat} className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  #{cat}
                </span>
              ))}
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-zinc-200 transition-colors tracking-tight mb-3">
              <Link href={`/portfolio/${projectSlug}`}>{project.title}</Link>
            </h3>
            {project.excerpt && (
              <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 mb-6">
                {project.excerpt}
              </p>
            )}
          </div>
          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              Full Case Review
            </span>
            <Link
              href={`/portfolio/${projectSlug}`}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors"
            >
              <span>Explore</span>
              <span className="text-white font-bold transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 lg:py-36 bg-[#000000] relative border-b border-white/[0.08]">
      <div className="w-full">
        {/* Header — padded */}
        <div className="px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 md:mb-16 pb-4 border-b border-white/[0.08]">
            {/* Left — label + title */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-2">
                <span className="w-6 h-[1.5px] bg-white" />
                Featured Portfolio
              </div>
              <h2 className="font-heading font-black tracking-tight text-3xl sm:text-4xl md:text-5xl text-white uppercase leading-none">
                Selected Cases
              </h2>
            </div>

            {/* Right — tabs + archive link */}
            <div className="flex flex-col items-end gap-3 min-w-0">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex-shrink-0"
              >
                <span>View Complete Archive (500+)</span>
                <span className="text-white">&rarr;</span>
              </Link>
              {/* Category Tabs — scrollable */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer flex-shrink-0 ${
                        isActive
                          ? "bg-white text-black font-bold shadow-sm"
                          : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── MOBILE: Scroll-Snap Carousel ─── */}
        <div className="block md:hidden">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 px-6 pb-2"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project._id || idx}
                className="flex-shrink-0 w-[82vw] max-w-[340px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <ProjectCard project={project} idx={idx} />
              </div>
            ))}
            {/* Trailing spacer so last card has breathing room */}
            <div className="flex-shrink-0 w-4" aria-hidden="true" />
          </div>

          {/* Dot indicators + counter */}
          <div className="flex items-center justify-between px-6 mt-5">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {filteredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`rounded-sm transition-all duration-300 cursor-pointer ${
                    idx === activeSlide
                      ? "w-6 h-[3px] bg-white"
                      : "w-[6px] h-[3px] bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
            {/* Slide counter */}
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              {String(activeSlide + 1).padStart(2, "0")} /{" "}
              {String(filteredProjects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ─── DESKTOP: Original 3-col Grid ─── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-12">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project._id || idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
