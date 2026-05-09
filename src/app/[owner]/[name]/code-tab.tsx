"use client";

import {
  HistoryIcon,
  CodeIcon,
  GitBranchIcon,
  TriangleDownIcon,
  BookIcon,
  FileDirectoryIcon,
  FileIcon,
  ZapIcon,
} from "@primer/octicons-react";
import { useCase } from "@/lib/case-context";
import type { CaseEvidence } from "@/lib/types";

/**
 * Code tab — the default landing view for a Case Repo.
 * GitHub-faithful: branch picker, file tree grouped by folder,
 * latest commit row, README preview block.
 *
 * Step 6 will replace the README placeholder with full markdown rendering.
 */
export function CodeTab() {
  const c = useCase();
  const latestCommit = c.commits[0];

  // Build a virtual file tree from evidence + a few fixed files.
  const folders = ["evidence", "letters", "forms", "narrative"] as const;
  const filesByFolder: Record<string, CaseEvidence[]> = {};
  folders.forEach((f) => {
    filesByFolder[f] = c.evidence.filter((e) => e.folder === f);
  });

  return (
    <div className="space-y-4">
      {/* Branch + clone bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            className="gh-btn flex items-center gap-1 text-sm"
            style={{ borderColor: "var(--gh-border-default)" }}
          >
            <GitBranchIcon size={14} />
            <span className="font-semibold">main</span>
            <TriangleDownIcon size={12} className="opacity-60" />
          </button>
          <span
            className="text-xs"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            <span className="font-semibold">1</span> Branch
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            <span className="font-semibold">{c.releases.length}</span> Tags
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="gh-btn text-sm flex items-center gap-1">
            <HistoryIcon size={14} />
            History
          </button>
          <button className="gh-btn gh-btn-primary text-sm flex items-center gap-1">
            <CodeIcon size={14} />
            <span>Code</span>
            <TriangleDownIcon size={12} />
          </button>
        </div>
      </div>

      {/* Latest commit row */}
      {latestCommit && (
        <div
          className="flex items-center gap-3 rounded-t-md border px-4 py-2 text-sm"
          style={{
            borderColor: "var(--gh-border-default)",
            background: "var(--gh-canvas-subtle)",
          }}
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold text-white bg-gradient-to-br from-[#238636] to-[#2f81f7]"
            aria-hidden
          >
            {latestCommit.author.slice(0, 2).toUpperCase()}
          </span>
          <span className="font-mono" style={{ color: "var(--gh-fg-muted)" }}>
            {latestCommit.author}
          </span>
          <span className="flex-1 truncate">{latestCommit.message}</span>
          <code
            className="text-xs font-mono px-1.5 py-0.5 rounded"
            style={{
              background: "var(--gh-canvas-default)",
              color: "var(--gh-fg-muted)",
            }}
          >
            {latestCommit.sha}
          </code>
          <span
            className="text-xs"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            {timeAgo(latestCommit.date)}
          </span>
          <span
            className="text-xs hidden md:inline-flex items-center gap-1"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            <HistoryIcon size={12} /> {c.commits.length} Commits
          </span>
        </div>
      )}

      {/* File tree */}
      <div
        className="rounded-b-md border border-t-0 divide-y"
        style={{
          borderColor: "var(--gh-border-default)",
          background: "var(--gh-canvas-default)",
        }}
      >
        <FileRow
          icon={<BookIcon size={16} className="text-[var(--gh-accent-fg)]" />}
          name="README.md"
          message={`Auto-generated visa strategy · ${c.criteria.length} criteria`}
          when={timeAgo(c.createdAt)}
          isFile
        />
        {folders.map((f) => {
          const items = filesByFolder[f];
          if (items.length === 0) return null;
          const latestItem = items[0];
          return (
            <FileRow
              key={f}
              icon={
                <FileDirectoryIcon
                  size={16}
                  className="text-[var(--gh-accent-fg)]"
                />
              }
              name={f + "/"}
              message={
                latestItem?.title ?? `${items.length} item${items.length > 1 ? "s" : ""}`
              }
              when={latestItem ? timeAgo(latestItem.addedAt) : ""}
            />
          );
        })}
        <FileRow
          icon={<FileIcon size={16} className="opacity-60" />}
          name=".pii-redaction"
          message="PII filter rules"
          when={timeAgo(c.createdAt)}
          isFile
        />
      </div>

      {/* README preview placeholder */}
      <div
        className="rounded-md border"
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
          <span className="font-semibold">README.md</span>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">
            {c.visa === "eb1a" ? "EB-1A · " : ""}
            {c.owner} · {c.description}
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            {c.readme.split("\n").slice(2, 6).join(" ").slice(0, 320)}...
          </p>

          <div
            className="mt-6 rounded-md border p-4 flex items-start gap-3"
            style={{
              borderColor: "var(--gh-border-default)",
              background: "var(--gh-canvas-subtle)",
            }}
          >
            <span style={{ color: "var(--gh-attention-fg)" }}>
              <ZapIcon size={16} />
            </span>
            <div className="text-xs" style={{ color: "var(--gh-fg-muted)" }}>
              <strong style={{ color: "var(--gh-fg-default)" }}>
                Step 6 preview
              </strong>{" "}
              — Full markdown rendering with criteria coverage table, strategy
              section, timeline, and recommended actions ships in the next step.
            </div>
          </div>
        </div>
      </div>

      {c.source === "mock" && (
        <div
          className="rounded-md border p-3 text-xs flex items-center gap-2"
          style={{
            borderColor: "var(--gh-attention-fg)",
            background: "var(--gh-attention-subtle)",
            color: "var(--gh-attention-fg)",
          }}
        >
          <ZapIcon size={12} />
          Running on mock data — set FEATHERLESS_API_KEY in .env.local for live
          AI generation.
        </div>
      )}
    </div>
  );
}

function FileRow({
  icon,
  name,
  message,
  when,
  isFile,
}: {
  icon: React.ReactNode;
  name: string;
  message: string;
  when: string;
  isFile?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--gh-canvas-subtle)]">
      {icon}
      <a
        className="gh-link font-normal"
        style={{ color: isFile ? "var(--gh-fg-default)" : "var(--gh-fg-default)" }}
      >
        {name}
      </a>
      <span
        className="flex-1 truncate text-xs"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        {message}
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

function timeAgo(iso: string): string {
  const t = new Date(iso).getTime();
  const diff = (Date.now() - t) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
