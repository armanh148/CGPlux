import { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";
import { getPortfolioItems, getPortfolioPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio | CGplux Studios",
  description: "Selected work from CGplux Studios studios.",
};

export default async function PortfolioPage() {
  const [items, portfolioPage] = await Promise.all([
    getPortfolioItems().catch(() => []),
    getPortfolioPage().catch(() => null),
  ]);

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-32 bg-[#000000] overflow-hidden border-b border-white/[0.08]">
      <div className="absolute inset-0 redstone-grid-lines opacity-40 pointer-events-none" />
      <div className="w-full px-6 sm:px-10 lg:px-16 relative">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
            <span className="w-6 h-[1.5px] bg-white" />
            {portfolioPage?.eyebrow || "Our Work"}
          </div>
          <h1 className="m-0 font-heading font-black tracking-tight text-4xl sm:text-5xl md:text-7xl leading-[0.95] text-white uppercase">
            {portfolioPage?.title || "Portfolio"}
          </h1>
          {portfolioPage?.subtitle && (
            <p className="m-0 text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl leading-[1.7] font-light">
              {portfolioPage.subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="w-full px-6 sm:px-10 lg:px-16 relative mt-16 sm:mt-20">
        <PortfolioGrid items={items} />
      </div>
    </section>
  );
}
