"use client";

import { Component, useState, type ReactNode } from "react";
import type { Case } from "@/lib/types";
import { loadOrSeedDemoCase } from "@/lib/case-store";
import { buildMockCase } from "@/lib/mock-case";
import { CaseProvider } from "@/lib/case-context";
import { RepoHeader } from "./repo-header";
import { RepoSidebar } from "./repo-sidebar";
import { CaseChat } from "./case-chat";

/**
 * Client-only repo shell. Loaded via dynamic({ ssr:false }) from
 * case-shell-mount.tsx so that the lazy state initializer can
 * synchronously read localStorage on the very first render. This
 * eliminates the SSR -> hydration flicker that previously made the
 * floating chat launcher appear and disappear on Vercel.
 *
 * Wrapped in an error boundary so a corrupt localStorage entry or a
 * downstream render error never takes down the floating chat
 * launcher — the demo's wow moment must always work.
 */
export function CaseShell({
  owner,
  name,
  children,
}: {
  owner: string;
  name: string;
  children: React.ReactNode;
}) {
  const [c] = useState<Case>(() => {
    try {
      return loadOrSeedDemoCase(owner, name);
    } catch {
      return buildMockCase({
        owner,
        name,
        description: "EB-1A petition · ML Engineer · Filing target Q3 2026",
        visa: "eb1a",
        visibility: "private",
        initReadme: true,
        initRedaction: true,
        files: [],
      });
    }
  });

  return (
    <CaseProvider value={c}>
      <ShellErrorBoundary>
        <RepoHeader />
        <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-6">
          <div className="grid lg:grid-cols-[1fr_296px] gap-6">
            <div className="min-w-0">{children}</div>
            <div className="hidden lg:block">
              <RepoSidebar />
            </div>
          </div>
        </div>
      </ShellErrorBoundary>
      {/* Chat launcher rendered OUTSIDE the boundary so it survives
          any render error in the body of the shell. */}
      <CaseChat />
    </CaseProvider>
  );
}

class ShellErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error("[CaseShell] render error", error);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          <div
            className="rounded-md border p-6 text-sm"
            style={{
              borderColor: "var(--gh-border-default)",
              background: "var(--gh-canvas-subtle)",
              color: "var(--gh-fg-muted)",
            }}
          >
            Something hiccuped rendering this view. The AI assistant in the
            bottom-right still works — try refreshing the page.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
