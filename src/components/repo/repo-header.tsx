"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LockIcon,
  PinIcon,
  TriangleDownIcon,
  SparkleFillIcon,
} from "@primer/octicons-react";
import { useCase } from "@/lib/case-context";
import { ASK_CASE_EVENT } from "./case-chat";

export function RepoHeader() {
  const c = useCase();
  const openIssues = c.issues.filter((i) => i.state === "open").length;
  const releases = c.releases.length;

  return (
    <div
      className="border-b"
      style={{
        background: "var(--gh-canvas-default)",
        borderColor: "var(--gh-border-muted)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 pt-4">
        {/* Title row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-lg flex-wrap">
            <RepoIcon size={16} className="opacity-70" />
            <Link href={`/${c.owner}`} className="gh-link font-normal">
              {c.owner}
            </Link>
            <span style={{ color: "var(--gh-fg-muted)" }}>/</span>
            <Link
              href={`/${c.owner}/${c.name}`}
              className="gh-link font-semibold"
            >
              {c.name}
            </Link>
            <span
              className="ml-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium font-sans"
              style={{
                borderColor: "var(--gh-border-default)",
                color: "var(--gh-fg-muted)",
              }}
            >
              {c.visibility === "public" ? (
                <>
                  <GlobeIcon size={10} /> Public
                </>
              ) : (
                <>
                  <LockIcon size={10} /> Private
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() =>
                document.dispatchEvent(new Event(ASK_CASE_EVENT))
              }
              className="flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-semibold transition-transform hover:scale-105"
              style={{
                borderColor: "transparent",
                background:
                  "linear-gradient(135deg, #1f6feb 0%, #a371f7 100%)",
                color: "#fff",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <SparkleFillIcon size={12} />
              <span>Ask AI</span>
            </button>
            <RepoActionBtn
              icon={<PinIcon size={14} />}
              label="Pin"
              count="2"
            />
            <RepoActionBtn
              icon={<EyeIcon size={14} />}
              label="Unwatch"
              count="4"
              hasCaret
            />
            <RepoActionBtn
              icon={<RepoForkedIcon size={14} />}
              label="Fork"
              count="12"
            />
            <RepoActionBtn
              icon={<StarIcon size={14} />}
              label="Star"
              count="248"
              primary
            />
          </div>
        </div>

        {/* Tab nav */}
        <RepoTabs
          owner={c.owner}
          name={c.name}
          counts={{
            issues: openIssues,
            pulls: 3,
            releases: releases,
          }}
          pathname={usePathname()}
        />
      </div>
    </div>
  );
}

function RepoActionBtn({
  icon,
  label,
  count,
  primary,
  hasCaret,
}: {
  icon: React.ReactNode;
  label: string;
  count?: string;
  primary?: boolean;
  hasCaret?: boolean;
}) {
  return (
    <div className="flex items-stretch text-xs">
      <button
        className="flex items-center gap-1 rounded-l-md border px-2.5 py-1 hover:bg-[var(--gh-canvas-subtle)]"
        style={{
          borderColor: "var(--gh-border-default)",
          background: primary
            ? "var(--gh-canvas-subtle)"
            : "var(--gh-canvas-subtle)",
          borderRight: count ? "0" : undefined,
        }}
      >
        {icon}
        <span className="font-semibold">{label}</span>
        {hasCaret && <TriangleDownIcon size={12} className="opacity-60" />}
      </button>
      {count && (
        <span
          className="flex items-center rounded-r-md border px-2 py-1 font-semibold"
          style={{
            borderColor: "var(--gh-border-default)",
            background: "var(--gh-canvas-default)",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

function RepoTabs({
  owner,
  name,
  counts,
  pathname,
}: {
  owner: string;
  name: string;
  counts: { issues: number; pulls: number; releases: number };
  pathname: string;
}) {
  const base = `/${owner}/${name}`;
  const tabs = [
    { href: base, label: "Code", icon: <CodeIcon size={16} />, exact: true },
    {
      href: `${base}/issues`,
      label: "Issues",
      icon: <IssueOpenedIcon size={16} />,
      count: counts.issues,
    },
    {
      href: `${base}/pulls`,
      label: "Pull requests",
      icon: <GitPullRequestIcon size={16} />,
      count: counts.pulls,
    },
    {
      href: `${base}/actions`,
      label: "Actions",
      icon: <PlayIcon size={16} />,
    },
    {
      href: `${base}/releases`,
      label: "Releases",
      icon: <TagIcon size={16} />,
      count: counts.releases,
    },
    {
      href: `${base}/graph`,
      label: "Evidence Graph",
      icon: <GraphIcon size={16} />,
    },
    {
      href: `${base}/research`,
      label: "Research",
      icon: <GlobeIcon size={16} />,
    },
  ];

  return (
    <nav
      className="mt-4 flex items-center gap-1 overflow-x-auto -mb-px"
      aria-label="Repository navigation"
    >
      {tabs.map((t) => {
        const active = t.exact
          ? pathname === t.href
          : pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className="flex items-center gap-2 px-3 py-2 text-sm border-b-2 whitespace-nowrap rounded-t hover:bg-[var(--gh-canvas-subtle)]"
            style={{
              borderBottomColor: active
                ? "var(--gh-attention-fg)"
                : "transparent",
              color: active
                ? "var(--gh-fg-default)"
                : "var(--gh-fg-default)",
              fontWeight: active ? 600 : 400,
            }}
          >
            <span className="opacity-70">{t.icon}</span>
            {t.label}
            {t.count !== undefined && (
              <span
                className="rounded-full px-1.5 text-[11px] font-semibold"
                style={{
                  background: "var(--gh-neutral-muted)",
                  color: "var(--gh-fg-default)",
                }}
              >
                {t.count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
