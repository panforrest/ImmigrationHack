"use client";

import {
  TagIcon,
  GearIcon,
  LawIcon,
  ZapIcon,
  StarIcon,
} from "@primer/octicons-react";
import { useCase } from "@/lib/case-context";
import { VISA_LABELS } from "@/lib/visa-templates";

export function RepoSidebar() {
  const c = useCase();
  const score = c.readinessScore;
  const scoreColor =
    score >= 70
      ? "var(--gh-success-fg)"
      : score >= 40
      ? "var(--gh-attention-fg)"
      : "var(--gh-danger-fg)";

  const top3Releases = c.releases.slice(0, 3);

  return (
    <aside className="space-y-6 text-sm">
      {/* About */}
      <Section title="About" action={<GearIcon size={14} />}>
        <p style={{ color: "var(--gh-fg-default)" }}>{c.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {c.topics.map((t) => (
            <a
              key={t}
              className="rounded-full px-2 py-0.5 text-xs font-medium hover:opacity-80"
              style={{
                background: "var(--gh-accent-subtle)",
                color: "var(--gh-accent-fg)",
              }}
            >
              {t}
            </a>
          ))}
        </div>
        <ul
          className="mt-4 space-y-1.5 text-xs"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          <li className="flex items-center gap-2">
            <LawIcon size={14} className="opacity-60" />
            <span>{VISA_LABELS[c.visa]}</span>
          </li>
          <li className="flex items-center gap-2">
            <StarIcon size={14} className="opacity-60" />
            <span>248 stars · 12 forks</span>
          </li>
          <li className="flex items-center gap-2">
            <ZapIcon size={14} className="opacity-60" />
            <span>{c.commits.length} commits</span>
          </li>
        </ul>
      </Section>

      {/* Readiness Score */}
      <Section title="Readiness Score">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-5xl font-semibold"
            style={{ color: scoreColor }}
          >
            {score}
          </span>
          <span
            className="text-lg"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            / 100
          </span>
        </div>
        <div
          className="mt-3 h-2 rounded-full overflow-hidden"
          style={{ background: "var(--gh-border-muted)" }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${score}%`,
              background:
                "linear-gradient(90deg, var(--gh-danger-fg), var(--gh-attention-fg), var(--gh-success-fg))",
            }}
          />
        </div>
        <p
          className="mt-3 text-xs leading-relaxed"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          {c.readinessAdvice}
        </p>
      </Section>

      {/* Releases */}
      <Section title={`Releases · ${c.releases.length}`}>
        <ul className="space-y-2">
          {top3Releases.map((r) => (
            <li key={r.tag} className="flex items-center gap-2 text-xs">
              <TagIcon size={12} className="opacity-60" />
              <a className="gh-link flex-1 truncate font-mono">{r.tag}</a>
              {r.isLatest && (
                <span
                  className="rounded-full px-1.5 text-[10px] font-semibold"
                  style={{
                    background: "var(--gh-success-subtle)",
                    color: "var(--gh-success-fg)",
                  }}
                >
                  Latest
                </span>
              )}
            </li>
          ))}
        </ul>
        {c.releases.length > 3 && (
          <a
            className="mt-3 block text-xs gh-link"
            href={`/${c.owner}/${c.name}/releases`}
          >
            + {c.releases.length - 3} more releases
          </a>
        )}
      </Section>

      {/* Contributors */}
      <Section title="Contributors · 6">
        <div className="flex flex-wrap gap-1.5">
          {[
            { i: "FP", grad: "from-[#238636] to-[#2f81f7]" },
            { i: "CL", grad: "from-[#1f6feb] to-[#a371f7]" },
            { i: "AS", grad: "from-[#3fb950] to-[#1f6feb]" },
            { i: "JK", grad: "from-[#a371f7] to-[#f85149]" },
            { i: "MM", grad: "from-[#d29922] to-[#3fb950]" },
            { i: "DR", grad: "from-[#1f6feb] to-[#3fb950]" },
          ].map((p) => (
            <span
              key={p.i}
              className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${p.grad} text-[10px] font-semibold text-white`}
            >
              {p.i}
            </span>
          ))}
        </div>
        <p
          className="mt-3 text-xs"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          You · 1 lawyer · 4 mentors / recommenders
        </p>
      </Section>

      {/* Languages-style criteria coverage */}
      <Section title="Criteria coverage">
        <CriteriaBar c={c} />
        <ul
          className="mt-3 grid grid-cols-1 gap-1 text-xs"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          {c.criteria.slice(0, 5).map((cr) => {
            const color =
              cr.score >= 70
                ? "var(--gh-success-fg)"
                : cr.score >= 40
                ? "var(--gh-attention-fg)"
                : "var(--gh-danger-fg)";
            return (
              <li key={cr.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: color }}
                />
                <span className="flex-1 truncate">{cr.label}</span>
                <span className="font-mono text-[10px]" style={{ color }}>
                  {cr.score}%
                </span>
              </li>
            );
          })}
        </ul>
      </Section>
    </aside>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header
        className="flex items-center justify-between mb-2 text-xs uppercase tracking-wider font-semibold"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        <span>{title}</span>
        {action && (
          <button className="opacity-60 hover:opacity-100" type="button">
            {action}
          </button>
        )}
      </header>
      {children}
    </section>
  );
}

function CriteriaBar({ c }: { c: ReturnType<typeof useCase> }) {
  const total = c.criteria.reduce((a, x) => a + x.score, 0) || 1;
  return (
    <div
      className="flex h-2 rounded-full overflow-hidden"
      style={{ background: "var(--gh-border-muted)" }}
    >
      {c.criteria.slice(0, 5).map((cr) => {
        const pct = (cr.score / total) * 100;
        const color =
          cr.score >= 70
            ? "var(--gh-success-fg)"
            : cr.score >= 40
            ? "var(--gh-attention-fg)"
            : "var(--gh-danger-fg)";
        return (
          <div
            key={cr.id}
            style={{ width: `${pct}%`, background: color }}
            title={`${cr.label} · ${cr.score}%`}
          />
        );
      })}
    </div>
  );
}
