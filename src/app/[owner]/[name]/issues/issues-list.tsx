"use client";

import Link from "next/link";
import { useState } from "react";
import {
  IssueOpenedIcon,
  IssueClosedIcon,
  CommentIcon,
  CheckIcon,
  TriangleDownIcon,
  SearchIcon,
  TagIcon,
  MilestoneIcon,
  PersonIcon,
  SortDescIcon,
  ZapIcon,
} from "@primer/octicons-react";
import { useCase } from "@/lib/case-context";
import { LabelChip } from "@/components/repo/issue-label";
import type { IssueLabel } from "@/lib/types";

export function IssuesList() {
  const c = useCase();
  const [tab, setTab] = useState<"open" | "closed">("open");
  const [labelFilter, setLabelFilter] = useState<IssueLabel | "all">("all");

  const openCount = c.issues.filter((i) => i.state === "open").length;
  const closedCount = c.issues.filter((i) => i.state === "closed").length;

  const visible = c.issues
    .filter((i) => i.state === tab)
    .filter((i) => labelFilter === "all" || i.labels.includes(labelFilter));

  const allLabels: IssueLabel[] = Array.from(
    new Set(c.issues.flatMap((i) => i.labels))
  );

  return (
    <div className="space-y-4">
      {/* Search + New issue */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex-1 min-w-[260px] flex items-stretch">
          <button
            className="rounded-l-md border border-r-0 px-3 text-sm flex items-center gap-1 hover:bg-[var(--gh-canvas-subtle)]"
            style={{ borderColor: "var(--gh-border-default)" }}
          >
            Filters
            <TriangleDownIcon size={12} className="opacity-60" />
          </button>
          <div
            className="flex-1 flex items-center gap-2 px-3 rounded-r-md border"
            style={{
              borderColor: "var(--gh-border-default)",
              background: "var(--gh-canvas-default)",
            }}
          >
            <SearchIcon size={14} className="opacity-50" />
            <input
              className="flex-1 bg-transparent text-sm outline-none py-1.5"
              defaultValue={`is:issue is:${tab}`}
              readOnly
            />
          </div>
        </div>

        <button className="gh-btn text-sm flex items-center gap-1">
          <TagIcon size={14} />
          Labels
          <span
            className="rounded-full px-1.5 text-[11px] font-semibold"
            style={{
              background: "var(--gh-neutral-muted)",
              color: "var(--gh-fg-default)",
            }}
          >
            {allLabels.length}
          </span>
        </button>
        <button className="gh-btn text-sm flex items-center gap-1">
          <MilestoneIcon size={14} />
          Milestones
          <span
            className="rounded-full px-1.5 text-[11px] font-semibold"
            style={{
              background: "var(--gh-neutral-muted)",
              color: "var(--gh-fg-default)",
            }}
          >
            {c.releases.length}
          </span>
        </button>
        <button className="gh-btn gh-btn-primary text-sm flex items-center gap-1">
          <span className="text-base leading-none">+</span> New issue
        </button>
      </div>

      {/* List header (state tabs + filter dropdowns) */}
      <div
        className="rounded-t-md border"
        style={{
          borderColor: "var(--gh-border-default)",
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 flex-wrap"
          style={{ background: "var(--gh-canvas-subtle)" }}
        >
          <button
            type="button"
            onClick={() => setTab("open")}
            className="flex items-center gap-1.5 text-sm"
            style={{
              color:
                tab === "open"
                  ? "var(--gh-fg-default)"
                  : "var(--gh-fg-muted)",
              fontWeight: tab === "open" ? 600 : 400,
            }}
          >
            <IssueOpenedIcon size={16} />
            <span>{openCount} Open</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("closed")}
            className="flex items-center gap-1.5 text-sm"
            style={{
              color:
                tab === "closed"
                  ? "var(--gh-fg-default)"
                  : "var(--gh-fg-muted)",
              fontWeight: tab === "closed" ? 600 : 400,
            }}
          >
            <CheckIcon size={16} />
            <span>{closedCount} Closed</span>
          </button>

          <div className="ml-auto flex items-center gap-3 flex-wrap">
            <FilterDropdown label="Author" icon={<PersonIcon size={14} />} />
            <LabelFilterDropdown
              labels={allLabels}
              current={labelFilter}
              onChange={setLabelFilter}
            />
            <FilterDropdown label="Projects" icon={<MilestoneIcon size={14} />} />
            <FilterDropdown label="Milestones" icon={<MilestoneIcon size={14} />} />
            <FilterDropdown label="Assignee" icon={<PersonIcon size={14} />} />
            <FilterDropdown label="Sort" icon={<SortDescIcon size={14} />} />
          </div>
        </div>

        {/* Issue rows */}
        <ul
          className="divide-y"
          style={{ borderColor: "var(--gh-border-default)" }}
        >
          {visible.length === 0 ? (
            <li className="px-6 py-12 text-center">
              <p
                className="text-sm"
                style={{ color: "var(--gh-fg-muted)" }}
              >
                No {tab} issues match your filter.
              </p>
            </li>
          ) : (
            visible.map((i) => (
              <IssueRow
                key={i.number}
                issue={i}
                owner={c.owner}
                name={c.name}
              />
            ))
          )}
        </ul>
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
          Issues generated by mock — every gap-finding live with FEATHERLESS_API_KEY.
        </div>
      )}
    </div>
  );
}

function FilterDropdown({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      className="flex items-center gap-1 text-sm hover:text-white"
      style={{ color: "var(--gh-fg-muted)" }}
    >
      {icon}
      <span>{label}</span>
      <TriangleDownIcon size={12} />
    </button>
  );
}

function LabelFilterDropdown({
  labels,
  current,
  onChange,
}: {
  labels: IssueLabel[];
  current: IssueLabel | "all";
  onChange: (l: IssueLabel | "all") => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm hover:text-white"
        style={{
          color:
            current !== "all"
              ? "var(--gh-fg-default)"
              : "var(--gh-fg-muted)",
        }}
      >
        <TagIcon size={14} />
        <span>{current === "all" ? "Labels" : current}</span>
        <TriangleDownIcon size={12} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-10 w-56 rounded-md border shadow-xl overflow-hidden"
          style={{
            background: "var(--gh-canvas-default)",
            borderColor: "var(--gh-border-default)",
          }}
        >
          <button
            onClick={() => {
              onChange("all");
              setOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-sm hover:bg-[var(--gh-canvas-subtle)]"
            style={{
              fontWeight: current === "all" ? 600 : 400,
            }}
          >
            All labels
          </button>
          {labels.map((l) => (
            <button
              key={l}
              onClick={() => {
                onChange(l);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-[var(--gh-canvas-subtle)]"
              style={{
                fontWeight: current === l ? 600 : 400,
              }}
            >
              <LabelChip label={l} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function IssueRow({
  issue,
  owner,
  name,
}: {
  issue: ReturnType<typeof useCase>["issues"][number];
  owner: string;
  name: string;
}) {
  const isOpen = issue.state === "open";
  return (
    <li
      className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--gh-canvas-subtle)]"
      style={{ background: "var(--gh-canvas-default)" }}
    >
      <span
        style={{
          color: isOpen
            ? "var(--gh-success-fg)"
            : "var(--gh-done-fg)",
        }}
        className="mt-1"
      >
        {isOpen ? (
          <IssueOpenedIcon size={16} />
        ) : (
          <IssueClosedIcon size={16} />
        )}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <Link
            href={`/${owner}/${name}/issues/${issue.number}`}
            className="text-sm font-semibold hover:text-[var(--gh-accent-fg)]"
          >
            {issue.title}
          </Link>
          {issue.labels.map((l) => (
            <LabelChip key={l} label={l} />
          ))}
        </div>
        <div
          className="mt-1 text-xs"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          #{issue.number} opened {timeAgo(issue.createdAt)} by{" "}
          <span className="hover:text-white cursor-pointer">ai-assistant</span>
        </div>
      </div>
      <div
        className="mt-1 text-xs flex items-center gap-1"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        <CommentIcon size={14} />
        {issue.suggestedActions.length}
      </div>
    </li>
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
