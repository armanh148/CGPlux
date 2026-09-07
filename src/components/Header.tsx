"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/our-team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY && isVisible) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY && !isVisible) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isVisible]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >

        {/* Main Navbar Bar */}
        <div className="flex h-[76px] w-full items-center justify-between px-6 md:px-12 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.08]">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline group"
          >
            <div className="w-[125px] md:w-[145px] h-auto transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src={logoUrl || "/LOGO.avif"}
                alt="CGplux Studios"
                className="w-full h-auto object-contain brightness-105"
              />
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative font-mono text-[11px] uppercase tracking-[0.2em] no-underline py-1.5
                    transition-colors duration-200 group
                    ${isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"}
                  `}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-white transform origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area: Let's Begin CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-sm bg-white text-black font-mono text-xs uppercase tracking-widest font-bold overflow-hidden transition-all duration-300 hover:bg-zinc-200 shadow-sm"
            >
              <span className="text-black">Let&apos;s Begin</span>
              <span className="text-black">
                ↗
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 text-white bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#000000]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 transition-all duration-500 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-2">
            // Navigation
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  font-mono text-xl uppercase tracking-[0.2em] no-underline transition-colors
                  ${isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center py-3.5 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-zinc-200 transition-colors"
          >
            Let&apos;s Begin ↗
          </Link>
          <div className="text-[11px] font-mono text-zinc-500 text-center">
            contact@cgplux.com
          </div>
        </div>
      </div>
    </>
  );
}
