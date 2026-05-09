"use client";

import Link from "next/link";
import {
  IssueOpenedIcon,
  IssueClosedIcon,
  CheckIcon,
  XIcon,
  TasklistIcon,
  ZapIcon,
  CommentIcon,
  ChevronLeftIcon,
} from "@primer/octicons-react";
import { useCase } from "@/lib/case-context";
import { LabelChip } from "@/components/repo/issue-label";

export function IssueDetail({ issueNumber }: { issueNumber: number }) {
  const c = useCase();
  const issue = c.issues.find((i) => i.number === issueNumber);

  if (!issue) {
    return (
      <div
        className="rounded-md border p-10 text-center"
        style={{
          borderColor: "var(--gh-border-default)",
          background: "var(--gh-canvas-subtle)",
        }}
      >
        <h2 className="text-xl font-semibold">Issue not found</h2>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          Issue #{issueNumber} doesn&apos;t exist in this repository.
        </p>
        <Link
          href={`/${c.owner}/${c.name}/issues`}
          className="gh-btn mt-4 inline-flex items-center gap-1"
        >
          <ChevronLeftIcon size={14} />
          Back to issues
        </Link>
      </div>
    );
  }

  const isOpen = issue.state === "open";
  const criterion = issue.criterionId
    ? c.criteria.find((cr) => cr.id === issue.criterionId)
    : null;

  return (
    <div className="space-y-4">
      {/* Title row */}
      <div>
        <Link
          href={`/${c.owner}/${c.name}/issues`}
          className="gh-link inline-flex items-center gap-1 text-xs mb-3"
        >
          <ChevronLeftIcon size={12} />
          Back to issues
        </Link>
        <h1 className="text-2xl font-semibold">
          {issue.title}{" "}
          <span
            className="font-normal"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            #{issue.number}
          </span>
        </h1>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
            style={
              isOpen
                ? {
                    background: "var(--gh-success-emphasis)",
                    color: "#fff",
                  }
                : {
                    background: "var(--gh-done-emphasis)",
                    color: "#fff",
                  }
            }
          >
            {isOpen ? (
              <IssueOpenedIcon size={14} />
            ) : (
              <IssueClosedIcon size={14} />
            )}
            {isOpen ? "Open" : "Closed"}
          </span>
          <span
            className="text-sm"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            <span className="font-semibold text-[var(--gh-fg-default)]">
              ai-assistant
            </span>{" "}
            opened this issue {timeAgo(issue.createdAt)} ·{" "}
            {issue.suggestedActions.length} comments
          </span>
        </div>
      </div>

      <hr style={{ borderColor: "var(--gh-border-muted)" }} />

      <div className="grid lg:grid-cols-[1fr_220px] gap-6">
        <div className="space-y-4 min-w-0">
          {/* Issue body card */}
          <div
            className="rounded-md border overflow-hidden"
            style={{ borderColor: "var(--gh-border-default)" }}
          >
            <div
              className="flex items-center gap-3 px-4 py-2 border-b"
              style={{
                background: "var(--gh-canvas-subtle)",
                borderColor: "var(--gh-border-muted)",
              }}
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white bg-gradient-to-br from-[#3fb950] to-[#2f81f7]"
                aria-hidden
              >
                AI
              </span>
              <span className="text-sm font-semibold">ai-assistant</span>
              <span
                className="text-xs"
                style={{ color: "var(--gh-fg-muted)" }}
              >
                commented {timeAgo(issue.createdAt)}
              </span>
              <span
                className="ml-auto text-[10px] uppercase tracking-wider rounded-full border px-2 py-0.5"
                style={{
                  borderColor: "var(--gh-border-default)",
                  color: "var(--gh-fg-muted)",
                }}
              >
                Owner
              </span>
            </div>
            <div className="p-4 text-sm leading-relaxed">{issue.body}</div>
          </div>

          {/* AI suggested actions */}
          {issue.suggestedActions.length > 0 && (
            <div
              className="rounded-md border overflow-hidden"
              style={{ borderColor: "var(--gh-border-default)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2 border-b text-sm font-semibold"
                style={{
                  background: "var(--gh-canvas-subtle)",
                  borderColor: "var(--gh-border-muted)",
                  color: "var(--gh-attention-fg)",
                }}
              >
                <ZapIcon size={14} />
                AI-suggested next actions
              </div>
              <ul className="p-4 space-y-2.5">
                {issue.suggestedActions.map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold flex-shrink-0"
                      style={{
                        background: "var(--gh-accent-subtle)",
                        color: "var(--gh-accent-fg)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Comment composer */}
          <div
            className="rounded-md border overflow-hidden"
            style={{ borderColor: "var(--gh-border-default)" }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 border-b text-xs"
              style={{
                background: "var(--gh-canvas-subtle)",
                borderColor: "var(--gh-border-muted)",
                color: "var(--gh-fg-muted)",
              }}
            >
              <CommentIcon size={12} /> Add a comment
            </div>
            <textarea
              className="w-full p-3 bg-transparent text-sm outline-none resize-none"
              rows={3}
              placeholder="Leave a comment for your mentor or lawyer..."
              style={{ color: "var(--gh-fg-default)" }}
            />
            <div
              className="flex items-center justify-end gap-2 px-3 py-2 border-t"
              style={{ borderColor: "var(--gh-border-muted)" }}
            >
              <button className="gh-btn text-sm flex items-center gap-1">
                <XIcon size={14} />
                Close issue
              </button>
              <button className="gh-btn gh-btn-primary text-sm">
                Comment
              </button>
            </div>
          </div>
        </div>

        {/* Detail sidebar */}
        <aside className="space-y-5 text-sm">
          <DetailSection title="Labels">
            <div className="flex flex-wrap gap-1">
              {issue.labels.map((l) => (
                <LabelChip key={l} label={l} />
              ))}
            </div>
          </DetailSection>

          {criterion && (
            <DetailSection title="Linked criterion">
              <div
                className="text-xs"
                style={{ color: "var(--gh-fg-default)" }}
              >
                {criterion.label}
              </div>
              <div
                className="mt-2 h-1.5 rounded-full overflow-hidden"
                style={{ background: "var(--gh-border-muted)" }}
              >
                <div
                  className="h-full"
                  style={{
                    width: `${criterion.score}%`,
                    background:
                      criterion.score >= 70
                        ? "var(--gh-success-fg)"
                        : criterion.score >= 40
                        ? "var(--gh-attention-fg)"
                        : "var(--gh-danger-fg)",
                  }}
                />
              </div>
              <div
                className="mt-1 text-xs"
                style={{ color: "var(--gh-fg-muted)" }}
              >
                Currently {criterion.score}% — closing this issue helps lift
                the score.
              </div>
            </DetailSection>
          )}

          <DetailSection title="Assignee">
            <div className="flex items-center gap-2 text-xs">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold text-white bg-gradient-to-br from-[#1f6feb] to-[#a371f7]"
                aria-hidden
              >
                FP
              </span>
              <span>{c.owner}</span>
            </div>
          </DetailSection>

          <DetailSection title="Milestone">
            <span
              className="text-xs"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              No milestone
            </span>
          </DetailSection>

          <DetailSection title="Tasks">
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              <TasklistIcon size={14} />
              <span>
                <span style={{ color: "var(--gh-success-fg)" }}>
                  <CheckIcon size={12} />
                </span>{" "}
                {issue.suggestedActions.length} suggested actions
              </span>
            </div>
          </DetailSection>
        </aside>
      </div>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        {title}
      </header>
      {children}
    </section>
  );
}

function timeAgo(iso: string): string {
  const t = new Date(iso).getTime();
  const diff = (Date.now() - t) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}
