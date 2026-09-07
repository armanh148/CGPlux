"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Step {
  num: string;
  title: string;
  description: string;
  deliverable: string;
}

const STEPS: Step[] = [
  { num: "01", title: "Receipt of Brief", description: "The project manager receives your preliminary brief, analyzes business objectives, identifies core technical constraints, and prepares discovery questions.", deliverable: "Initial Discovery Document" },
  { num: "02", title: "Scoping & Confirmation", description: "We conduct in-depth scoping sessions to clarify edge cases, security requirements, timeline expectations, and select the optimal technology stack.", deliverable: "Technical Scope & Commercial Proposal" },
  { num: "03", title: "Dedicated Project Manager", description: "A single point of contact is assigned to your project to run weekly sprint demos, coordinate async updates, and manage the team roadmap.", deliverable: "Slack/Teams Channel & Sprint Roadmap" },
  { num: "04", title: "Architecture & Wireframing", description: "System architects define database models, third-party API contracts, and user journey wireframes before writing a single line of client UI.", deliverable: "System Blueprint & Low-Fi Wireframes" },
  { num: "05", title: "UI/UX Interactive Design", description: "Designers craft clean, custom interface prototypes in Figma according to your brand identity, with pixel-perfect responsive component specs.", deliverable: "Interactive Figma Prototypes & Design Tokens" },
  { num: "06", title: "Full-Stack Development", description: "Engineers implement performant frontend and backend systems, adhering to strict coding standards, Git versioning, and CI/CD pipelines.", deliverable: "Weekly Staging Environment Deployments" },
  { num: "07", title: "QA & Performance Testing", description: "Dedicated QA engineers execute automated tests, penetration audits, cross-device responsiveness checks, and Core Web Vitals optimization.", deliverable: "Audit Report (95+ PageSpeed Guarantee)" },
  { num: "08", title: "Deployment & Ongoing Support", description: "We deploy the production release to your cloud infrastructure, hand over complete documentation, and provide 24/7 technical monitoring.", deliverable: "Production Launch & 24/7 SLA Guarantee" },
];

function StepCard({ step, idx, isActive, onClick }: { step: Step; idx: number; isActive: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-sm border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full ${
        isActive
          ? "bg-zinc-900/80 border-white shadow-lg shadow-white/5"
          : "bg-[#09090b] border-white/[0.06] hover:border-zinc-700"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-sm font-bold text-white tracking-wider">{step.num}</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Phase 0{idx + 1}</span>
        </div>
        <h3 className="font-heading font-bold text-xl text-white tracking-tight mb-3">{step.title}</h3>
        <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-5">{step.description}</p>
      </div>
      <div className="pt-4 border-t border-white/[0.06]">
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Deliverable:</div>
        <div className="text-xs font-mono text-zinc-300 font-medium">{step.deliverable}</div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / STEPS.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    const clamped = Math.min(Math.max(idx, 0), STEPS.length - 1);
    setActiveSlide(clamped);
    setActiveStep(clamped);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleCarouselScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleCarouselScroll);
  }, [handleCarouselScroll]);

  const scrollToSlide = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / STEPS.length;
    el.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
  };

  return (
    <section id="process" className="py-20 md:py-28 lg:py-36 bg-[#000000] relative border-b border-white/[0.08]">
      <div className="w-full">

        {/* Header */}
        <div className="px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 md:pb-12 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-3">
                <span className="w-6 h-[1.5px] bg-white" />
                Transparent Methodology
              </div>
              <h2 className="font-heading font-black tracking-tight text-3xl sm:text-4xl md:text-6xl text-white uppercase">
                Project Management
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
                Every project follows an established 8-stage engineering process to ensure total transparency, predictable delivery schedules, and top-tier code quality.
              </p>
            </div>
          </div>
        </div>

        {/* ── MOBILE: scroll-snap carousel ── */}
        <div className="block md:hidden mt-8">
          {/* Progress bar strip */}
          <div className="px-6 mb-5">
            <div className="h-[2px] bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${((activeSlide + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Carousel track */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 px-6"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", paddingBottom: "4px" }}
          >
            {STEPS.map((step, idx) => (
              <div
                key={step.num}
                className="flex-shrink-0 w-[80vw] max-w-[300px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <StepCard step={step} idx={idx} isActive={activeSlide === idx} onClick={() => scrollToSlide(idx)} />
              </div>
            ))}
            <div className="flex-shrink-0 w-6" aria-hidden="true" />
          </div>

          {/* Dots + counter */}
          <div className="flex items-center justify-between px-6 mt-5">
            <div className="flex items-center gap-1.5">
              {STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to step ${idx + 1}`}
                  className={`rounded-[1px] transition-all duration-300 cursor-pointer ${
                    idx === activeSlide
                      ? "w-7 h-[3px] bg-white"
                      : "w-[5px] h-[3px] bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              {String(activeSlide + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── DESKTOP: 4-col interactive grid ── */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-12 pt-12">
          {STEPS.map((step, idx) => (
            <StepCard
              key={step.num}
              step={step}
              idx={idx}
              isActive={activeStep === idx}
              onClick={() => setActiveStep(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
