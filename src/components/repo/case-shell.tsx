"use client";

import { useEffect, useState } from "react";
import type { Case } from "@/lib/types";
import { loadOrSeedDemoCase } from "@/lib/case-store";
import { CaseProvider } from "@/lib/case-context";
import { RepoHeader } from "./repo-header";
import { RepoSidebar } from "./repo-sidebar";
import { CaseChat } from "./case-chat";

/**
 * Client wrapper for /[owner]/[name]/* routes.
 * Loads the Case from localStorage (or seeds a demo) and renders
 * the GitHub-faithful repo chrome around the current page.
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
  const [c, setC] = useState<Case | null>(null);

  useEffect(() => {
    setC(loadOrSeedDemoCase(owner, name));
  }, [owner, name]);

  if (!c) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        <div
          className="rounded-md border p-10 text-center"
          style={{
            borderColor: "var(--gh-border-muted)",
            background: "var(--gh-canvas-subtle)",
          }}
        >
          <p style={{ color: "var(--gh-fg-muted)" }}>Loading repository...</p>
        </div>
      </div>
    );
  }

  return (
    <CaseProvider value={c}>
      <RepoHeader />
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-6">
        <div className="grid lg:grid-cols-[1fr_296px] gap-6">
          <div className="min-w-0">{children}</div>
          <div className="hidden lg:block">
            <RepoSidebar />
          </div>
        </div>
      </div>
      <CaseChat />
    </CaseProvider>
  );
}
