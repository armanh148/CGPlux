"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/data";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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
  projects?: Project[];
}

interface CardItemData {
  id: string;
  title: string;
  client: string;
  tagline: string;
  category: string;
  bgColor: string;
  textColor: string;
  slug: string;
  type: "laptop-angled" | "laptop-hand" | "laptop-stone" | "phone" | "laptop-saas";
  screenTitle?: string;
  screenSubtitle?: string;
}

const CATEGORIES = [
  "ALL PROJECTS",
  "WEB DEVELOPMENT",
  "CREATIVE & DESIGN",
  "REAL ESTATE",
  "E-COMMERCE",
  "ENTERPRISE & CRM",
];

const PORTFOLIO_ITEMS: CardItemData[] = [
  {
    id: "p1",
    title: "Vince Skincare E-Commerce Platform",
    client: "Vince Laboratories",
    tagline: "Headless e-commerce & high-conversion beauty store",
    category: "E-Commerce",
    bgColor: "bg-[#3b82f6]", // Vivid Blue
    textColor: "text-white",
    slug: "vince-skincare",
    type: "laptop-angled",
    screenTitle: "VINCE",
    screenSubtitle: "MILKY BRIGHT SKIN",
  },
  {
    id: "p2",
    title: "Terranox Adventure & Booking Engine",
    client: "Terranox Expeditions",
    tagline: "Global travel booking & dynamic activity planner",
    category: "Web Development",
    bgColor: "bg-[#fecaa7]", // Peach / Warm Apricot
    textColor: "text-zinc-900",
    slug: "terranox-travel",
    type: "laptop-hand",
    screenTitle: "TERRANOX",
    screenSubtitle: "EXPLORE MORE WORRY LESS!",
  },
  {
    id: "p3",
    title: "NutraPure Collagen Direct-to-Consumer Portal",
    client: "NutraPure Global",
    tagline: "Clinical supplement showcase & subscription portal",
    category: "E-Commerce",
    bgColor: "bg-[#d5d8df]", // Cool Stone Grey
    textColor: "text-zinc-900",
    slug: "nutrapure-collagen",
    type: "laptop-stone",
    screenTitle: "NutraPure",
    screenSubtitle: "6000 mg Collagen Powder",
  },
  {
    id: "p4",
    title: "GraphicDesign.Boom Creative Portfolio",
    client: "Boom Visual Studio",
    tagline: "Mobile-first agency portfolio & interactive showcase",
    category: "Creative & Design",
    bgColor: "bg-[#e2e4e8]", // Light Studio Grey
    textColor: "text-zinc-900",
    slug: "boom-design-studio",
    type: "phone",
    screenTitle: "GraphicDesign.Boom",
    screenSubtitle: "Visual Identity & Social Design",
  },
  {
    id: "p5",
    title: "OmniFlux Enterprise CRM & Automation",
    client: "OmniFlux Global",
    tagline: "Enterprise workflow automation & analytics dashboard",
    category: "Enterprise & CRM",
    bgColor: "bg-[#ebd7db]", // Soft Rose Pink
    textColor: "text-zinc-900",
    slug: "omniflux-crm",
    type: "laptop-saas",
    screenTitle: "OmniFlux CRM",
    screenSubtitle: "Enterprise Operations Engine",
  },
  {
    id: "p6",
    title: "Boston Prime MLS Real Estate Engine",
    client: "Boston Prime Properties",
    tagline: "Interactive 3D virtual tour & property MLS portal",
    category: "Real Estate",
    bgColor: "bg-[#cce3de]", // Soft Mint Green
    textColor: "text-zinc-900",
    slug: "boston-prime-real-estate",
    type: "laptop-angled",
    screenTitle: "BOSTON PRIME",
    screenSubtitle: "3D REAL ESTATE PLATFORM",
  },
];

export default function ProjectCards({ projects }: ProjectCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Selected category filter
  const [selectedCategory, setSelectedCategory] = useState("ALL PROJECTS");

  // Drag & Scroll States
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Custom Cursor Badge States
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Reset scroll position on category change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedCategory]);

  // Update progress bar on scroll
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const currentProgress = (el.scrollLeft / maxScroll) * 100;
    setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Update drag badge position relative to container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".portfolio-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".portfolio-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.refresh());
    };
  }, []);

  // Merge cms projects if available
  const itemsToRender =
    projects && projects.length >= 3
      ? projects.slice(0, 6).map((p, idx) => {
          const fallback = PORTFOLIO_ITEMS[idx % PORTFOLIO_ITEMS.length];
          return {
            id: p._id || fallback.id,
            title: p.title || fallback.title,
            client: p.categories?.[0] || fallback.client,
            tagline: p.excerpt || fallback.tagline,
            category: p.categories?.[0] || fallback.category,
            bgColor: fallback.bgColor,
            textColor: fallback.textColor,
            slug: p.slug?.current || fallback.slug,
            type: fallback.type,
            screenTitle: p.title?.split(" ")[0] || fallback.screenTitle,
            screenSubtitle: p.excerpt?.slice(0, 25) || fallback.screenSubtitle,
            image: p.image,
          };
        })
      : PORTFOLIO_ITEMS;

  const filteredItems = itemsToRender.filter((item) => {
    if (selectedCategory === "ALL PROJECTS") return true;
    return (
      item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(item.category.toLowerCase())
    );
  });

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-20 md:py-28 lg:py-36 bg-[#0c0f10] text-white relative border-b border-white/[0.08] overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Header Section */}
        <div className="portfolio-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16 pb-6 border-b border-white/[0.08]">
          {/* Left Column — Label + Title */}
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-2">
              <span className="w-5 h-[1.5px] bg-zinc-400" />
              FEATURED PORTFOLIO
            </div>
            <h2 className="font-heading font-black tracking-tight text-3xl sm:text-4xl md:text-5xl text-white uppercase leading-none">
              SELECTED CASES
            </h2>
          </div>

          {/* Right Column — Archive Link + Category Tabs */}
          <div className="flex flex-col items-start md:items-end gap-3.5 min-w-0">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              <span>VIEW COMPLETE ARCHIVE (500+)</span>
              <span className="text-white">&rarr;</span>
            </Link>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto max-w-full pb-1 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer flex-shrink-0 whitespace-nowrap ${
                      isActive
                        ? "bg-white text-black font-bold shadow-md"
                        : "bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Draggable Cards Carousel Container */}
        <div className="relative">
          {/* Scrollable Flex Track */}
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className={`flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide py-4 px-1 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className="portfolio-card flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] lg:w-[410px] h-[460px] sm:h-[520px] md:h-[570px] rounded-none border border-white/10 overflow-hidden relative shadow-2xl flex flex-col justify-between group transition-transform duration-500 hover:-translate-y-1.5"
              >
                {/* Card Outer Container with custom background color */}
                <div
                  className={`w-full h-full ${item.bgColor} relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out`}
                >
                  {/* Subtle top subtle shine gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Bar / Category Tag */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-sm bg-black/20 backdrop-blur-md text-white/90 font-medium border border-white/10">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-white/70">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Center Device Visual / Mockup */}
                  <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out">
                    {item.image ? (
                      <div className="relative w-full h-full rounded-none overflow-hidden shadow-2xl border border-white/20">
                        <Image
                          src={urlFor(item.image).width(800).height(600).url()}
                          alt={item.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      /* Render High-End 3D Device Mockup according to type */
                      <RenderDeviceMockup type={item.type} item={item} />
                    )}
                  </div>

                  {/* Bottom Information overlay */}
                  <div className="relative z-10 pt-2 flex items-end justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-heading font-bold text-lg sm:text-xl line-clamp-1 ${item.textColor}`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs font-light opacity-80 line-clamp-1 mt-0.5 ${item.textColor}`}>
                        {item.tagline}
                      </p>
                    </div>

                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="w-10 h-10 rounded-sm bg-black/80 hover:bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-lg border border-white/10"
                      aria-label={`View ${item.title}`}
                    >
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H8M17 7V16"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Right padding box so last item has breathing room */}
            <div className="flex-shrink-0 w-8" aria-hidden="true" />
          </div>
        </div>

        {/* Bottom Horizontal Progress Indicator */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center">
          <div className="w-full max-w-xl h-[3px] bg-zinc-800/80 rounded-full relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(45,212,191,0.6)]"
              style={{ width: `${Math.max(15, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

{/* Helper component to render realistic 3D device mockups matching the screenshot aesthetic */}
function RenderDeviceMockup({
  type,
  item,
}: {
  type: string;
  item: CardItemData;
}) {
  if (type === "laptop-angled") {
    // Card 1: Angled tilted Macbook showing Skincare website
    return (
      <div className="relative w-full h-[260px] sm:h-[290px] flex items-center justify-center transform -rotate-12 group-hover:-rotate-6 transition-transform duration-700 ease-out scale-95 sm:scale-100">
        {/* Laptop Body */}
        <div className="w-[260px] sm:w-[300px] h-[170px] sm:h-[195px] bg-[#1a1c23] rounded-t-xl p-2 shadow-2xl border border-white/20 relative">
          {/* Laptop Screen Content */}
          <div className="w-full h-full bg-sky-50 rounded-lg overflow-hidden flex flex-col relative text-zinc-800">
            {/* Header */}
            <div className="bg-sky-600 text-white px-3 py-1.5 flex items-center justify-between text-[10px] font-bold">
              <span>{item.screenTitle}</span>
              <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded">SHOP NOW</span>
            </div>
            {/* Banner */}
            <div className="p-3 bg-gradient-to-r from-sky-100 to-blue-50 flex-1 flex flex-col justify-center">
              <span className="text-[8px] font-mono uppercase tracking-wider text-sky-700 font-semibold">
                New Arrival
              </span>
              <h4 className="text-xs font-black text-sky-950 uppercase tracking-tight mt-0.5 leading-none">
                {item.screenSubtitle}
              </h4>
              <div className="mt-2 w-14 h-4 bg-sky-600 text-white text-[8px] flex items-center justify-center font-bold rounded">
                EXPLORE
              </div>
            </div>
            {/* Skincare Bottle visual placeholder graphic */}
            <div className="absolute right-2 bottom-1 w-16 h-24 bg-white/90 rounded-lg shadow-md border border-sky-100 flex flex-col items-center justify-center p-1">
              <div className="w-4 h-5 bg-sky-500 rounded-t-md" />
              <div className="w-10 h-14 bg-sky-100 rounded mt-0.5 flex flex-col items-center justify-center">
                <span className="text-[6px] font-bold text-sky-800">VINCE</span>
              </div>
            </div>
          </div>
        </div>
        {/* Laptop Base Stand */}
        <div className="absolute -bottom-2 w-[290px] sm:w-[330px] h-[12px] bg-[#2a2d37] rounded-b-xl border-t border-white/10 shadow-2xl flex justify-center">
          <div className="w-12 h-1 bg-zinc-600 rounded-b" />
        </div>
      </div>
    );
  }

  if (type === "laptop-hand") {
    // Card 2: Hand holding laptop showing Travel & Adventure platform
    return (
      <div className="relative w-full h-[260px] sm:h-[290px] flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
        {/* Laptop Screen */}
        <div className="w-[270px] sm:w-[310px] h-[175px] sm:h-[200px] bg-[#0f172a] rounded-t-xl p-2 shadow-2xl border border-white/30 relative">
          <div className="w-full h-full bg-amber-50 rounded-lg overflow-hidden flex flex-col text-zinc-900">
            {/* Navigation */}
            <div className="bg-amber-900/90 text-white px-3 py-1 flex items-center justify-between text-[9px] font-bold">
              <span>TERRANOX</span>
              <div className="flex gap-1 text-[7px] text-amber-200">
                <span>PLANS</span>
                <span>DESTINATIONS</span>
              </div>
            </div>
            {/* Hero Image Area */}
            <div className="p-3 bg-gradient-to-br from-amber-500 via-orange-400 to-amber-600 text-white flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-2 -bottom-2 w-24 h-24 bg-amber-300/30 rounded-full blur-xl" />
              <h4 className="text-xs font-black uppercase tracking-tight max-w-[140px] leading-tight">
                {item.screenSubtitle}
              </h4>
              <div className="mt-2 bg-white text-zinc-900 text-[8px] font-bold px-2 py-0.5 rounded w-max shadow">
                BOOK TRIP &rarr;
              </div>
            </div>
          </div>
        </div>
        {/* Laptop Base */}
        <div className="absolute bottom-6 w-[300px] sm:w-[340px] h-[10px] bg-[#334155] rounded-b-xl border-t border-white/20 shadow-xl flex justify-center">
          <div className="w-14 h-1 bg-slate-500 rounded-b" />
        </div>
        {/* 3D Hand Base Graphic */}
        <div className="absolute bottom-0 w-28 h-12 bg-amber-200/80 rounded-t-full blur-[0.5px] border-t-2 border-amber-300 shadow-inner flex items-center justify-center">
          <span className="text-[9px] font-bold text-amber-900/40 uppercase">3D HOLD</span>
        </div>
      </div>
    );
  }

  if (type === "laptop-stone") {
    // Card 3: Laptop sitting on a concrete stone block mockup
    return (
      <div className="relative w-full h-[260px] sm:h-[290px] flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform duration-700 ease-out">
        {/* Concrete Block Base */}
        <div className="absolute bottom-1 w-[220px] h-[55px] bg-[#a8abae] rounded-lg shadow-2xl border-t border-white/40 transform -skew-x-12 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-500 opacity-90 rounded-lg" />
        </div>
        {/* Laptop Screen */}
        <div className="relative z-10 w-[260px] sm:w-[300px] h-[170px] sm:h-[190px] bg-[#18181b] rounded-t-xl p-2 shadow-2xl border border-white/30">
          <div className="w-full h-full bg-purple-50 rounded-lg overflow-hidden flex flex-col text-zinc-900">
            <div className="bg-purple-900 text-white px-3 py-1 flex items-center justify-between text-[9px] font-bold">
              <span>{item.screenTitle}</span>
              <span className="text-[7px] text-purple-200">VERIFIED</span>
            </div>
            <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-1 flex flex-col justify-center">
              <h4 className="text-xs font-black uppercase tracking-tight max-w-[130px] leading-tight">
                {item.screenSubtitle}
              </h4>
              <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded w-max mt-1 font-mono">
                20+ Certificates
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "phone") {
    // Card 4: Smartphone mockup displaying GraphicDesign.Boom profile & grid
    return (
      <div className="relative w-[180px] sm:w-[200px] h-[260px] sm:h-[295px] bg-[#111] rounded-[32px] p-2 shadow-2xl border-4 border-zinc-700/80 group-hover:scale-105 transition-transform duration-700 ease-out">
        {/* Camera notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[24px] overflow-hidden flex flex-col text-zinc-900 pt-5 px-2.5 pb-2 text-[8px]">
          {/* Account Header */}
          <div className="flex items-center justify-between border-b pb-1.5 font-bold">
            <span className="truncate max-w-[110px]">{item.screenTitle}</span>
            <span className="text-red-500 text-[10px]">●</span>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-center my-2 font-mono">
            <div>
              <div className="font-bold text-[9px]">252</div>
              <div className="text-[6px] text-zinc-500">Posts</div>
            </div>
            <div>
              <div className="font-bold text-[9px]">31.3K</div>
              <div className="text-[6px] text-zinc-500">Followers</div>
            </div>
            <div>
              <div className="font-bold text-[9px]">489</div>
              <div className="text-[6px] text-zinc-500">Following</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-1 mb-2">
            <div className="bg-sky-500 text-white font-bold text-[7px] text-center py-1 rounded">
              Follow
            </div>
            <div className="bg-zinc-100 text-zinc-800 font-bold text-[7px] text-center py-1 rounded">
              Message
            </div>
          </div>

          {/* Grid posts */}
          <div className="grid grid-cols-3 gap-1 flex-1">
            <div className="bg-amber-400 rounded flex items-center justify-center text-[7px] font-black text-amber-950">
              LOGO
            </div>
            <div className="bg-emerald-500 rounded flex items-center justify-center text-[7px] font-black text-white">
              3D
            </div>
            <div className="bg-sky-400 rounded flex items-center justify-center text-[7px] font-black text-white">
              UI
            </div>
            <div className="bg-zinc-800 rounded flex items-center justify-center text-[7px] font-bold text-white">
              RUSTY
            </div>
            <div className="bg-rose-400 rounded flex items-center justify-center text-[7px] font-bold text-white">
              APP
            </div>
            <div className="bg-indigo-500 rounded flex items-center justify-center text-[7px] font-bold text-white">
              BRAND
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Card 5: Laptop SaaS CRM Dashboard
  return (
    <div className="relative w-full h-[260px] sm:h-[290px] flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
      <div className="w-[270px] sm:w-[310px] h-[175px] sm:h-[200px] bg-[#1e1e24] rounded-t-xl p-2 shadow-2xl border border-white/20">
        <div className="w-full h-full bg-slate-900 rounded-lg p-2.5 text-white flex flex-col justify-between text-[9px]">
          <div className="flex justify-between items-center border-b border-slate-800 pb-1 font-bold">
            <span className="text-rose-300">{item.screenTitle}</span>
            <span className="text-[7px] bg-emerald-500/20 text-emerald-300 px-1 rounded">
              LIVE 99.9%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 my-2">
            <div className="bg-slate-800/80 p-1.5 rounded">
              <div className="text-[7px] text-slate-400">Users</div>
              <div className="font-bold text-xs text-rose-300">142.8K</div>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded">
              <div className="text-[7px] text-slate-400">Revenue</div>
              <div className="font-bold text-xs text-emerald-400">$84.2K</div>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded">
              <div className="text-[7px] text-slate-400">Growth</div>
              <div className="font-bold text-xs text-cyan-300">+34%</div>
            </div>
          </div>
          <div className="h-10 bg-slate-800 rounded p-1 flex items-end justify-between gap-1">
            <div className="w-full bg-rose-400 h-4 rounded-t" />
            <div className="w-full bg-rose-500 h-6 rounded-t" />
            <div className="w-full bg-rose-400 h-3 rounded-t" />
            <div className="w-full bg-rose-300 h-7 rounded-t" />
            <div className="w-full bg-rose-500 h-5 rounded-t" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 w-[300px] sm:w-[340px] h-[10px] bg-slate-700 rounded-b-xl border-t border-white/10 shadow-xl flex justify-center">
        <div className="w-14 h-1 bg-slate-500 rounded-b" />
      </div>
    </div>
  );
}

