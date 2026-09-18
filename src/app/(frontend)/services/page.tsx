import { Metadata } from "next";
import Link from "next/link";
import ServicesShowcase from "@/components/ServicesShowcase";
import { getServices, getServicesPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services | CGplux Studios",
  description:
    "A relentless pursuit of visual excellence. We blend cutting-edge technology with cinematic storytelling to create unparalleled digital experiences.",
};

export default async function ServicesPage() {
  const [services, servicesPage] = await Promise.all([
    getServices().catch(() => []),
    getServicesPage().catch(() => null),
  ]);

  return (
    <section className="pt-32 sm:pt-36 md:pt-44 pb-20 md:pb-32 bg-[#000000] relative overflow-hidden border-b border-white/[0.08]">
      {/* Background subtle ambient grid */}
      <div className="absolute inset-0 redstone-grid-lines opacity-20 pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-16 relative">
        {/* Hero Section matching reference */}
        <div className="flex flex-col gap-5 max-w-4xl mb-16 sm:mb-20 md:mb-24">
          {/* Eyebrow Pill Badge */}
          <div className="flex items-center">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-300 font-semibold">
                {servicesPage?.eyebrow || "WHAT WE DO BEST."}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-black tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] text-white">
            {servicesPage?.title || "We engineer digital perfection."}
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-light mt-1">
            {servicesPage?.subtitle ||
              "A relentless pursuit of visual excellence. We blend cutting-edge technology with cinematic storytelling to create unparalleled digital experiences."}
          </p>
        </div>

        {/* 3-Column Service Cards Grid */}
        <div className="w-full relative">
          <ServicesShowcase services={services} />
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Need a custom combination of services or technical consulting?
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-700 bg-zinc-900/80 hover:bg-white text-zinc-200 hover:text-black font-mono text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 group"
          >
            <span>Request Service Proposal</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
