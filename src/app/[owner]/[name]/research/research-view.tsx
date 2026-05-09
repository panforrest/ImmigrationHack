"use client";

import { useEffect, useState, useTransition } from "react";
import {
  GlobeIcon,
  SyncIcon,
  LinkExternalIcon,
  SparkleFillIcon,
  ZapIcon,
  CheckCircleFillIcon,
} from "@primer/octicons-react";
import { useCase } from "@/lib/case-context";
import { fetchResearch, type ResearchPanel } from "./actions";

export function ResearchView() {
  const c = useCase();
  const [panels, setPanels] = useState<ResearchPanel[] | null>(null);
  const [pending, startTransition] = useTransition();
  const [loadedAt, setLoadedAt] = useState<string>("");

  function loadResearch() {
    startTransition(async () => {
      const r = await fetchResearch(c.visa, c.description);
      setPanels(r);
      setLoadedAt(new Date().toLocaleTimeString());
    });
  }

  useEffect(() => {
    loadResearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLive = panels?.[0]?.data.source === "tavily";

  return (
    <div className="space-y-3">
      {/* Header */}
      <div
        className="rounded-md border p-4 flex items-start gap-4 flex-wrap"
        style={{
          borderColor: "var(--gh-border-default)",
          background: "var(--gh-canvas-subtle)",
        }}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
          style={{
            background: "var(--gh-accent-subtle)",
            color: "var(--gh-accent-fg)",
          }}
        >
          <GlobeIcon size={24} />
        </div>
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Research
            {isLive && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: "var(--gh-success-subtle)",
                  color: "var(--gh-success-fg)",
                }}
              >
                <CheckCircleFillIcon size={10} />
                LIVE · Tavily
              </span>
            )}
            {!isLive && panels && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: "var(--gh-attention-subtle)",
                  color: "var(--gh-attention-fg)",
                }}
              >
                <ZapIcon size={10} />
                Mock fallback
              </span>
            )}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--gh-fg-muted)" }}>
            Real-time USCIS intelligence powered by Tavily — processing times,
            RFE patterns, recent approvals matching your profile.
          </p>
        </div>
        <button
          type="button"
          onClick={loadResearch}
          disabled={pending}
          className="gh-btn text-sm flex items-center gap-1"
          style={{ opacity: pending ? 0.6 : 1 }}
        >
          <SyncIcon size={14} className={pending ? "animate-spin" : ""} />
          {pending ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loadedAt && (
        <p
          className="text-xs"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          Last refreshed at {loadedAt}
        </p>
      )}

      {/* Panels */}
      {pending && !panels && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <SkeletonPanel key={i} />
          ))}
        </div>
      )}

      {panels && (
        <div className="space-y-3">
          {panels.map((p) => (
            <Panel key={p.title} panel={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function Panel({ panel }: { panel: ResearchPanel }) {
  return (
    <div
      className="rounded-md border overflow-hidden"
      style={{ borderColor: "var(--gh-border-default)" }}
    >
      <div
        className="flex items-center justify-between gap-2 px-4 py-2.5 border-b"
        style={{
          borderColor: "var(--gh-border-muted)",
          background: "var(--gh-canvas-subtle)",
        }}
      >
        <div className="flex items-center gap-2">
          <GlobeIcon size={14} className="opacity-60" />
          <h3 className="text-sm font-semibold">{panel.title}</h3>
        </div>
        <code
          className="text-[10px] font-mono truncate max-w-[60%]"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          {panel.query}
        </code>
      </div>
      {panel.data.answer && (
        <div
          className="p-4 border-b text-sm flex items-start gap-2"
          style={{
            borderColor: "var(--gh-border-muted)",
            background: "rgba(56,139,253,0.06)",
          }}
        >
          <span
            style={{ color: "var(--gh-accent-fg)" }}
            className="mt-0.5 flex-shrink-0"
          >
            <SparkleFillIcon size={14} />
          </span>
          <div>
            <div
              className="text-[10px] uppercase tracking-wider font-semibold mb-1"
              style={{ color: "var(--gh-accent-fg)" }}
            >
              AI summary
            </div>
            <p
              className="leading-relaxed"
              style={{ color: "var(--gh-fg-default)" }}
            >
              {panel.data.answer}
            </p>
          </div>
        </div>
      )}
      <ul
        className="divide-y"
        style={{ borderColor: "var(--gh-border-muted)" }}
      >
        {panel.data.results.slice(0, 5).map((r, i) => (
          <li
            key={i}
            className="px-4 py-3 hover:bg-[var(--gh-canvas-subtle)]"
          >
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline gap-2 group"
            >
              <span
                className="font-mono text-[10px] flex-shrink-0"
                style={{ color: "var(--gh-fg-muted)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-sm font-semibold group-hover:text-[var(--gh-accent-fg)] truncate"
                  >
                    {r.title}
                  </span>
                  <LinkExternalIcon
                    size={12}
                    className="opacity-50 flex-shrink-0"
                  />
                </div>
                <p
                  className="mt-1 text-xs leading-snug"
                  style={{ color: "var(--gh-fg-muted)" }}
                >
                  {r.content?.slice(0, 220)}
                  {r.content && r.content.length > 220 ? "..." : ""}
                </p>
                <div
                  className="mt-1 flex items-center gap-2 text-[10px] font-mono"
                  style={{ color: "var(--gh-fg-subtle)" }}
                >
                  <span className="truncate">{shortDomain(r.url)}</span>
                  {r.publishedDate && <span>· {r.publishedDate}</span>}
                </div>
              </div>
            </a>
          </li>
        ))}
        {panel.data.results.length === 0 && (
          <li
            className="px-4 py-6 text-center text-sm"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            No results.
          </li>
        )}
      </ul>
    </div>
  );
}

function SkeletonPanel() {
  return (
    <div
      className="rounded-md border p-4 space-y-3"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-subtle)",
      }}
    >
      <div
        className="h-3 rounded w-1/3"
        style={{ background: "var(--gh-border-default)" }}
      />
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5">
            <div
              className="h-2 rounded w-3/4"
              style={{ background: "var(--gh-border-muted)" }}
            />
            <div
              className="h-2 rounded w-full"
              style={{ background: "var(--gh-border-muted)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function shortDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
