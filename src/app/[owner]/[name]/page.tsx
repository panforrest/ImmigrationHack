import Link from "next/link";
import { RepoIcon, ZapIcon } from "@primer/octicons-react";

export default async function CaseRepoPlaceholder({
  params,
}: {
  params: Promise<{ owner: string; name: string }>;
}) {
  const { owner, name } = await params;

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <div
        className="inline-flex items-center gap-2 text-base font-mono"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        <RepoIcon size={16} />
        <span className="gh-link font-semibold">{owner}</span>
        <span>/</span>
        <span
          className="font-semibold"
          style={{ color: "var(--gh-accent-fg)" }}
        >
          {name}
        </span>
      </div>

      <h1 className="mt-6 text-3xl lg:text-4xl font-semibold tracking-tight">
        Case repository created.
      </h1>
      <p
        className="mt-4 text-lg"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        Next step: AI generates your visa strategy, gaps, milestones, and
        evidence graph from your inputs.
      </p>

      <div
        className="mt-10 rounded-md border p-6 text-left"
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
          <span className="font-semibold">Step 4 — Featherless.ai</span>
        </div>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          The full Case Repo workspace (README, Issues, Pull requests, Releases,
          Evidence Graph, Research, Chat) ships in Step 5. We&apos;re wiring up
          AI case generation next.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href="/" className="gh-btn">
          Back to home
        </Link>
        <Link href="/new" className="gh-btn">
          Create another
        </Link>
      </div>
    </div>
  );
}
