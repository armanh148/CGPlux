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
  testimonials: Testimonial[];
}

const fallbackReviews: Testimonial[] = [
  {
    _id: "t1",
    quote:
      "The team delivered an exceptional website representing our enterprise services. The site was user-friendly, visually striking, and technically solid. Their cooperation and precision in meeting complex requirements were remarkable.",
    author: "Alexander Wright",
    role: "VP of Product, Validsoft",
    rating: 5,
  },
  {
    _id: "t2",
    quote:
      "After the redesign launch, we noticed an immediate 42% increase in demo requests and qualified leads. Visitors spend significantly more time on pages, and bounce rates dropped to historic lows.",
    author: "Elena Rostova",
    role: "Managing Director, Base1 UK",
    rating: 5,
  },
  {
    _id: "t3",
    quote:
      "They engineered a custom CRM system that completely eliminated our operational bottlenecks. Flawless communication, clean architecture, and responsive 24/7 technical support post-launch.",
    author: "Marcus Chen",
    role: "Head of Operations, Steelfire",
    rating: 5,
  },
];

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const items: Testimonial[] = testimonials && testimonials.length > 0 ? testimonials : fallbackReviews;
  const [activeIdx, setActiveIdx] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  const animateQuote = useCallback(
    (newIdx: number) => {
      if (!quoteRef.current || newIdx === activeIdx) return;
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveIdx(newIdx);
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          );
        },
      });
    },
    [activeIdx]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeIdx + 1) % items.length;
      animateQuote(next);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeIdx, animateQuote, items.length]);

  return (
    <section id="reviews" className="py-20 md:py-28 lg:py-36 bg-[#000000] relative border-b border-white/[0.08]">
      <div className="w-full px-6 lg:px-12">
        {/* Header (Join The Best / Reviews) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-3">
              <span className="w-6 h-[1.5px] bg-white" />
              Verified Client Feedback
            </div>
            <h2 className="font-heading font-black tracking-tight text-3xl sm:text-4xl md:text-6xl text-white uppercase">
              Join the Best
            </h2>
          </div>

          {/* Clutch Trust Badge */}
          <div className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-800 px-5 py-3 rounded-sm">
            <div className="text-xl font-bold font-mono text-white">
              5.0 ★
            </div>
            <div className="text-left border-l border-zinc-700 pl-4">
              <div className="text-xs font-heading font-bold text-white uppercase tracking-wider">
                Top B2B Web Agency
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                Verified Clutch Reviews
              </div>
            </div>
          </div>
        </div>

        {/* Featured Quote Showcase */}
        <div className="pt-12">
          <div className="redstone-card p-8 sm:p-12 md:p-16 rounded-sm relative overflow-hidden">
            <div className="text-white/5 font-serif text-[120px] sm:text-[180px] absolute -top-10 right-8 select-none pointer-events-none leading-none">
              &ldquo;
            </div>

            <div ref={quoteRef} className="relative z-10 max-w-4xl">
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-8">
                {[...Array(items[activeIdx]?.rating || 5)].map((_, i) => (
                  <span key={i} className="text-white text-lg">
                    ★
                  </span>
                ))}
              </div>

              <blockquote className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal leading-[1.35] text-white mb-10">
                &ldquo;{items[activeIdx]?.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                {items[activeIdx]?.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={urlFor(items[activeIdx].avatar).width(96).height(96).url()}
                      alt={items[activeIdx].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-sm font-mono text-white">
                    {items[activeIdx]?.author?.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-sm sm:text-base font-heading font-bold text-white uppercase tracking-wider">
                    {items[activeIdx]?.author}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-0.5">
                    {items[activeIdx]?.role || "Verified Client"}
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Switcher Controls */}
            <div className="flex items-center gap-2 mt-10 pt-6 border-t border-white/[0.06]">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => animateQuote(idx)}
                  className={`h-2 transition-all duration-300 rounded-sm cursor-pointer ${
                    idx === activeIdx ? "w-8 bg-white" : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
