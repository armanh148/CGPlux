import { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import ClientsSection from "@/components/ClientsSection";
import ContactCTA from "@/components/ContactCTA";
import { getSiteSettings, getFounderProfile, getClients, getHomePage, getAboutPage } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | CGplux Studios",
  description: "Learn more about CGplux Studios, our founders, and the clients we serve.",
};

export default async function AboutPage() {
  const [settings, founder, allClients, homePage, aboutPage] = await Promise.all([
    getSiteSettings().catch(() => null),
    getFounderProfile().catch(() => null),
    getClients().catch(() => []),
    getHomePage().catch(() => null),
    getAboutPage().catch(() => null),
  ]);

  const clients = allClients.filter((c: { isPartner?: boolean }) => !c.isPartner);
  const partners = allClients.filter((c: { isPartner?: boolean }) => c.isPartner);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-[#000000] relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 redstone-grid-lines opacity-40 pointer-events-none" />
        <div className="w-full px-6 lg:px-12 relative">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400">
              <span className="w-6 h-[1.5px] bg-white" />
              {aboutPage?.eyebrow || "Who We Are"}
            </div>
            <h1 className="m-0 font-heading font-black tracking-tight text-4xl sm:text-5xl md:text-7xl leading-[0.95] text-white uppercase">
              {aboutPage?.title || "About CGplux Studios"}
            </h1>
            <p className="m-0 text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl leading-[1.7] font-light">
              We are a collective of visionaries and technologists, united by a singular mission to redefine the digital frontier and build experiences that endure.
            </p>
          </div>
        </div>
      </section>

      <AboutSection
        eyebrow={homePage?.aboutEyebrow}
        title={homePage?.aboutTitle}
        paragraphs={homePage?.aboutParagraphs}
        stat={homePage?.aboutStat}
        statLabel={homePage?.aboutStatLabel}
      />
      <FounderSection
        sectionEyebrow={founder?.sectionEyebrow}
        sectionTitle={founder?.sectionTitle}
        imageEyebrow={founder?.imageEyebrow}
        imageTitle={founder?.imageTitle}
        name={founder?.name}
        role={founder?.role}
        designation={founder?.designation}
        bio={founder?.bio}
        coFounderName={founder?.coFounderName}
        coFounderRole={founder?.coFounderRole}
        coFounderBio={founder?.coFounderBio}
        photo={founder?.photo}
        instagramUrl={founder?.instagramUrl}
        linkedinUrl={founder?.linkedinUrl}
      />
      <ClientsSection clients={clients} partners={partners} />
      <ContactCTA
        ctaTitle={homePage?.ctaTitle}
        ctaSubtitle={homePage?.ctaSubtitle}
        ctaEmail={homePage?.ctaEmail}
      />
    </>
  );
}
