"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/data";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Service {
  _id: string;
  title: string;
  description?: string;
  tags?: string[];
  image?: any;
  slug?: { current: string };
}

interface ServicesShowcaseProps {
  services?: Service[];
}

export default function ServicesShowcase({ services = [] }: ServicesShowcaseProps) {
  const fallbackServices = [
    {
      _id: "digital-marketing",
      title: "Digital Marketing",
      slug: { current: "digital-marketing" },
      description:
        "Precision-targeted marketing campaigns that convert attention into revenue.",
      image: "/images/services/digital_marketing.png",
    },
    {
      _id: "seo",
      title: "Search Engine Optimization",
      slug: { current: "seo" },
      description:
        "Data-driven SEO strategies to boost organic visibility and dominate search rankings.",
      image: "/images/services/seo.png",
    },
    {
      _id: "software-development",
      title: "Software Development",
      slug: { current: "software-development" },
      description:
        "Enterprise-grade software engineering to solve complex operational challenges.",
      image: "/images/services/software_development.png",
    },
    {
      _id: "website-development",
      title: "Website Development",
      slug: { current: "website-development" },
      description:
        "High-performance web applications built for speed, scalability, and security.",
      image: "/images/services/web_development.png",
    },
    {
      _id: "graphic-design",
      title: "Graphic Design",
      slug: { current: "graphic-design" },
      description:
        "Strategic brand identities, scalable design systems, and conversion-focused visual assets.",
      image: "/images/services/graphic_design.png",
    },
    {
      _id: "3d-animation",
      title: "3D Animation & CGI",
      slug: { current: "3d-animation" },
      description:
        "Photorealistic 3D product renders and cinematic CGI commercial animation.",
      image: "/images/services/3d.png",
    },
  ];

  // If dynamic services are provided, merge or prefer fallback visual structure
  const items: Service[] =
    services.length > 0
      ? fallbackServices.map((fb, idx) => {
          const cms = services[idx];
          if (!cms) return fb;
          return {
            _id: cms._id || fb._id,
            title: cms.title || fb.title,
            slug: cms.slug?.current ? cms.slug : fb.slug,
            description: cms.description || fb.description,
            image: cms.image || fb.image,
            tags: cms.tags,
          };
        })
      : fallbackServices;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-16">
      {items.map((service) => {
        const href = service.slug ? `/services/${service.slug.current}` : "#";
        const imageSrc =
          typeof service.image === "string"
            ? service.image
            : service.image
            ? urlFor(service.image).width(900).height(600).url()
            : null;

        return (
          <article key={service._id} className="group flex flex-col filter grayscale hover:grayscale-0 transition-all duration-500">
            <Link href={href} className="block no-underline">
              {/* Image Container with sharp square corners */}
              <div className="w-full aspect-[16/10] rounded-none overflow-hidden relative bg-zinc-900/80 border border-white/[0.08] group-hover:border-white/20 shadow-2xl transition-colors duration-500">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
              </div>

              {/* Title */}
              <h2 className="font-heading font-bold text-2xl sm:text-[26px] md:text-[28px] text-white tracking-tight leading-[1.2] mt-6 group-hover:text-zinc-100 transition-colors">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed mt-2.5 font-light">
                {service.description}
              </p>

              {/* Monospace EXPLORE CTA with animated arrow */}
              <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition-colors duration-200">
                <span>EXPLORE</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
