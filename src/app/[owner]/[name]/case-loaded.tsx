"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  RepoIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  TagIcon,
  ZapIcon,
  CheckCircleFillIcon,
  SparkleFillIcon,
} from "@primer/octicons-react";
import { loadOrSeedDemoCase } from "@/lib/case-store";
import type { Case } from "@/lib/types";
import { VISA_LABELS } from "@/lib/visa-templates";

/**
 * Interim Case page (Step 4):
 * loads the generated Case from localStorage (or seeds a demo) and
 * shows a confirmation summary. The full Case Repo workspace UI
 * (tabs, README, Issues, Releases, Graph) ships in Step 5.
 */
export function CaseLoaded({ owner, name }: { owner: string; name: string }) {
  const [c, setC] = useState<Case | null>(null);

  useEffect(() => {
    const loaded = loadOrSeedDemoCase(owner, name);
    setC(loaded);
  }, [owner, name]);

  if (!c) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p style={{ color: "var(--gh-fg-muted)" }}>Loading case...</p>
      </div>
    );
  }

  const openIssues = c.issues.filter((i) => i.state === "open").length;
  const releases = c.releases.length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div
        className="flex items-center gap-2 text-base font-mono"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        <RepoIcon size={16} />
        <span className="gh-link font-semibold">{c.owner}</span>
        <span>/</span>
        <span
          className="font-semibold"
          style={{ color: "var(--gh-accent-fg)" }}
        >
          {c.name}
        </span>
        <span
          className="ml-2 rounded-full border px-2 py-0.5 text-xs font-medium font-sans"
          style={{
            borderColor: "var(--gh-border-default)",
            color: "var(--gh-fg-muted)",
          }}
        >
          {c.visibility === "public" ? "Public" : "Private"}
        </span>
      </div>

      <div
        className="mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
        style={{
          borderColor: "var(--gh-success-fg)",
          background: "var(--gh-success-subtle)",
          color: "var(--gh-success-fg)",
        }}
      >
        <CheckCircleFillIcon size={12} />
        Case repository created · {VISA_LABELS[c.visa]} ·{" "}
        {c.source === "ai" ? "AI-generated" : "demo data"}
      </div>

      <h1 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight">
        Your case repo is ready.
      </h1>
      <p
        className="mt-3 text-base"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        {c.description}
      </p>

      {c.source === "mock" && (
        <div
          className="mt-4 inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs"
          style={{
            borderColor: "var(--gh-attention-fg)",
            background: "var(--gh-attention-subtle)",
            color: "var(--gh-attention-fg)",
          }}
        >
          <ZapIcon size={12} />
          Running on mock data — set FEATHERLESS_API_KEY in .env.local for
          live AI generation.
        </div>
      )}

      {/* Stat grid */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat
          icon={<SparkleFillIcon size={16} />}
          label="Readiness"
          value={`${c.readinessScore} / 100`}
          color="var(--gh-attention-fg)"
        />
        <Stat
          icon={<IssueOpenedIcon size={16} />}
          label="Open issues"
          value={String(openIssues)}
          color="var(--gh-success-fg)"
        />
        <Stat
          icon={<GitPullRequestIcon size={16} />}
          label="Criteria"
          value={String(c.criteria.length)}
          color="var(--gh-done-fg)"
        />
        <Stat
          icon={<TagIcon size={16} />}
          label="Releases"
          value={String(releases)}
          color="var(--gh-accent-fg)"
        />
      </div>

      {/* Sample sections */}
      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <Section title="Top open issues">
          <ul className="space-y-2 text-sm">
            {c.issues
              .filter((i) => i.state === "open")
              .slice(0, 5)
              .map((i) => (
                <li
                  key={i.number}
                  className="flex items-start gap-2 rounded-md border p-3"
                  style={{
                    borderColor: "var(--gh-border-default)",
                    background: "var(--gh-canvas-default)",
                  }}
                >
                  <span
                    style={{ color: "var(--gh-success-fg)" }}
                    className="mt-0.5"
                  >
                    <IssueOpenedIcon size={14} />
                  </span>
                  <div>
                    <div className="font-semibold">
                      <span style={{ color: "var(--gh-fg-muted)" }}>
                        #{i.number}
                      </span>{" "}
                      {i.title}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {i.labels.slice(0, 3).map((l) => (
                        <span
                          key={l}
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            background: "var(--gh-accent-subtle)",
                            color: "var(--gh-accent-fg)",
                          }}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </Section>

        <Section title="Criteria coverage">
          <ul className="space-y-2 text-sm">
            {c.criteria.slice(0, 6).map((cr) => {
              const color =
                cr.score >= 70
                  ? "var(--gh-success-fg)"
                  : cr.score >= 40
                  ? "var(--gh-attention-fg)"
                  : "var(--gh-danger-fg)";
              return (
                <li key={cr.id} className="flex items-center gap-3">
                  <span
                    className="text-xs flex-1 truncate"
                    style={{ color: "var(--gh-fg-muted)" }}
                  >
                    {cr.label}
                  </span>
                  <div
                    className="h-1.5 w-20 rounded-full overflow-hidden"
                    style={{ background: "var(--gh-border-muted)" }}
                  >
                    <div
                      className="h-full"
                      style={{ width: `${cr.score}%`, background: color }}
                    />
                  </div>
                  <span
                    className="text-xs font-mono w-10 text-right"
                    style={{ color }}
                  >
                    {cr.score}%
                  </span>
                </li>
              );
            })}
          </ul>
        </Section>

        <Section title="Releases">
          <ul className="space-y-2 text-sm">
            {c.releases.map((r) => (
              <li
                key={r.tag}
                className="flex items-center gap-2"
              >
                <TagIcon size={12} className="opacity-60" />
                <span className="font-mono text-xs">{r.tag}</span>
                <span className="flex-1">{r.title}</span>
                {r.isLatest && (
                  <span
                    className="rounded-full px-2 text-[10px] font-semibold"
                    style={{
                      background: "var(--gh-success-subtle)",
                      color: "var(--gh-success-fg)",
                    }}
                  >
                    Latest
                  </span>
                )}
                <span
                  className="text-[10px]"
                  style={{
                    color:
                      r.state === "shipped"
                        ? "var(--gh-success-fg)"
                        : "var(--gh-attention-fg)",
                  }}
                >
                  {r.state}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Topics">
          <div className="flex flex-wrap gap-1.5">
            {c.topics.map((t) => (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  background: "var(--gh-accent-subtle)",
                  color: "var(--gh-accent-fg)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <p
            className="mt-4 text-xs"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            <strong>Advice:</strong> {c.readinessAdvice}
          </p>
        </Section>
      </div>

      <div
        className="mt-10 rounded-md border p-5"
        style={{
          borderColor: "var(--gh-border-default)",
          background: "var(--gh-canvas-subtle)",
        }}
      >
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--gh-attention-fg)" }}
        >
          <ZapIcon size={16} />
          <span className="font-semibold">Next: Step 5</span>
        </div>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          The full GitHub-style Case Repo workspace (header with
          Watch/Star/Fork, full tab navigation, file tree, full README, Issues,
          Pull requests, Releases, Evidence Graph, Research, Chat) ships in the
          next step. The data is already generated — Step 5 just renders it.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Link href="/" className="gh-btn">
          Back to home
        </Link>
        <Link href="/new" className="gh-btn">
          Create another case
        </Link>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="rounded-md border p-3"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-subtle)",
      }}
    >
      <div
        className="flex items-center gap-1.5 text-xs uppercase tracking-wider"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-md border p-5"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-subtle)",
      }}
    >
      <h3
        className="text-xs uppercase tracking-wider font-semibold mb-3"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
