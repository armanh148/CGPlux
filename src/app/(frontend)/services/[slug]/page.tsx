import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/data";
import SingleServiceClient from "@/components/SingleServiceClient";

export const metadata: Metadata = {
  title: "Service Details | CGplux Studios",
  description: "Learn more about our specific service offerings.",
};

const fallbackServices = [
  { title: "Software Development", slug: { current: "software-development" }, tags: ["Custom Apps", "Enterprise", "APIs"], image: "/images/services/software_development.png" },
  { title: "Graphic Design", slug: { current: "graphic-design" }, tags: ["Branding", "UI/UX", "Visual Identity"], image: "/images/services/graphic_design.png" },
  { title: "SEO", slug: { current: "seo" }, tags: ["Ranking", "Optimization", "Content"], image: "/images/services/seo.png" },
  { title: "Web Development", slug: { current: "web-development" }, tags: ["React", "Next.js", "E-commerce"], image: "/images/services/web_development.png" },
  { title: "Digital Marketing", slug: { current: "digital-marketing" }, tags: ["Campaigns", "Social Media", "Growth"], image: "/images/services/digital_marketing.png" },
  { title: "3D Animation", slug: { current: "3d-animation" }, tags: ["3D Visualization", "Architectural", "CGI"], image: "/images/services/3d.png" },
];

export default async function SingleServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let service = await getServiceBySlug(params.slug).catch(() => null);

  // Check local fallback data if needed
  if (!service) {
    const fallback = fallbackServices.find((s) => s.slug.current === params.slug);
    if (fallback) {
      service = fallback;
    } else {
      notFound();
    }
  }

  return <SingleServiceClient service={service} />;
}
