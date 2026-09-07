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
  services: Service[];
}

export default function ServicesShowcase({ services }: ServicesShowcaseProps) {
  const fallback = [
    { title: "Software Development", slug: { current: "software-development" }, description: "End-to-end custom software solutions engineered for scale and performance.", tags: ["Custom Apps", "Enterprise", "APIs"], image: "/images/services/software_development.png" },
    { title: "Graphic Design", slug: { current: "graphic-design" }, description: "Striking visual identities that communicate your brand's unique story and values.", tags: ["Branding", "UI/UX", "Visual Identity"], image: "/images/services/graphic_design.png" },
    { title: "SEO", slug: { current: "seo" }, description: "Data-driven optimization strategies to dominate search rankings and drive organic traffic.", tags: ["Ranking", "Optimization", "Content"], image: "/images/services/seo.png" },
    { title: "Web Development", slug: { current: "web-development" }, description: "High-performance, immersive web experiences built with modern frameworks.", tags: ["React", "Next.js", "E-commerce"], image: "/images/services/web_development.png" },
    { title: "Digital Marketing", slug: { current: "digital-marketing" }, description: "Targeted campaigns that maximize ROI and accelerate brand growth across digital channels.", tags: ["Campaigns", "Social Media", "Growth"], image: "/images/services/digital_marketing.png" },
    { title: "3D Animation", slug: { current: "3d-animation" }, description: "Cinematic 3D visuals and CGI that push the boundaries of digital reality.", tags: ["3D Visualization", "Architectural", "CGI"], image: "/images/services/3d.png" },
  ];

  const items: Service[] =
    services.length > 0
      ? services
      : fallback.map((f, i) => ({ _id: String(i), ...f }));

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pb-20">
      {items.map((service, index) => (
        <Link 
          key={service._id} 
          href={service.slug ? `/services/${service.slug.current}` : '#'}
          className="group flex flex-col gap-6"
        >
          {/* Image Container */}
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative bg-brand-dark border border-white/10">
            {service.image ? (
              <Image
                src={typeof service.image === "string" ? service.image : urlFor(service.image).width(800).height(600).url()}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              />
            ) : (
              <div className="w-full h-full bg-white/5" />
            )}
            
            {/* Minimal Tags Overlay */}
            {service.tags && service.tags.length > 0 && (
              <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap max-w-[80%]">
                {service.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase font-mono tracking-[0.1em] text-white/90 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <h3 className="text-[28px] md:text-[32px] font-heading font-bold text-white group-hover:text-brand-accent transition-colors duration-300 mb-3 leading-[1.1]">
              {service.title}
            </h3>
            <p className="text-white/60 text-base leading-[1.6] mb-6 line-clamp-3 font-light">
              {service.description || "Comprehensive solutions tailored to elevate your brand's digital presence."}
            </p>
            <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-white/80 group-hover:text-brand-accent transition-colors mt-auto">
              Explore 
              <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
