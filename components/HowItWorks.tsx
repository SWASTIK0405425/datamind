"use client";

import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Ask",
    body: "Type a plain-English question about the employee database — no SQL required.",
  },
  {
    n: "02",
    title: "Generate",
    body: "Groq routes your question to openai/gpt-oss-120b, which drafts a single read-only PostgreSQL query against the verified schema.",
  },
  {
    n: "03",
    title: "Query",
    body: "The generated SQL is independently validated, then executed against your real Supabase PostgreSQL database.",
  },
  {
    n: "04",
    title: "Understand",
    body: "The real rows come back. DataMind shows the SQL, the data, and — when it fits — a chart built strictly from that data.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-ink-800 bg-ink-900 py-28">
      <div className="section">
        <Reveal>
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="max-w-2xl font-display text-3xl text-ink-100 sm:text-4xl">
            Four steps between your question and a real answer.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 90} className="h-full">
              <div className="group h-full bg-ink-900 p-8 transition-colors duration-300 ease-standard hover:bg-ink-900/80">
                <span className="font-display text-3xl italic text-accent-400 transition-transform duration-300 ease-spring group-hover:scale-110 inline-block origin-top-left">
                  {step.n}
                </span>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-widest2 text-ink-100">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
