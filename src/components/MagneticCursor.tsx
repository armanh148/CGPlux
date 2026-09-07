"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // default true (SSR safe)

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // Detect if device has a fine pointer (mouse). If touch-only, skip.
    const hasMouse = window.matchMedia("(pointer: fine)").matches;
    setIsTouch(!hasMouse);
    if (!hasMouse) return;
    
    if (!cursor || !follower) return;

    // quickTo is highly optimized for mouse followers in GSAP 3
    const setCursorX = gsap.quickTo(cursor, "x", { duration: 0, ease: "none" });
    const setCursorY = gsap.quickTo(cursor, "y", { duration: 0, ease: "none" });
    
    const setFollowerX = gsap.quickTo(follower, "x", { duration: 0.15, ease: "power3.out" });
    const setFollowerY = gsap.quickTo(follower, "y", { duration: 0.15, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      setFollowerX(e.clientX);
      setFollowerY(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractable = target.closest("a, button, .magnetic, input, textarea");
      
      setIsHovering(!!isInteractable);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-300 ${
          isHovering ? "scale-[0]" : "scale-100"
        }`}
      />
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center ${
          isHovering 
            ? "w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30" 
            : "w-8 h-8 border border-white/40"
        }`}
      >
      </div>
    </>
  );
}
