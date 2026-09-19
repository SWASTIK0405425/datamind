"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types/auth";

const LINKS = [
  { href: "#ask", label: "Ask Database" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#examples", label: "Examples" },
];

function UserMenu({ session }: { session: { username: string; role: UserRole } }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ease-standard ${
          open ? "border-accent-400 shadow-glow-sm" : "border-ink-700 hover:border-ink-500"
        } bg-ink-800`}
      >
        {/* Blank/generic profile silhouette — no photo, just a placeholder avatar. */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink-400" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="8" r="3.4" />
          <path d="M4.5 20c1.4-3.6 4.4-5.4 7.5-5.4s6.1 1.8 7.5 5.4" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 w-56 animate-scale-in rounded-lg border border-ink-700 bg-ink-900 py-2 shadow-lift"
        >
          <div className="border-b border-ink-800 px-4 py-3">
            <p className="truncate text-sm font-semibold text-ink-100">{session.username}</p>
            <p className={`mt-0.5 text-xs uppercase tracking-widest2 ${session.role === "admin" ? "text-accent-400" : "text-ink-500"}`}>
              {session.role === "admin" ? "Admin" : "Member"}
            </p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            disabled={loggingOut}
            className="block w-full px-4 py-2.5 text-left text-sm text-ink-300 transition-colors duration-150 hover:bg-ink-800 hover:text-ink-100 disabled:opacity-50"
          >
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState<{ username: string; role: UserRole } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.authenticated) {
          setSession({ username: data.username, role: data.role });
        }
      })
      .catch(() => {
        /* nav badge is a nice-to-have */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-standard ${
        scrolled ? "bg-ink-950/90 backdrop-blur-md shadow-nav-shadow" : "bg-transparent"
      }`}
    >
      <nav className="section flex h-20 items-center justify-between">
        <a href="#top" className="font-display text-xl italic tracking-tight text-ink-100">
          Data<span className="text-accent-400 not-italic">Mind</span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <li key={link.href} className="group">
              <a
                href={link.href}
                className="relative text-xs font-semibold uppercase tracking-widest2 text-ink-300 transition-colors duration-300 ease-standard hover:text-accent-400"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent-400 transition-all duration-300 ease-standard group-hover:w-full" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          {session && <UserMenu session={session} />}
          <a href="#ask" className="hidden text-xs font-semibold uppercase tracking-widest2 text-accent-400 md:inline-block">
            Ask Database →
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-ink-700 bg-ink-800 md:hidden"
          >
            <span className={`h-px w-4 bg-ink-200 transition-transform duration-300 ease-standard ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-ink-200 transition-transform duration-300 ease-standard ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="animate-scale-in border-t border-ink-800 bg-ink-950/95 backdrop-blur-md md:hidden">
          <ul className="section flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-widest2 text-ink-300 transition-colors duration-150 hover:bg-ink-900 hover:text-accent-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#ask"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-widest2 text-accent-400 transition-colors duration-150 hover:bg-ink-900"
             >
                Ask Database →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
