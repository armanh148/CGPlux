"use client";

import Link from "next/link";

interface FooterProps {
  instagramUrl?: string;
  behanceUrl?: string;
  linkedinUrl?: string;
}

export default function Footer({
  instagramUrl = "https://instagram.com",
  behanceUrl = "https://behance.net",
  linkedinUrl = "https://linkedin.com",
}: FooterProps) {
  return (
    <footer className="bg-[#000000] text-zinc-400 border-t border-white/[0.08] relative overflow-hidden">
      {/* Pre-Footer High-Impact CTA Banner */}
      <div className="border-b border-white/[0.08] bg-[#08080a]">
        <div className="w-full px-6 lg:px-12 py-20 lg:py-28 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mb-3 flex items-center gap-3">
              <span className="w-6 h-[1.5px] bg-white" />
              Have an Idea or RFP?
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight uppercase leading-[1.05]">
              Let&apos;s build something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                extraordinary together.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-5 bg-white hover:bg-zinc-200 text-black font-mono text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 shadow-xl shadow-white/5"
            >
              <span>Let&apos;s Begin</span>
              <span className="text-lg leading-none">&rarr;</span>
            </Link>

            <a
              href="mailto:contact@cgplux.com"
              className="inline-flex items-center gap-3 px-8 py-5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-mono text-xs uppercase tracking-widest font-medium rounded-sm transition-all duration-300"
            >
              <span>contact@cgplux.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Multi-Column Directory */}
      <div className="w-full px-6 lg:px-12 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand & Contact Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-0 lg:pr-8">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/LOGO.avif"
                alt="CGplux Logo"
                className="w-32 h-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-sm mb-8">
              Full-cycle engineering studio specializing in high-performance web development, custom CRM systems, cross-platform mobile apps, and scalable digital design.
            </p>

            <div className="flex flex-col gap-2 font-mono text-xs text-zinc-400 mb-8">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider">Inquiries:</span>{" "}
                <a href="mailto:contact@cgplux.com" className="text-zinc-200 hover:text-white transition-colors">
                  contact@cgplux.com
                </a>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-wider">Status:</span>{" "}
                <span className="text-emerald-400 font-medium">Accepting New Client Sprints</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { name: "LinkedIn", url: linkedinUrl },
                { name: "Behance", url: behanceUrl },
                { name: "Instagram", url: instagramUrl },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-500 hover:text-white text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Portfolio Categories */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-bold mb-6 pb-2 border-b border-white/[0.08]">
              Portfolio
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light">
              {[
                "Web Applications",
                "Creative / Corporate",
                "Real Estate",
                "E-Commerce",
                "CRM & ERP Systems",
                "Landing Pages",
                "Mobile Products",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/portfolio"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-bold mb-6 pb-2 border-b border-white/[0.08]">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light">
              {[
                "Website Development",
                "Branding & UI/UX",
                "CRM System Dev",
                "E-Commerce Solutions",
                "Mobile App Dev",
                "Website Support & SLA",
                "Redesign & Migration",
                "Technical SEO",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Technologies & Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-bold mb-6 pb-2 border-b border-white/[0.08]">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-light">
              {[
                { label: "About Studio", href: "/about" },
                { label: "Engineering Team", href: "/our-team" },
                { label: "Our Process", href: "/#process" },
                { label: "Client Reviews", href: "/#reviews" },
                { label: "Engineering Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Ghost Watermark */}
        <div className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} CGPLUX. All rights reserved. Built with precision.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-zinc-700">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-zinc-700">|</span>
            <a href="#top" className="hover:text-white transition-colors">
              Back to top &uarr;
            </a>
          </div>
        </div>

      </div>

      {/* ── CGPLUX Signature Footer Strip (medtech-style) ── */}
      <div className="relative w-full overflow-hidden select-none" style={{ height: "clamp(120px, 18vw, 260px)" }}>

        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0a0a0f 0%, #111118 40%, #0d0d14 70%, #080810 100%)",
          }}
        />

        {/* Subtle radial glow — center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Top bar: copyright + links */}
        <div className="relative z-10 flex items-center justify-between px-6 lg:px-10 pt-5 pb-0">
          <a
            href="/terms"
            className="font-mono text-[11px] uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors duration-300"
          >
            Terms &amp; Conditions
          </a>

          <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
            &copy; {new Date().getFullYear()} CGPLUX. All Rights Reserved.
          </span>

          <a
            href="/privacy"
            className="font-mono text-[11px] uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </div>

        {/* Giant watermark text */}
        <div
          className="absolute bottom-0 left-0 w-full text-center font-heading font-black leading-none pointer-events-none"
          style={{
            fontSize: "clamp(90px, 22vw, 420px)",
            letterSpacing: "-0.035em",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.10)",
            backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            transform: "translateY(18%)",
          }}
        >
          CGPLUX
        </div>
      </div>
    </footer>
  );
}
