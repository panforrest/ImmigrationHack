"use client";

import { createContext, useContext } from "react";
import type { Case } from "./types";

const CaseContext = createContext<Case | null>(null);

export function CaseProvider({
  value,
  children,
}: {
  value: Case;
  children: React.ReactNode;
}) {
  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

export function useCase(): Case {
  const c = useContext(CaseContext);
  if (!c) throw new Error("useCase must be used within <CaseProvider>");
  return c;
}
