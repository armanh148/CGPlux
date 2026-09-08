"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface BlogPost {
  _id: string;
  title: string;
  slug?: { current: string };
  excerpt?: string;
  image?: unknown;
  tags?: string[];
  category?: string;
  publishedAt?: string;
  readTime?: string;
}

interface BlogListProps {
  posts?: BlogPost[];
  title?: string;
  subtitle?: string;
  showLearnMore?: boolean;
  showAll?: boolean;
}

const fallbackPosts: BlogPost[] = [
  {
    _id: "1",
    title: "The Intersection of Design and Technology",
    slug: { current: "the-intersection-of-design-and-technology" },
    excerpt:
      "The convergence of design and technology has revolutionized the way we create, communicate, and interact with the world around us.",
    category: "UI Design",
    tags: ["UI Design", "Graphic design", "Design"],
    publishedAt: "2024-03-20",
    readTime: "9 min read",
    image: "/images/blog/blog-1.jpg",
  },
  {
    _id: "2",
    title: "10 Inspiring Designers Who Changed the Game",
    slug: { current: "10-inspiring-designers-who-changed-the-game" },
    excerpt:
      "In the world of design, certain individuals stand out for their revolutionary ideas, groundbreaking creations, and profound influence on the industry.",
    category: "Design",
    tags: ["UI Design", "Graphic design", "Design"],
    publishedAt: "2024-03-20",
    readTime: "9 min read",
    image: "/images/blog/blog-2.jpg",
  },
  {
    _id: "3",
    title: "Nurturing Creativity in Teams: Strategies for Unleashing Potential",
    slug: { current: "nurturing-creativity-in-teams" },
    excerpt:
      "Creativity lies at the heart of design, problem-solving, and artistic expression. Nurturing creativity is not always easy but essential for breakthroughs.",
    category: "Graphic design",
    tags: ["UI Design", "Graphic design", "Design"],
    publishedAt: "2024-03-20",
    readTime: "9 min read",
    image: "/images/blog/blog-3.jpg",
  },
  {
    _id: "4",
    title: "Asia's First All-White RTX 5090 Workstation Build",
    slug: { current: "asias-first-all-white-rtx-5090-workstation" },
    excerpt:
      "Building the ultimate CG workstation for cinematic production, real-time 3D rendering, and high-performance creative pipelines.",
    category: "Hardware",
    tags: ["3D CGI", "Hardware", "Pipeline"],
    publishedAt: "2025-05-28",
    readTime: "12 min read",
    image: "/Creative Director.avif",
  },
  {
    _id: "5",
    title: "Inside Our Cinematic CGI & VFX Production Pipeline",
    slug: { current: "inside-our-cinematic-cgi-pipeline" },
    excerpt:
      "A deep dive into the shader graphs, rendering engines, and real-time VFX tools powering modern advertising visuals.",
    category: "VFX",
    tags: ["VFX", "Production", "Design"],
    publishedAt: "2025-04-15",
    readTime: "7 min read",
    image: "/Finance Manager.avif",
  },
];

function formatDate(dateStr?: string) {
  if (!dateStr) return "March 20, 2024";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function getTagStyle(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes("ui") || t.includes("hardware")) {
    return "bg-blue-950/70 text-blue-400 border-blue-800/40";
  }
  if (t.includes("graphic") || t.includes("vfx") || t.includes("production")) {
    return "bg-rose-950/70 text-rose-400 border-rose-800/40";
  }
  return "bg-indigo-950/70 text-indigo-400 border-indigo-800/40";
}

export default function BlogList({
  posts,
  title,
  subtitle,
  showLearnMore = true,
  showAll = false,
}: BlogListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const allItems = posts && posts.length > 0 ? posts : fallbackPosts;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  const currentPosts = showAll
    ? allItems
    : allItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll(".blog-card-item");
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, [currentPage]);

  return (
    <section className="w-full py-16 sm:py-24 bg-[#08080C] text-white relative px-6 lg:px-12 xl:px-16 overflow-hidden border-t border-b border-white/10">
      {/* Top Header matching reference image */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div className="flex flex-col items-start gap-3 max-w-2xl">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#181924] border border-white/10 font-mono text-xs text-zinc-300 select-none">
            View all blogs
          </div>

          {/* Main Section Headline */}
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            {title || "Blog and Article"}
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
            {subtitle ||
              "Explore our latest updates on design thinking, digital innovation, tax-saving strategies, and technical insights."}
          </p>
        </div>

        {/* Right Side Learn More Link */}
        {showLearnMore && (
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors group cursor-pointer self-start md:self-end mb-1"
          >
            <span>Learn more</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              ↗
            </span>
          </Link>
        )}
      </div>

      {/* 3-Column Card Grid matching reference image */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12"
      >
        {currentPosts.map((post) => {
          const tags = post.tags || [post.category || "Design", "UI Design", "Graphic design"];
          return (
            <Link
              key={post._id}
              href={post.slug ? `/blog/${post.slug.current}` : "#"}
              className="blog-card-item group relative bg-[#12131C] border border-white/10 hover:border-white/25 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-xl no-underline"
            >
              <div>
                {/* Cover Image */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/5">
                  <img
                    src={
                      typeof post.image === "string"
                        ? post.image
                        : "/images/blog/blog-1.jpg"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Category Tags Row */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-medium px-3 py-0.5 rounded-full border ${getTagStyle(
                        tag
                      )}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date & Read Time */}
                <div className="font-mono text-xs text-zinc-500 mb-3">
                  {formatDate(post.publishedAt)} — {post.readTime || "9 min read"}
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-snug tracking-tight mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Slider Navigation Controls matching reference image */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        {/* Left Side Dot Indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentPage(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                currentPage === idx
                  ? "w-8 h-2 rounded-full bg-white"
                  : "w-2 h-2 rounded-full bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right Side Prev / Next Arrow Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="w-10 h-10 rounded-full border border-white/15 bg-[#12131C] text-white flex items-center justify-center hover:bg-white hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
            aria-label="Previous Page"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="w-10 h-10 rounded-full border border-white/15 bg-[#12131C] text-white flex items-center justify-center hover:bg-white hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
            aria-label="Next Page"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
