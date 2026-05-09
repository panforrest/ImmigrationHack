"use client";

import type { IssueLabel } from "@/lib/types";

const LABEL_STYLES: Record<
  IssueLabel,
  { bg: string; fg: string; border: string }
> = {
  blocker: { bg: "#5a1d1d", fg: "#ff7b72", border: "#f85149" },
  evidence: { bg: "#0c2a4d", fg: "#79c0ff", border: "#1f6feb" },
  "recommendation-letter": {
    bg: "#3d2710",
    fg: "#ffa657",
    border: "#bb8009",
  },
  press: { bg: "#3a1d5a", fg: "#d2a8ff", border: "#8957e5" },
  award: { bg: "#4a3a0d", fg: "#f0d76b", border: "#bb8009" },
  publication: { bg: "#0f3a1a", fg: "#7ee787", border: "#238636" },
  form: { bg: "#262c36", fg: "#8b949e", border: "#30363d" },
  narrative: { bg: "#4d1430", fg: "#ff80ab", border: "#bf3989" },
  "priority-high": { bg: "#5a1d1d", fg: "#ff7b72", border: "#f85149" },
  "priority-low": { bg: "#262c36", fg: "#8b949e", border: "#30363d" },
  "good-first-task": { bg: "#0f3a1a", fg: "#7ee787", border: "#238636" },
};

export function LabelChip({ label }: { label: IssueLabel }) {
  const s = LABEL_STYLES[label] ?? LABEL_STYLES.form;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border whitespace-nowrap"
      style={{
        background: s.bg,
        color: s.fg,
        borderColor: s.border,
      }}
    >
      {label}
    </span>
  );
}
