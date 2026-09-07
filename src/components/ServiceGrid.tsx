"use client";

import { useState } from "react";
import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Service {
  _id: string;
  title: string;
  description?: string;
  tags?: string[];
  image?: any;
  slug?: { current: string };
}

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  const [activeItem, setActiveItem] = useState<number | null>(0);

  const fallbackServices = [
    {
      num: "01",
      title: "Website Development",
      slug: "website-development",
      desc: "Full-cycle engineering of modern, lightning-fast web applications. We utilize battle-tested frameworks to create scalable corporate portals and high-load web systems.",
      tags: ["React", "Next.js", "Vue.js", "Node.js", "Laravel", "WordPress"],
    },
    {
      num: "02",
      title: "Branding and UI/UX Design",
      slug: "branding-design",
      desc: "Design that communicates value and converts visitors into loyal clients. Wireframing, intuitive design systems, brand guidelines, and high-fidelity prototypes.",
      tags: ["Figma", "Design Systems", "Interactive Prototypes", "Brand Guidelines", "Visual Identity"],
    },
    {
      num: "03",
      title: "CRM & Enterprise Systems",
      slug: "crm-system",
      desc: "Custom CRM platforms engineered to automate complex workflows, manage high-volume customer databases, and optimize organizational bottlenecks.",
      tags: ["Custom Architecture", "ERP Integration", "Role-Based Access", "Workflow Automation", "Analytics"],
    },
    {
      num: "04",
      title: "E-Commerce Solutions",
      slug: "e-commerce",
      desc: "Bespoke digital storefronts designed for peak conversion, frictionless payment routing, inventory management, and headless e-commerce architectures.",
      tags: ["Shopify Plus", "Headless Commerce", "Stripe API", "Cart Optimization", "Custom Checkout"],
    },
    {
      num: "05",
      title: "Mobile Application Development",
      slug: "app-development",
      desc: "Native and cross-platform mobile experiences for iOS and Android with buttery-smooth interactions, offline sync, and real-time push engines.",
      tags: ["iOS Native", "Android", "React Native", "Flutter", "App Store Compliance"],
    },
    {
      num: "06",
      title: "Website Support & 24/7 SLA",
      slug: "site-support",
      desc: "Proactive infrastructure monitoring, speed optimization, regular security patching, and round-the-clock technical incident resolution.",
      tags: ["24/7 Monitoring", "Security Audits", "Core Web Vitals", "Zero-Downtime Migration", "Backup Systems"],
    },
    {
      num: "07",
      title: "Redesign & Architecture Modernization",
      slug: "redesign",
      desc: "Migrating outdated legacy platforms to modern cloud-native architectures with modern UI paradigms without disrupting ongoing business operations.",
      tags: ["Code Audit", "Cloud Refactoring", "UX Modernization", "Database Re-indexing", "Zero Data Loss"],
    },
    {
      num: "08",
      title: "Search Engine Optimization (SEO)",
      slug: "seo",
      desc: "Deep technical SEO, structured data schemas, crawl budget tuning, and performance engineering to achieve dominant top rankings on search engines.",
      tags: ["Technical Audit", "Semantic Schema", "PageSpeed 95+", "Content Strategy", "High-Intent Rankings"],
    },
  ];

  // Merge Sanity data with Redstone structured layout items
  const items = fallbackServices.map((fallbackItem, i) => {
    const existing = services[i];
    return {
      num: fallbackItem.num,
      title: existing?.title || fallbackItem.title,
      slug: existing?.slug?.current || fallbackItem.slug,
      desc: existing?.description || fallbackItem.desc,
      tags: existing?.tags && existing.tags.length > 0 ? existing.tags : fallbackItem.tags,
    };
  });

  return (
    <section id="services" className="py-20 md:py-28 lg:py-36 bg-[#000000] relative border-b border-white/[0.08]">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 mb-3">
              <span className="w-6 h-[1.5px] bg-white" />
              Comprehensive Capabilities
            </div>
            <h2 className="font-heading font-black tracking-tight text-3xl sm:text-4xl md:text-6xl text-white uppercase">
              Our Services
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
              We cover all stages of product development: from initial discovery and prototyping to full-stack engineering, CRM automation, and post-launch SLA support.
            </p>
          </div>
        </div>

        {/* Numbered Service Rows (Redstone Signature Pattern) */}
        <div className="divide-y divide-white/[0.08]">
          {items.map((service, idx) => {
            const isHovered = activeItem === idx;
            return (
              <div
                key={service.num}
                onMouseEnter={() => setActiveItem(idx)}
                className={`group py-8 md:py-10 transition-all duration-300 ${
                  isHovered ? "bg-white/[0.02]" : ""
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Index & Title */}
                  <div className="flex items-baseline gap-6 lg:gap-10 lg:w-5/12">
                    <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                      {service.num}
                    </span>
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white group-hover:text-zinc-200 transition-colors tracking-tight">
                      <Link href={`/services/${service.slug}`} className="hover:underline">
                        {service.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Middle: Capability Tags */}
                  <div className="lg:w-4/12 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:border-zinc-600 group-hover:text-white text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Right: Action link */}
                  <div className="lg:w-2/12 flex lg:justify-end items-center">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors group/btn"
                    >
                      <span>View Details</span>
                      <span className="text-white transition-transform duration-300 group-hover/btn:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Sub-description row */}
                <div className="mt-4 pl-8 lg:pl-16 max-w-3xl">
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">
                    {service.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom All Services CTA Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Need a custom combination of services or technical consulting?
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-700 bg-zinc-900/80 hover:bg-white text-zinc-200 hover:text-black font-mono text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300"
          >
            <span>Request Service Proposal</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
