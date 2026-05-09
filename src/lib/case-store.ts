import type { Case } from "./types";
import { buildMockCase } from "./mock-case";

/**
 * Client-side case storage backed by localStorage.
 * For the hackathon MVP we keep it simple and stateless on the server.
 *
 * Storage key: `immigrationhack:case:<owner>/<name>`
 * Index key:   `immigrationhack:cases` -> string[] of "<owner>/<name>"
 */

const KEY_PREFIX = "immigrationhack:case:";
const INDEX_KEY = "immigrationhack:cases";

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function saveCase(c: Case): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(KEY_PREFIX + c.id, JSON.stringify(c));
    const idx = listCaseIds();
    if (!idx.includes(c.id)) {
      localStorage.setItem(INDEX_KEY, JSON.stringify([...idx, c.id]));
    }
  } catch (e) {
    console.warn("[case-store] save failed", e);
  }
}

export function loadCase(owner: string, name: string): Case | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(KEY_PREFIX + `${owner}/${name}`);
    if (!raw) return null;
    return JSON.parse(raw) as Case;
  } catch {
    return null;
  }
}

export function listCaseIds(): string[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * For deep-link demo access: if a judge visits /panforrest/eb1a-2026
 * directly without onboarding, seed and return a rich demo case.
 */
export function loadOrSeedDemoCase(owner: string, name: string): Case {
  const existing = loadCase(owner, name);
  if (existing) return existing;

  const demo = buildMockCase({
    owner,
    name,
    description: "EB-1A petition · ML Engineer · Filing target Q3 2026",
    visa: "eb1a",
    visibility: "private",
    initReadme: true,
    initRedaction: true,
    files: [],
  });
  saveCase(demo);
  return demo;
}
