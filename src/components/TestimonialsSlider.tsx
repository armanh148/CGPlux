"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/data";
import { gsap } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: any;
  rating?: number;
}

interface TestimonialsSliderProps {
  testimonials?: Testimonial[];
}

const fallbackReviews: Testimonial[] = [
  {
    _id: "t1",
    author: "John Doe",
    role: "Head of Customer Experience at FinTech Global",
    quote:
      "Integrating leezyAI has been a game-changer for our customer support workflow. We've seen a 40% decrease in response times and a significant uptick in customer satisfaction scores. The AI's ability to understand and process complex queries has freed our team to handle more nuanced issues.",
    rating: 5,
    avatar: "/Client-1.avif",
  },
  {
    _id: "t2",
    author: "Elijah Ramirez",
    role: "Director of Operations at EcoHome Solutions",
    quote:
      "leezyAI's chatbot isn't just another tool; it's like having a highly skilled assistant that's learning and improving every day. Our customers love the instant and accurate information it provides, and we've been thrilled with the deep insights into our customer interactions.",
    rating: 5,
    avatar: "/Client-2.avif",
  },
  {
    _id: "t3",
    author: "Mia Song",
    role: "CTO at HealthBridgeTech",
    quote:
      "We were amazed at how quickly leezyAI learned our unique industry jargon and data. The customer interaction features have added a layer of interactivity that keeps users engaged and satisfied. It's not just the technology, but the people offering support every step of the way.",
    rating: 5,
    avatar: "/Girl-2.avif",
  },
  {
    _id: "t4",
    author: "Alexander Wright",
    role: "VP of Product, Validsoft",
    quote:
      "The team delivered an exceptional enterprise platform. The site was user-friendly, visually striking, and technically solid. Their cooperation and precision in meeting complex requirements were remarkable.",
    rating: 5,
    avatar: "/CEO Founder.avif",
  },
  {
    _id: "t5",
    author: "Elena Rostova",
    role: "Managing Director, Base1 UK",
    quote:
      "After the redesign launch, we noticed an immediate 42% increase in demo requests and qualified leads. Visitors spend significantly more time on pages, and bounce rates dropped to historic lows.",
    rating: 5,
    avatar: "/Creative Director.avif",
  },
];

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const items: Testimonial[] =
    testimonials && testimonials.length > 0 ? testimonials : fallbackReviews;

  const [activePage, setActivePage] = useState(0);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(items.length / cardsPerPage);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const currentCards = items.slice(
    activePage * cardsPerPage,
    (activePage + 1) * cardsPerPage
  );

  const nextPage = useCallback(() => {
    setActivePage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setActivePage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll(".ts-feedback-card");
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
  }, [activePage]);

  // Auto-slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextPage();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextPage]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="w-full py-20 sm:py-28 lg:py-36 bg-[#000000] text-white relative overflow-hidden border-b border-white/[0.08]"
    >
      {/* Dark Ambient Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="w-full px-6 lg:px-12 xl:px-16">
        {/* Top Header matching dark site theme */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/30" />
              TESTIMONIALS
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              What <span className="text-white/50 italic font-light">Our Clients</span> Say
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg font-light mt-1">
              Hear Directly Our Satisfied Partners
            </p>
          </div>

          {/* Right Side Slider Arrow Controls (Dark Theme) */}
          <div className="flex items-center gap-3 self-start sm:self-end">
            <button
              type="button"
              onClick={prevPage}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/15 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer text-lg font-bold"
              aria-label="Previous testimonials"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={nextPage}
              className="w-11 h-11 rounded-full bg-white text-black shadow-md flex items-center justify-center hover:bg-zinc-200 transition-all duration-300 cursor-pointer text-lg font-bold"
              aria-label="Next testimonials"
            >
              ›
            </button>
          </div>
        </div>

        {/* 3 Dark Feedback Cards Grid matching reference layout */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12"
        >
          {currentCards.map((item) => {
            const avatarSrc =
              typeof item.avatar === "string"
                ? item.avatar
                : item.avatar
                ? urlFor(item.avatar).width(120).height(120).url()
                : "/Client-1.avif";

            return (
              <div
                key={item._id}
                className="ts-feedback-card bg-[#0d0d12] rounded-2xl sm:rounded-3xl p-7 sm:p-8 border border-white/10 flex flex-col justify-between hover:border-white/25 transition-all duration-500 shadow-2xl group"
              >
                <div>
                  {/* Top Row: Quote Icon + Star Rating */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Soft Translucent Quote Mark */}
                    <span className="text-white/15 text-5xl font-serif leading-none select-none font-black">
                      “
                    </span>

                    {/* 5 Golden Yellow Star Rating */}
                    <div className="flex items-center gap-1 text-amber-400 text-base">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Paragraph Body */}
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light mb-8 line-clamp-6">
                    {item.quote}
                  </p>
                </div>

                {/* Bottom Author Profile Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                  {/* Avatar Photo */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/15 shadow-xs">
                    <Image
                      src={avatarSrc}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name & Title */}
                  <div className="flex flex-col">
                    <h4 className="font-heading font-bold text-white text-base leading-snug tracking-tight">
                      {item.author}
                    </h4>
                    <span className="text-zinc-400 text-xs font-mono font-normal leading-normal mt-0.5">
                      {item.role || "Satisfied Client"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Centered Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActivePage(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                activePage === idx
                  ? "w-4 h-2 rounded-full bg-white"
                  : "w-2 h-2 rounded-full bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
