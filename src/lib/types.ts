/**
 * Core domain types for ImmigrationHack.
 * The Case object is what Featherless.ai produces from a user's inputs
 * and what every Case Repo screen reads from.
 */

export type VisaTemplate = "none" | "eb1a" | "eb2-niw" | "o1a" | "h1b";

export type Visibility = "private" | "public";

export type IssueLabel =
  | "blocker"
  | "evidence"
  | "recommendation-letter"
  | "press"
  | "award"
  | "publication"
  | "form"
  | "narrative"
  | "priority-high"
  | "priority-low"
  | "good-first-task";

export interface CaseCriterion {
  /** stable id, e.g. "original-contributions" */
  id: string;
  /** human label, e.g. "Original Contributions of Major Significance" */
  label: string;
  /** 0..100 strength score */
  score: number;
  /** AI-written one-liner reasoning */
  reasoning: string;
  /** ids of evidence artifacts that satisfy this criterion */
  evidenceIds: string[];
}

export interface CaseEvidence {
  id: string;
  title: string;
  /** which "folder" it lives in: evidence/ letters/ forms/ narrative */
  folder: "evidence" | "letters" | "forms" | "narrative";
  type: "publication" | "patent" | "award" | "press" | "letter" | "form" | "code" | "talk" | "other";
  /** ids of criteria this artifact supports */
  satisfies: string[];
  /** AI-written summary of strength */
  note?: string;
  /** when added (ISO) */
  addedAt: string;
}

export interface CaseIssue {
  /** issue number, like #12 */
  number: number;
  title: string;
  body: string;
  state: "open" | "closed";
  labels: IssueLabel[];
  /** which criterion id this gap blocks */
  criterionId?: string;
  /** AI-suggested concrete next steps */
  suggestedActions: string[];
  createdAt: string;
}

export interface CaseRelease {
  /** semver-ish tag, e.g. v0.4 */
  tag: string;
  /** human title, e.g. "I-140 Filed" */
  title: string;
  body: string;
  state: "shipped" | "upcoming";
  /** ISO date or estimated date */
  date: string;
  isLatest?: boolean;
}

export interface CaseCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
}

export interface Case {
  id: string;
  owner: string;
  name: string;
  visa: VisaTemplate;
  description: string;
  visibility: Visibility;
  /** AI-generated visa strategy markdown */
  readme: string;
  /** 0..100 overall readiness */
  readinessScore: number;
  /** AI sentence on what would lift score to 80 */
  readinessAdvice: string;
  criteria: CaseCriterion[];
  issues: CaseIssue[];
  releases: CaseRelease[];
  evidence: CaseEvidence[];
  commits: CaseCommit[];
  /** topic chips like ["#eb1a", "#stem", "#machine-learning"] */
  topics: string[];
  /** ISO created date */
  createdAt: string;
  /** "ai" | "mock" — which path generated this */
  source: "ai" | "mock";
}

export interface OnboardingInputs {
  owner: string;
  name: string;
  description: string;
  visa: VisaTemplate;
  visibility: Visibility;
  initReadme: boolean;
  initRedaction: boolean;
  files: { name: string; size: number; type: string }[];
}
