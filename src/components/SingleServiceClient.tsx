"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/data";
import { gsap } from "@/lib/gsap";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SingleServiceClient({ service }: { service: any }) {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animate Image Reveal
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.1, opacity: 0, filter: "blur(20px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
        );
      }

      // Animate Text Elements Staggered
      tl.fromTo(
        ".animate-element",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=1"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(imageRef.current, {
      x: x * 30,
      y: y * 30,
      rotationY: x * 10,
      rotationX: -y * 10,
      ease: "power2.out",
      duration: 0.8
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      ease: "elastic.out(1, 0.5)",
      duration: 1.5
    });
  };

  return (
    <section ref={containerRef} className="pt-[6rem] sm:pt-[8rem] md:pt-[10rem] lg:pt-[12rem] pb-24 md:pb-32 bg-brand-dark min-h-screen">
      <div className="w-full px-6 lg:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column: Visuals */}
        <div className="lg:w-5/12 flex flex-col perspective-[1000px]">
          <div 
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-black/50 border border-white/[0.08] group shadow-2xl"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {service.image ? (
              <div ref={imageRef} className="absolute inset-0 w-full h-full transform-style-3d">
                <Image
                  src={
                    typeof service.image === "string"
                      ? service.image
                      : urlFor(service.image).width(1000).height(1250).url()
                  }
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  priority
                />
              </div>
            ) : (
              <div ref={imageRef} className="absolute inset-0 flex items-center justify-center bg-brand-dark transform-style-3d">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,199,192,0.15),transparent_50%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="font-mono text-white/40 tracking-widest uppercase relative z-10">No Image Provided</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-80" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 pointer-events-none">
              <div className="font-mono text-[10px] uppercase tracking-widest text-brand-accent mb-2">Selected Service</div>
              <div className="font-heading font-bold text-3xl text-white">{service.title}</div>
            </div>
            
            {/* Minimal Decorative Corner Accents */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/20 transition-all duration-700 group-hover:border-brand-accent/50 group-hover:-translate-x-1 group-hover:-translate-y-1 z-10 pointer-events-none"></div>
            <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/20 transition-all duration-700 group-hover:border-brand-accent/50 group-hover:translate-x-1 group-hover:-translate-y-1 z-10 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/20 transition-all duration-700 group-hover:border-brand-accent/50 group-hover:-translate-x-1 group-hover:translate-y-1 z-10 pointer-events-none"></div>
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/20 transition-all duration-700 group-hover:border-brand-accent/50 group-hover:translate-x-1 group-hover:translate-y-1 z-10 pointer-events-none"></div>
          </div>
          
          {/* Back Button */}
          <Link href="/services" className="animate-element group inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300 mt-10 w-max">
            <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/30 group-hover:-translate-x-2">
              &larr;
            </span>
            Back to Services
          </Link>
        </div>

        {/* Right Column: Content */}
        <div className="lg:w-7/12 flex flex-col pt-4 lg:pt-12" ref={textRef}>
          <div className="animate-element font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-brand-accent"></span>
            Service Detail
          </div>
          
          <h1 className="animate-element font-heading font-medium tracking-tight text-[32px] sm:text-[42px] md:text-[52px] lg:text-[64px] leading-[1.1] text-white mb-8">
            {service.title}
          </h1>

          {service.tags && service.tags.length > 0 && (
            <div className="animate-element flex flex-wrap gap-3 mb-10">
              {service.tags.map((tag: string) => (
                <span key={tag} className="px-4 py-1.5 border border-brand-accent/20 rounded-full text-[11px] font-mono tracking-[0.15em] uppercase text-brand-accent bg-brand-accent/[0.05]">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="animate-element text-[18px] md:text-[22px] leading-[1.6] text-white/80 font-light mb-12 max-w-[55ch]">
            {service.description || "Detailed overview of our service and how we can elevate your brand's digital presence."}
          </div>

          <div className="animate-element flex flex-col gap-6 text-white/60 leading-[1.8] text-[15px] md:text-[16px] max-w-[65ch]">
            {service.content ? (
              <div className="prose prose-invert prose-p:text-white/60 prose-headings:font-heading prose-headings:font-medium prose-headings:text-white max-w-none">
                <PortableText value={service.content} />
              </div>
            ) : (
              <>
                <p>
                  This is a placeholder for the detailed service content. You can write rich text here including paragraphs, bullet lists, and subheadings to explain your process, tools, and outcomes for this specific service.
                </p>
                <p>
                  We focus on delivering high-quality, impactful results that align with your business goals. Our experienced team uses industry-standard pipelines and cutting-edge software to ensure every project is executed flawlessly from concept to final delivery.
                </p>
                <p>
                  Ready to start a project? Reach out to us today to discuss your vision and see how our tailored solutions can bring your ideas to life.
                </p>
              </>
            )}
          </div>
          
          {/* Child Services / Specific Offerings */}
          {service.childServices && service.childServices.length > 0 && (
            <div className="animate-element mt-16 pt-12 border-t border-white/10">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-brand-accent"></span>
                Specific Offerings
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.childServices.map((child: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-4 group border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors rounded-xl">
                    {child.image && (
                      <div className="w-full aspect-[16/9] rounded-lg overflow-hidden bg-brand-dark/50 relative mb-2">
                        <Image
                          src={urlFor(child.image).width(600).height(400).url()}
                          alt={child.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors" />
                       <h4 className="font-heading font-medium text-xl text-white group-hover:text-brand-accent transition-colors">{child.title}</h4>
                    </div>
                    {child.description && (
                      <p className="text-white/50 text-sm leading-relaxed">{child.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="animate-element mt-16 pt-12 border-t border-white/10">
             <div className="font-heading text-2xl text-white mb-6">Let&apos;s build something extraordinary together.</div>
             <Link
                href="/contact"
                className="group inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-brand-dark bg-brand-accent hover:bg-white px-8 py-4 rounded-full transition-colors duration-300"
              >
                Start a Project
              </Link>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
