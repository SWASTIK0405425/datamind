"use client";

import { askDatabase } from "@/lib/ask-bridge";
import { Reveal } from "@/components/Reveal";

const CHART_EXAMPLES = [
  { label: "Pie", q: "Show me a pie chart of employees by department" },
  { label: "Bar", q: "Compare average salary across departments as a bar chart" },
  { label: "Line", q: "Plot hiring over the last five years" },
];

const ILLUSTRATIVE_BARS = [38, 62, 44, 80, 56, 70];

export function VisualizationSection({ onSelect = askDatabase }: { onSelect?: (q: string) => void }) {
  return (
    <section className="border-t border-ink-800 bg-ink-950 py-28">
      <div className="section grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <p className="eyebrow mb-4">From answers to insight</p>
          <h2 className="font-display text-3xl text-ink-100 sm:text-4xl">
            DataMind chooses the chart. You never have to.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-400">
            When a question implies a comparison, a distribution, or a trend,
            DataMind inspects the real returned columns and automatically
            renders a bar, line, or pie chart — built strictly from your
            database&apos;s own results.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {CHART_EXAMPLES.map((c) => (
              <button
                key={c.label}
                onClick={() => onSelect?.(c.q)}
                className="rounded-md border border-ink-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest2 text-ink-300 transition-all duration-300 ease-standard hover:border-accent-400 hover:text-accent-400"
              >
                {c.label} — “{c.q}”
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="surface-card p-8">
            <div className="flex items-end gap-3">
              {ILLUSTRATIVE_BARS.map((h, i) => (
                <div key={i} className="w-full">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-accent-600/80 to-accent-400/90 transition-all duration-500 ease-standard hover:from-accent-500 hover:to-accent-300"
                    style={{ height: `${h * 2}px`, transitionDelay: `${i * 40}ms` }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-widest2 text-ink-500">
              Illustrative only — real charts render from your query results.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="relative border-t border-ink-800 bg-ink-900 py-28 text-center">
      {/* Soft glow behind the CTA */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/8 blur-[100px]" />
      <div className="section relative z-10">
        <Reveal>
          <p className="eyebrow mb-4">Ready when you are</p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl text-ink-100 sm:text-4xl">
            Your database already has the answers.
            <br />
            <span className="italic bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent">
              Ask the question.
            </span>
          </h2>
          <a href="#ask" className="btn-primary mt-10 inline-flex group">
            Try DataMind
            <span className="inline-block transition-transform duration-300 ease-standard group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950 py-10">
      <div className="section flex flex-col items-center justify-between gap-4 text-xs text-ink-500 sm:flex-row">
        <span className="font-display italic text-ink-300">DataMind</span>
        <span>Powered by your database. Not fabricated answers.</span>
        <span>© {new Date().getFullYear()} DataMind</span>
      </div>
    </footer>
  );
}
