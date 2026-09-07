import { Metadata } from "next";
import TeamGrid from "@/components/TeamGrid";
import { getTeamMembers, getTeamPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Team | CGplux Studios",
  description: "Meet the team behind CGplux Studios.",
};

export default async function OurTeamPage() {
  const [members, teamPage] = await Promise.all([
    getTeamMembers().catch(() => []),
    getTeamPage().catch(() => null),
  ]);

  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-32 bg-[#000000] overflow-hidden border-b border-white/[0.08]">
      <div className="absolute inset-0 redstone-grid-lines opacity-40 pointer-events-none" />
      <div className="w-full px-6 lg:px-12 relative">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
            <span className="w-6 h-[1.5px] bg-white" />
            {teamPage?.eyebrow || "Our Team"}
          </div>
          <h1 className="m-0 font-heading font-black tracking-tight text-4xl sm:text-5xl md:text-7xl leading-[0.95] text-white uppercase">
            {teamPage?.title || "The People Behind the Vision"}
          </h1>
          <p className="m-0 text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl leading-[1.7] font-light">
            {teamPage?.subtitle || "A team of skilled artists combining creativity with advanced technology to produce high-quality animations and visual content."}
          </p>
        </div>
      </div>
      <div className="w-full px-6 lg:px-12 relative mt-20">
        <TeamGrid members={members} />
      </div>
    </section>
  );
}
