import Link from "next/link";
import {
  RepoIcon,
  IssueOpenedIcon,
  GitPullRequestIcon,
  TagIcon,
  PlayIcon,
  GitCommitIcon,
  GraphIcon,
  PeopleIcon,
  UploadIcon,
  ZapIcon,
  ChecklistIcon,
  GlobeIcon,
} from "@primer/octicons-react";
import { CaseRepoPreview } from "@/components/case-repo-preview";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(56,139,253,0.18), transparent 60%), radial-gradient(ellipse at bottom right, rgba(163,113,247,0.12), transparent 50%), radial-gradient(ellipse at bottom left, rgba(63,185,80,0.10), transparent 50%)",
          }}
        />

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
            style={{
              borderColor: "var(--gh-border-default)",
              background: "var(--gh-canvas-subtle)",
              color: "var(--gh-fg-muted)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--gh-success-fg)" }}
            />
            Live at Build for the Border · NYC · May 9, 2026
          </div>

          <h1 className="mt-6 text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            GitHub for{" "}
            <span className="bg-gradient-to-r from-[#3fb950] via-[#2f81f7] to-[#a371f7] bg-clip-text text-transparent">
              Immigration
            </span>
            .
          </h1>
          <p
            className="mt-6 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            Every immigration journey is a repo. Every missing artifact is an
            issue. Every helper review is a pull request. Every milestone is a
            release. Every approved case can pay it forward.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Link href="/new" className="gh-btn gh-btn-primary">
              <RepoIcon size={16} />
              Create your case repository
            </Link>
            <Link href="/panforrest/eb1a-2026" className="gh-btn">
              <PlayIcon size={16} />
              See demo case
            </Link>
          </div>

          <p
            className="mt-6 text-xs"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            Private by default · Powered by Featherless.ai · Tavily · Alai
          </p>
        </div>

        {/* Case Repo mockup */}
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <CaseRepoPreview />
        </div>
      </section>

      {/* THE MAPPING */}
      <section
        className="border-t"
        style={{ borderColor: "var(--gh-border-muted)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--gh-accent-fg)" }}
            >
              The mapping
            </p>
            <h2 className="mt-3 text-3xl lg:text-5xl font-semibold tracking-tight">
              The whole app speaks fluent GitHub.
            </h2>
            <p
              className="mt-4 text-lg"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              Engineers ship code with version control, code review, CI, and
              release notes. Immigrants ship the most consequential project of
              their lives with none of that. We brought it.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <MapCard
              icon={<RepoIcon size={20} />}
              gh="Repository"
              ih="A Case"
              detail="One per visa journey · panforrest/eb1a-2026"
              color="var(--gh-accent-fg)"
            />
            <MapCard
              icon={<IssueOpenedIcon size={20} />}
              gh="Issues"
              ih="Missing artifacts"
              detail="Gaps, blockers, evidence to collect"
              color="var(--gh-success-fg)"
            />
            <MapCard
              icon={<GitPullRequestIcon size={20} />}
              gh="Pull requests"
              ih="Mentor reviews"
              detail="Lawyer / friend feedback on letter drafts"
              color="var(--gh-done-fg)"
            />
            <MapCard
              icon={<GitCommitIcon size={20} />}
              gh="Commits"
              ih="Document updates"
              detail="Every upload or revision is a commit"
              color="var(--gh-fg-muted)"
            />
            <MapCard
              icon={<TagIcon size={20} />}
              gh="Releases"
              ih="Milestones"
              detail="PERM Filed · I-140 Approved · AOS Submitted"
              color="var(--gh-attention-fg)"
            />
            <MapCard
              icon={<PeopleIcon size={20} />}
              gh="Contributors"
              ih="Recommenders"
              detail="Lawyer · mentor · employer rep · references"
              color="var(--gh-accent-fg)"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        className="border-t"
        style={{ borderColor: "var(--gh-border-muted)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--gh-success-fg)" }}
            >
              How it works
            </p>
            <h2 className="mt-3 text-3xl lg:text-5xl font-semibold tracking-tight">
              From messy inbox to a structured case in 60 seconds.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <StepCard
              num="01"
              icon={<UploadIcon size={20} />}
              title="Drop in your story"
              body="Resume, offer letter, LinkedIn, GitHub, publications. We accept the chaos — Featherless.ai turns it into structure."
            />
            <StepCard
              num="02"
              icon={<ZapIcon size={20} />}
              title="AI builds your Case Repo"
              body="A README of your visa strategy, Issues for every gap, Releases for every milestone, an Evidence Graph mapping artifacts to USCIS criteria."
            />
            <StepCard
              num="03"
              icon={<GraphIcon size={20} />}
              title="Track, collaborate, pay it forward"
              body="Tavily pulls live USCIS data. Mentors review your drafts as PRs. When you're approved, optionally contribute your anonymized playbook back."
            />
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section
        className="border-t"
        style={{ borderColor: "var(--gh-border-muted)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--gh-done-fg)" }}
            >
              What you get
            </p>
            <h2 className="mt-3 text-3xl lg:text-5xl font-semibold tracking-tight">
              The infrastructure your case deserves.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <FeatureCard
              icon={<ChecklistIcon size={20} />}
              title="Readiness Score"
              body="0–100 score with per-criterion breakdown. Tells you exactly what to do next to reach 80."
            />
            <FeatureCard
              icon={<GraphIcon size={20} />}
              title="Evidence Graph"
              body="Interactive canvas mapping every artifact to every USCIS criterion. Gaps glow red."
            />
            <FeatureCard
              icon={<GlobeIcon size={20} />}
              title="Tavily Research feed"
              body="Live USCIS processing times, RFE patterns, employer H-1B history, latest policy news."
            />
            <FeatureCard
              icon={<PeopleIcon size={20} />}
              title="Open-source playbooks"
              body="Browse approved cases anonymized by visa type and profession. Fork the template that fits."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t"
        style={{ borderColor: "var(--gh-border-muted)" }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight">
            Your case deserves{" "}
            <span className="bg-gradient-to-r from-[#3fb950] via-[#2f81f7] to-[#a371f7] bg-clip-text text-transparent">
              version control
            </span>
            .
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            Spin up your repo. Upload one resume. Watch your visa strategy
            assemble itself.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/new" className="gh-btn gh-btn-primary">
              <RepoIcon size={16} />
              Create your case repository
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function MapCard({
  icon,
  gh,
  ih,
  detail,
  color,
}: {
  icon: React.ReactNode;
  gh: string;
  ih: string;
  detail: string;
  color: string;
}) {
  return (
    <div
      className="rounded-md border p-5 transition-colors hover:border-[var(--gh-fg-subtle)]"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-subtle)",
      }}
    >
      <div className="flex items-center gap-2" style={{ color }}>
        {icon}
        <span
          className="text-xs uppercase tracking-wider font-semibold"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          {gh}
        </span>
      </div>
      <div className="mt-3 text-xl font-semibold">{ih}</div>
      <p className="mt-1 text-sm" style={{ color: "var(--gh-fg-muted)" }}>
        {detail}
      </p>
    </div>
  );
}

function StepCard({
  num,
  icon,
  title,
  body,
}: {
  num: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div
      className="relative rounded-md border p-6"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-subtle)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-xs"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          {num}
        </span>
        <span style={{ color: "var(--gh-accent-fg)" }}>{icon}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm" style={{ color: "var(--gh-fg-muted)" }}>
        {body}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div
      className="rounded-md border p-6"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-subtle)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: "var(--gh-accent-fg)" }}>{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm" style={{ color: "var(--gh-fg-muted)" }}>
        {body}
      </p>
    </div>
  );
}
