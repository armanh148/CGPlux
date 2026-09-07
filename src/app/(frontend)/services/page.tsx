import { Metadata } from "next";
import ServicesShowcase from "@/components/ServicesShowcase";
import { getServices, getServicesPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services | CGplux Studios",
  description: "What we build at CGplux Studios.",
};

export default async function ServicesPage() {
  const [services, servicesPage] = await Promise.all([
    getServices().catch(() => []),
    getServicesPage().catch(() => null),
  ]);

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-32 bg-[#000000] overflow-hidden border-b border-white/[0.08]">
      <div className="absolute inset-0 redstone-grid-lines opacity-40 pointer-events-none" />
      <div className="w-full px-6 lg:px-12 relative">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
            <span className="w-6 h-[1.5px] bg-white" />
            {servicesPage?.eyebrow || "Our Expertise"}
          </div>
          <h1 className="m-0 font-heading font-black tracking-tight text-4xl sm:text-5xl md:text-7xl leading-[0.95] text-white uppercase">
            {servicesPage?.title || "We engineer digital perfection."}
          </h1>
          <p className="m-0 text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl leading-[1.7] font-light">
            {servicesPage?.subtitle || "A relentless pursuit of visual excellence. We blend cutting-edge technology with cinematic storytelling to create unparalleled digital experiences."}
          </p>
        </div>
      </div>
      
      <div className="w-full px-6 lg:px-12 relative mt-20">
        <ServicesShowcase services={services} />
      </div>
    </section>
  );
}
