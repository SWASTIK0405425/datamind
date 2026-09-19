"use client";

import { useState } from "react";

export function SQLViewer({ sql, explanation }: { sql: string; explanation?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — fail silently,
      // the SQL is still visible and selectable for manual copy.
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-ink-800 bg-ink-950">
      <div className="flex items-center justify-between border-b border-ink-800 bg-ink-900/50 px-5 py-3">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest2 text-ink-400">
          {/* Database glyph */}
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent-400" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <ellipse cx="12" cy="5" rx="8" ry="3" />
            <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
            <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
          </svg>
          Generated SQL
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest2 transition-all duration-300 ease-standard ${
            copied
              ? "border-accent-500/60 bg-accent-500/10 text-accent-300"
              : "border-ink-700 text-ink-300 hover:border-accent-400 hover:text-accent-400"
          }`}
        >
          {copied ? (
            <>
              {/* Check mark */}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Copied
            </>
          ) : (
            <>
              {/* Copy glyph */}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="9" y="9" width="12" height="12" rx="2" />
                <path d="M5 15V5a2 2 0 012-2h10" strokeLinecap="round" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="scroll-thin overflow-x-auto px-5 py-4 text-sm leading-relaxed">
        <code className="font-mono text-accent-300">{sql}</code>
      </pre>
      {explanation ? (
        <p className="border-t border-ink-800 px-5 py-3 text-sm leading-relaxed text-ink-400">
          {explanation}
        </p>
      ) : null}
    </div>
  );
}
