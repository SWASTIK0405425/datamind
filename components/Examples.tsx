"use client";

import { askDatabase } from "@/lib/ask-bridge";
import { Reveal } from "@/components/Reveal";

const EXAMPLES = [
  {
    title: "Second-Highest Salary",
    body: "Ranking and windowed comparisons within a department.",
    q: "In finance, who earns the second highest salary?",
  },
  {
    title: "Multi-Department Employees",
    body: "Detecting employees allocated across more than one department.",
    q: "Who is working in more than one department?",
  },
  {
    title: "Manager Hierarchies",
    body: "Recursive traversal of direct and indirect reports.",
    q: "Which managers have 50 or more employees under them, direct or indirect?",
  },
  {
    title: "Department Headcount",
    body: "Grouped counts across the organization.",
    q: "How many people work in each department?",
  },
  {
    title: "City Distribution",
    body: "Geographic aggregation from employee addresses.",
    q: "Which city has the most employees?",
  },
];

export function Examples({ onSelect = askDatabase }: { onSelect?: (q: string) => void }) {
  return (
    <section id="examples" className="border-t border-ink-800 bg-ink-900 py-28">
      <div className="section">
        <Reveal>
          <p className="eyebrow mb-4">Capabilities</p>
          <h2 className="max-w-2xl font-display text-3xl text-ink-100 sm:text-4xl">
            Built for real organizational questions.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((ex, i) => (
            <Reveal key={ex.title} delay={i * 70} className="h-full">
              <button
                onClick={() => onSelect?.(ex.q)}
                className="group flex h-full w-full flex-col items-start rounded-lg border border-ink-800 bg-ink-950 p-7 text-left transition-all duration-300 ease-standard hover:-translate-y-1 hover:border-accent-500/60 hover:shadow-lift"
              >
                <span className="text-[11px] font-semibold uppercase tracking-widest2 text-accent-400">
                  {ex.title}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{ex.body}</p>
                <span className="mt-5 text-sm text-ink-300 transition-colors duration-300 ease-standard group-hover:text-ink-100">
                  “{ex.q}”
                </span>
                {/* Arrow that slides in on hover */}
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest2 text-accent-400 opacity-0 transition-all duration-300 ease-standard group-hover:opacity-100">
                  Ask this
                  <span className="transition-transform duration-300 ease-standard group-hover:translate-x-0.5" aria-hidden="true">→</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
