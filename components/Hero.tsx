export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-ink-950">
      {/* Background: a restrained data-grid motif standing in for the reference's large photographic imagery */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute -bottom-64 left-[-15%] h-[480px] w-[480px] rounded-full bg-accent-600/8 blur-[120px]" />
        {/* Soft radial vignette to anchor the heading area */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/70" />
      </div>

      <div className="section relative z-10 py-40">
        <p className="eyebrow animate-fade-up mb-6">Question → Query → Data → Insight</p>
        <h1 className="animate-fade-up max-w-4xl font-display text-5xl leading-[1.05] text-ink-100 sm:text-6xl md:text-7xl">
          Ask your database
          <br />
          <span className="italic bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent">
            in plain English.
          </span>
        </h1>
        <p
          className="animate-fade-up mt-8 max-w-xl text-lg leading-relaxed text-ink-300"
          style={{ animationDelay: "0.1s" }}
        >
          Turn natural-language questions into real PostgreSQL queries and get
          answers directly from your database — not fabricated ones.
        </p>
        <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.2s" }}>
          <a
            href="#ask"
            className="btn-primary group"
          >
            Ask Database
            <span className="inline-block transition-transform duration-300 ease-standard group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </a>
          <a href="#how-it-works" className="btn-ghost">
            How It Works
          </a>
        </div>
        <p className="animate-fade-up mt-14 text-xs uppercase tracking-widest2 text-ink-500" style={{ animationDelay: "0.3s" }}>
          Your database is the source of truth.
        </p>
      </div>

      {/* Scroll hint — a gentle, constant slow pulse at the bottom of the hero */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent-400/60 to-transparent" />
      </div>
    </section>
  );
}
