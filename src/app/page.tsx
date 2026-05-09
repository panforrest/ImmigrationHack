import Link from "next/link";
import {
  RepoIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  TagIcon,
  PlayIcon,
} from "@primer/octicons-react";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <section className="text-center">
        <p
          className="text-sm uppercase tracking-[0.2em] mb-6"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          Build for the Border · NYC · May 2026
        </p>
        <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
          GitHub for{" "}
          <span
            className="bg-gradient-to-r from-[#3fb950] via-[#2f81f7] to-[#a371f7] bg-clip-text text-transparent"
          >
            Immigration
          </span>
          .
        </h1>
        <p
          className="mt-6 text-lg lg:text-xl max-w-2xl mx-auto"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          Every immigration journey is a repo. Every missing artifact is an
          issue. Every helper review is a pull request. Every milestone is a
          release.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link href="/new" className="gh-btn gh-btn-primary">
            <RepoIcon size={16} />
            Create your case repository
          </Link>
          <Link href="/explore" className="gh-btn">
            <PlayIcon size={16} />
            See live demo
          </Link>
        </div>

        <p
          className="mt-6 text-xs"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          Private by default · Powered by Featherless.ai · Tavily · Alai
        </p>
      </section>

      {/* Step 1 placeholder for the live Case Repo mockup that lands in Step 5 */}
      <section className="mt-20">
        <div
          className="rounded-md border p-8 text-center"
          style={{
            background: "var(--gh-canvas-subtle)",
            borderColor: "var(--gh-border-default)",
          }}
        >
          <div
            className="inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            <RepoIcon size={16} />
            <span className="font-mono">panforrest</span>
            <span>/</span>
            <span className="font-mono font-semibold text-[var(--gh-accent-fg)]">
              eb1a-2026
            </span>
            <span
              className="ml-2 rounded-full border px-2 text-xs"
              style={{ borderColor: "var(--gh-border-default)" }}
            >
              Public
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <Stat
              icon={<IssueOpenedIcon size={16} />}
              label="Open issues"
              value="8"
              color="var(--gh-success-fg)"
            />
            <Stat
              icon={<GitPullRequestIcon size={16} />}
              label="Pull requests"
              value="3"
              color="var(--gh-done-fg)"
            />
            <Stat
              icon={<TagIcon size={16} />}
              label="Releases"
              value="2"
              color="var(--gh-accent-fg)"
            />
            <Stat
              icon={<PlayIcon size={16} />}
              label="Readiness"
              value="62 / 100"
              color="var(--gh-attention-fg)"
            />
          </div>
          <p
            className="mt-8 text-xs"
            style={{ color: "var(--gh-fg-subtle)" }}
          >
            Case Repo workspace ships in Step 5 — this is a teaser.
          </p>
        </div>
      </section>

      {/* Sponsor strip */}
      <section
        className="mt-20 pt-10 border-t flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm"
        style={{
          borderColor: "var(--gh-border-muted)",
          color: "var(--gh-fg-muted)",
        }}
      >
        <span className="text-xs uppercase tracking-widest">
          Built with sponsor stacks
        </span>
        <span>Featherless.ai</span>
        <span>Tavily</span>
        <span>Alai</span>
        <span>Lovable</span>
        <span>SimpleApply</span>
        <span>JYC Law</span>
      </section>
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
      className="rounded-md border p-4 text-left"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-default)",
      }}
    >
      <div
        className="flex items-center gap-2 text-xs uppercase tracking-wider"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
