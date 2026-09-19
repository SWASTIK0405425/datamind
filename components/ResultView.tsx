"use client";

import { useEffect, useState } from "react";
import { ResultTable } from "@/components/ResultTable";
import { ChartRenderer } from "@/components/ChartRenderer";
import { resultToCsv, downloadTextFile, csvFileNameFor } from "@/lib/csv";
import type { QueryResult } from "@/types/query";
import type { ChartType, VisualizationConfig } from "@/types/visualization";
import type { UserRole } from "@/types/auth";

const CHART_LABELS: Record<ChartType, string> = {
  bar: "Bar",
  line: "Line",
  pie: "Pie",
};

type ActiveView = "table" | ChartType;

export function ResultView({
  result,
  visualizations,
  isWrite,
  question,
  role,
}: {
  result: QueryResult;
  visualizations: VisualizationConfig[];
  isWrite?: boolean;
  question: string;
  role: UserRole | null;
}) {
  const [activeView, setActiveView] = useState<ActiveView>("table");

  // A fresh result (new question, or a confirmed write) always opens on the
  // table first — charts are things the user opts into via the buttons
  // below, not something sprung on them automatically.
  useEffect(() => {
    setActiveView("table");
  }, [result]);

  const canDownload = role === "admin" && result.rowCount > 0;

  function handleDownload() {
    const csv = resultToCsv(result);
    downloadTextFile(csvFileNameFor(question), csv);
  }

  const activeConfig =
    activeView === "table" ? null : visualizations.find((v) => v.chartType === activeView) ?? null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Result view">
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "table"}
            onClick={() => setActiveView("table")}
            className={`rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest2 transition-all duration-300 ease-standard ${
              activeView === "table"
                ? "border-accent-400 bg-accent-500/10 text-accent-400 shadow-glow-sm"
                : "border-ink-700 text-ink-400 hover:text-ink-100 hover:border-ink-500"
            }`}
          >
            Table
          </button>
          {visualizations.map((v) => (
            <button
              key={v.chartType}
              type="button"
              role="tab"
              aria-selected={activeView === v.chartType}
              onClick={() => v.chartType && setActiveView(v.chartType)}
              className={`rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest2 transition-all duration-300 ease-standard ${
                activeView === v.chartType
                  ? "border-accent-400 bg-accent-500/10 text-accent-400 shadow-glow-sm"
                  : "border-ink-700 text-ink-400 hover:text-ink-100 hover:border-ink-500"
              }`}
            >
              {v.chartType ? CHART_LABELS[v.chartType] : ""}
            </button>
          ))}
        </div>

        {canDownload && (
          <button
            type="button"
            onClick={handleDownload}
            className="group flex items-center gap-2 rounded-md border border-ink-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest2 text-ink-300 transition-all duration-300 ease-standard hover:border-accent-400 hover:text-accent-400"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 ease-standard group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download CSV
          </button>
        )}
      </view-switch>
    </div>
  );
}
