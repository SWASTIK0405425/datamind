"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { UserRole } from "@/types/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [panel, setPanel] = useState<UserRole>("member");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password, panel }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Could not log in. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setError("Could not reach DataMind. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-6">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -top-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        <div className="mb-10 text-center">
          <a href="/" className="font-display text-2xl italic tracking-tight text-ink-100">
            Data<span className="text-accent-400 not-italic">Mind</span>
          </a>
          <p className="mt-3 text-sm text-ink-400">Sign in to ask your database anything.</p>
        </div>

        <div className="rounded-lg border border-ink-800 bg-ink-900/80 p-8 backdrop-blur-sm shadow-lift">
          <div className="relative mb-8 grid grid-cols-2 rounded-md border border-ink-700 bg-ink-950 p-1">
            {/* Sliding panel indicator */}
            <span
              className="absolute inset-y-1 w-[calc(50%-4px)] rounded-sm bg-accent-500 transition-transform duration-300 ease-standard"
              style={{ transform: panel === "admin" ? "translateX(calc(100% + 8px))" : "translateX(0)" }}
              aria-hidden="true"
            />
            {(["member", "admin"] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setPanel(r)}
                aria-pressed={panel === r}
                className={`relative z-10 rounded-sm px-4 py-2.5 text-xs font-semibold uppercase tracking-widest2 transition-colors duration-300 ease-standard ${
                  panel === r ? "text-ink-950" : "text-ink-400 hover:text-ink-100"
                }`}
              >
                {r === "admin" ? "Admin" : "Member"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-ink-500">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-md border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-ink-100 transition-all duration-300 ease-standard placeholder:text-ink-600 focus:border-accent-400 focus:outline-none focus:shadow-glow-sm"
                placeholder={panel === "admin" ? "admin" : "member"}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-widest2 text-ink-500">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md border border-ink-700 bg-ink-950 px-4 py-3 text-sm text-ink-100 transition-all duration-300 ease-standard placeholder:text-ink-600 focus:border-accent-400 focus:outline-none focus:shadow-glow-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="animate-scale-in rounded-md border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink-800 border-t-transparent" aria-hidden="true" />
                  Signing in…
                </span>
              ) : (
                `Sign in as ${panel === "admin" ? "Admin" : "Member"}`
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-ink-500">
            {panel === "admin"
              ? "Admins can ask DataMind to change data — create, update, or delete records — in addition to querying it."
              : "Members can ask DataMind anything about the data, read-only."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
