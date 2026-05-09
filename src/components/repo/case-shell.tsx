"use client";

import { useState } from "react";
import type { Case } from "@/lib/types";
import { loadOrSeedDemoCase } from "@/lib/case-store";
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
  const [c] = useState<Case>(() => loadOrSeedDemoCase(owner, name));

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
