import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import ProjectCards from "@/components/ProjectCards";
import ServiceGrid from "@/components/ServiceGrid";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import FounderSection from "@/components/FounderSection";
import BlogPreview from "@/components/BlogPreview";
import ContactCTA from "@/components/ContactCTA";
import {
  getProjects,
  getServices,
  getTestimonials,
  getSiteSettings,
  getFounderProfile,
  getClients,
  getBlogPosts,
  getHomePage,
} from "@/lib/data";

export default async function Home() {
  const [projects, services, testimonials, settings, founder, allClients, blogPosts, homePage] =
    await Promise.all([
      getProjects().catch(() => []),
      getServices().catch(() => []),
      getTestimonials().catch(() => []),
      getSiteSettings().catch(() => null),
      getFounderProfile().catch(() => null),
      getClients().catch(() => []),
      getBlogPosts().catch(() => []),
      getHomePage().catch(() => null),
    ]);

  const clients = allClients.filter((c: { isPartner?: boolean }) => !c.isPartner);
  const partners = allClients.filter((c: { isPartner?: boolean }) => c.isPartner);

  return (
    <>
      <Hero
        eyebrow={homePage?.heroEyebrow || "Full-Cycle Digital Studio"}
        title={homePage?.heroTitle || "CUSTOM CRM, DESIGN,"}
        titleStroke={homePage?.heroTitleStroke || "APP & WEB DEVELOPMENT"}
        subtitle={
          homePage?.heroSubtitle ||
          "We engineer high-performance web solutions, bespoke mobile apps, and scalable digital infrastructure. Business process optimization, rapid launch, and 24/7 SLA technical support."
        }
        projectsDelivered={homePage?.projectsDelivered || "500+"}
        techStack={homePage?.techStack || "React • Next.js • Node • Cloud"}
        successRate={homePage?.successRate || "99.4%"}
      />

      {/* Trusted Clients Marquee */}
      <ClientsSection clients={clients} partners={partners} />

      {/* Redstone Featured Projects with Category Tabs */}
      <ProjectCards projects={projects} />

      {/* Redstone Numbered Services 01 - 08 */}
      <ServiceGrid services={services} />

      {/* Redstone 8-Stage Project Methodology */}
      <ProcessSection />

      {/* Studio Mission & Story */}
      <AboutSection
        eyebrow={homePage?.aboutEyebrow || "About CGPLUX"}
        title={homePage?.aboutTitle || "Engineering Modern Web Architecture"}
        paragraphs={homePage?.aboutParagraphs}
        stat={homePage?.aboutStat || "10+"}
        statLabel={homePage?.aboutStatLabel || "Years in Global IT Development"}
      />

      {/* Verified Reviews & Clutch Proof */}
      <TestimonialsSlider testimonials={testimonials} />

      {/* Engineering Leadership */}
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

      {/* Latest Technical Articles & Case Insights */}
      <BlogPreview posts={blogPosts} />

      {/* Pre-Footer Action Banner */}
      <ContactCTA
        ctaTitle={homePage?.ctaTitle}
        ctaSubtitle={homePage?.ctaSubtitle}
        ctaEmail={homePage?.ctaEmail}
      />
    </>
  );
}
