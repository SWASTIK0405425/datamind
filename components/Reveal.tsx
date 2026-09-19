"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Minimal scroll-reveal wrapper (no animation library).
 * Fades/slides children in once when they enter the viewport.
 * Falls back to visible immediately when IntersectionObserver is
 * unavailable, and respects prefers-reduced-motion via the global
 * CSS override in globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} transition-all duration-700 ease-standard ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
