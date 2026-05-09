"use client";

import Link from "next/link";
import {
  RepoIcon,
  EyeIcon,
  StarIcon,
  RepoForkedIcon,
  CodeIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  PlayIcon,
  TagIcon,
  GraphIcon,
  GlobeIcon,
  BookIcon,
  DotFillIcon,
} from "@primer/octicons-react";

const DEMO_OWNER = "panforrest";
const DEMO_NAME = "eb1a-2026";
const REPO_BASE = `/${DEMO_OWNER}/${DEMO_NAME}`;

/**
 * CaseRepoPreview — interactive embedded mockup of a Case Repo,
 * styled pixel-faithfully to a github.com repo page.
 * Used on the landing page hero.
 */
export function CaseRepoPreview() {
  return (
    <div
      className="rounded-md border overflow-hidden shadow-2xl"
      style={{
        background: "var(--gh-canvas-default)",
        borderColor: "var(--gh-border-default)",
        boxShadow:
          "0 24px 48px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(56,139,253,0.1)",
      }}
    >
      {/* Repo header bar */}
      <div
        className="px-4 lg:px-6 pt-4 pb-0 border-b"
        style={{ borderColor: "var(--gh-border-muted)" }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-base">
            <RepoIcon size={16} className="opacity-70" />
            <Link href={`/${DEMO_OWNER}`} className="gh-link font-semibold">
              {DEMO_OWNER}
            </Link>
            <span style={{ color: "var(--gh-fg-muted)" }}>/</span>
            <Link href={REPO_BASE} className="gh-link font-semibold">
              {DEMO_NAME}
            </Link>
            <span
              className="ml-2 rounded-full border px-2 py-0.5 text-xs font-medium"
              style={{
                borderColor: "var(--gh-border-default)",
                color: "var(--gh-fg-muted)",
              }}
            >
              Public
            </span>
          </div>

          <div className="flex items-center gap-2">
            <RepoBtn icon={<EyeIcon size={14} />} label="Watch" count="4" />
            <RepoBtn
              icon={<RepoForkedIcon size={14} />}
              label="Fork"
              count="12"
            />
            <RepoBtn icon={<StarIcon size={14} />} label="Star" count="248" />
          </div>
        </div>

        {/* Tab nav */}
        <nav className="mt-4 flex items-center gap-1 overflow-x-auto -mb-px">
          <Tab
            active
            href={REPO_BASE}
            icon={<CodeIcon size={16} />}
            label="Code"
          />
          <Tab
            href={`${REPO_BASE}/issues`}
            icon={<IssueOpenedIcon size={16} />}
            label="Issues"
            count="8"
          />
          <Tab
            href={`${REPO_BASE}/pulls`}
            icon={<GitPullRequestIcon size={16} />}
            label="Pull requests"
            count="3"
          />
          <Tab
            href={`${REPO_BASE}/actions`}
            icon={<PlayIcon size={16} />}
            label="Actions"
          />
          <Tab
            href={`${REPO_BASE}/releases`}
            icon={<TagIcon size={16} />}
            label="Releases"
            count="4"
          />
          <Tab
            href={`${REPO_BASE}/graph`}
            icon={<GraphIcon size={16} />}
            label="Evidence Graph"
          />
          <Tab
            href={`${REPO_BASE}/research`}
            icon={<GlobeIcon size={16} />}
            label="Research"
          />
        </nav>
      </div>

      {/* Body: file tree + README + sidebar */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6 p-4 lg:p-6">
        <div>
          {/* Branch + file list */}
          <div
            className="flex items-center gap-2 text-sm pb-3 border-b"
            style={{ borderColor: "var(--gh-border-muted)" }}
          >
            <span
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-mono"
              style={{ borderColor: "var(--gh-border-default)" }}
            >
              <span style={{ color: "var(--gh-fg-muted)" }}>↳</span>
              main
            </span>
            <span style={{ color: "var(--gh-fg-muted)" }}>· 47 commits</span>
          </div>

          <div className="mt-3 divide-y" style={{ borderColor: "var(--gh-border-muted)" }}>
            <FileRow
              name="evidence/"
              meta="add patent USPTO citations"
              when="2 days ago"
              folder
            />
            <FileRow
              name="letters/"
              meta="recommendation v3 — Prof. Chen"
              when="6 hours ago"
              folder
            />
            <FileRow
              name="forms/"
              meta="i-140 draft updated"
              when="1 day ago"
              folder
            />
            <FileRow
              name="narrative.md"
              meta="strengthen original-contributions section"
              when="3 hours ago"
            />
            <FileRow
              name="README.md"
              meta="auto-generated visa strategy"
              when="just now"
            />
          </div>

          {/* README preview */}
          <div
            className="mt-4 rounded-md border"
            style={{ borderColor: "var(--gh-border-default)" }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 border-b text-sm"
              style={{
                borderColor: "var(--gh-border-muted)",
                background: "var(--gh-canvas-subtle)",
              }}
            >
              <BookIcon size={16} />
              README.md
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-semibold mb-2">
                EB-1A · Forrest Pan · Filing target Q3 2026
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gh-fg-muted)" }}
              >
                Senior ML engineer with 2 patents, 7 publications, 1.2k GitHub
                stars on open-source ML libraries. Strongest on{" "}
                <span style={{ color: "var(--gh-fg-default)" }}>
                  Original Contributions
                </span>{" "}
                and{" "}
                <span style={{ color: "var(--gh-fg-default)" }}>
                  Critical Role
                </span>
                . Gaps:{" "}
                <span style={{ color: "var(--gh-danger-fg)" }}>
                  Press Coverage
                </span>{" "}
                and{" "}
                <span style={{ color: "var(--gh-danger-fg)" }}>Awards</span>.
              </p>
              <h4 className="mt-4 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--gh-fg-muted)" }}>
                EB-1A criteria coverage
              </h4>
              <div className="mt-2 space-y-1.5">
                <CriterionRow label="Original Contributions" pct={85} color="var(--gh-success-fg)" />
                <CriterionRow label="Critical Role" pct={78} color="var(--gh-success-fg)" />
                <CriterionRow label="Authorship / Publications" pct={70} color="var(--gh-success-fg)" />
                <CriterionRow label="Judging" pct={45} color="var(--gh-attention-fg)" />
                <CriterionRow label="Press Coverage" pct={20} color="var(--gh-danger-fg)" />
                <CriterionRow label="Awards" pct={15} color="var(--gh-danger-fg)" />
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-6 text-sm">
          <div>
            <div
              className="flex items-center justify-between mb-2 text-xs uppercase tracking-wider font-semibold"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              About
            </div>
            <p style={{ color: "var(--gh-fg-default)" }}>
              EB-1A petition · ML Engineer · 7 publications · 2 patents · 1.2k
              GitHub stars
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {["#eb1a", "#stem", "#machine-learning", "#open-source"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{
                      background: "var(--gh-accent-subtle)",
                      color: "var(--gh-accent-fg)",
                    }}
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Readiness Score gauge */}
          <div
            className="rounded-md border p-4"
            style={{
              borderColor: "var(--gh-border-default)",
              background: "var(--gh-canvas-subtle)",
            }}
          >
            <div
              className="text-xs uppercase tracking-wider font-semibold mb-2"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              Readiness Score
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-4xl font-semibold"
                style={{ color: "var(--gh-attention-fg)" }}
              >
                62
              </span>
              <span style={{ color: "var(--gh-fg-muted)" }}>/ 100</span>
            </div>
            <div
              className="mt-2 h-1.5 rounded-full overflow-hidden"
              style={{ background: "var(--gh-border-muted)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: "62%",
                  background:
                    "linear-gradient(90deg, var(--gh-success-fg), var(--gh-attention-fg))",
                }}
              />
            </div>
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              Add 1 awards entry + 2 press articles to reach 80.
            </p>
          </div>

          <div>
            <div
              className="flex items-center justify-between mb-2 text-xs uppercase tracking-wider font-semibold"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              Releases
            </div>
            <div className="space-y-1.5">
              <ReleaseRow tag="v0.4 · I-140 Filed" latest />
              <ReleaseRow tag="v0.3 · Letters Collected" />
              <ReleaseRow tag="v0.2 · Evidence Mapped" />
              <ReleaseRow tag="v0.1 · Case Initialized" />
            </div>
          </div>

          <div>
            <div
              className="flex items-center justify-between mb-2 text-xs uppercase tracking-wider font-semibold"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              Contributors · 6
            </div>
            <div className="flex flex-wrap gap-1">
              {[
                "FP",
                "CL",
                "AS",
                "JK",
                "MM",
                "DR",
              ].map((init, i) => (
                <span
                  key={init + i}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                  style={{
                    background:
                      i % 2
                        ? "linear-gradient(135deg, #1f6feb, #a371f7)"
                        : "linear-gradient(135deg, #238636, #2f81f7)",
                  }}
                >
                  {init}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function RepoBtn({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count: string;
}) {
  return (
    <div className="flex items-stretch text-xs">
      <button
        className="flex items-center gap-1 rounded-l-md border border-r-0 px-2 py-1 hover:bg-[var(--gh-canvas-subtle)]"
        style={{ borderColor: "var(--gh-border-default)" }}
      >
        {icon}
        <span className="font-semibold">{label}</span>
      </button>
      <span
        className="flex items-center rounded-r-md border px-2 py-1 font-semibold"
        style={{
          borderColor: "var(--gh-border-default)",
          background: "var(--gh-canvas-subtle)",
        }}
      >
        {count}
      </span>
    </div>
  );
}

function Tab({
  href,
  icon,
  label,
  count,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  count?: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm border-b-2 whitespace-nowrap rounded-t hover:bg-[var(--gh-canvas-subtle)]"
      style={{
        borderBottomColor: active ? "var(--gh-attention-fg)" : "transparent",
        color: active ? "var(--gh-fg-default)" : "var(--gh-fg-muted)",
        fontWeight: active ? 600 : 400,
      }}
    >
      <span className="opacity-70">{icon}</span>
      {label}
      {count && (
        <span
          className="rounded-full px-1.5 text-[11px] font-semibold"
          style={{
            background: "var(--gh-neutral-muted)",
            color: "var(--gh-fg-default)",
          }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function FileRow({
  name,
  meta,
  when,
  folder,
}: {
  name: string;
  meta: string;
  when: string;
  folder?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-2 px-2 text-sm hover:bg-[var(--gh-canvas-subtle)] rounded">
      <span style={{ color: folder ? "var(--gh-accent-fg)" : "var(--gh-fg-muted)" }}>
        {folder ? "📁" : "📄"}
      </span>
      <span className="font-medium">{name}</span>
      <span
        className="flex-1 truncate"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        {meta}
      </span>
      <span
        className="text-xs whitespace-nowrap"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        {when}
      </span>
    </div>
  );
}

function CriterionRow({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs flex-1" style={{ color: "var(--gh-fg-muted)" }}>
        {label}
      </span>
      <div
        className="h-1.5 w-24 rounded-full overflow-hidden"
        style={{ background: "var(--gh-border-muted)" }}
      >
        <div
          className="h-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-xs font-mono w-8 text-right"
        style={{ color }}
      >
        {pct}%
      </span>
    </div>
  );
}

function ReleaseRow({ tag, latest }: { tag: string; latest?: boolean }) {
  return (
    <Link
      href={`${REPO_BASE}/releases`}
      className="flex items-center gap-2 text-xs"
    >
      <TagIcon size={12} className="opacity-60" />
      <span className="gh-link flex-1 truncate">{tag}</span>
      {latest && (
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
    </Link>
  );
}

export function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ background: color }}
      />
      <DotFillIcon size={0} />
    </span>
  );
}
