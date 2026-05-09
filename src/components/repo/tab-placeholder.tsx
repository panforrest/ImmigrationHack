"use client";

import { ZapIcon } from "@primer/octicons-react";

export function TabPlaceholder({
  step,
  title,
  description,
  icon,
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="rounded-md border p-10 text-center"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-subtle)",
      }}
    >
      <div
        className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-4"
        style={{
          background: "var(--gh-accent-subtle)",
          color: "var(--gh-accent-fg)",
        }}
      >
        {icon}
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p
        className="mt-2 text-sm max-w-md mx-auto"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        {description}
      </p>
      <div
        className="mt-6 inline-flex items-center gap-2 text-xs rounded-full border px-3 py-1"
        style={{
          borderColor: "var(--gh-attention-fg)",
          background: "var(--gh-attention-subtle)",
          color: "var(--gh-attention-fg)",
        }}
      >
        <ZapIcon size={12} />
        Ships in Step {step}
      </div>
    </div>
  );
}
