"use client";

import dynamic from "next/dynamic";

/**
 * Mount the CaseShell as a client-only component (ssr: false).
 *
 * The shell reads the case synchronously from localStorage during
 * its first render. Skipping SSR ensures localStorage is always
 * available, which means the floating chat launcher and the rest
 * of the repo chrome show up in the first client paint — no
 * SSR -> hydration flicker.
 */
const CaseShell = dynamic(
  () => import("./case-shell").then((m) => ({ default: m.CaseShell })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto max-w-[1280px] px-6 py-20"
        aria-hidden
      />
    ),
  },
);

export default CaseShell;
