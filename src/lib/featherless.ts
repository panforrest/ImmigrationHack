import OpenAI from "openai";
import type { Case, OnboardingInputs } from "./types";
import { VISA_CRITERIA, VISA_LABELS, VISA_MILESTONES } from "./visa-templates";
import { buildMockCase } from "./mock-case";

/**
 * Featherless.ai client — uses OpenAI-compatible REST API.
 * Falls back to a mock case when no key is configured (so the app
 * remains demo-able and developable without sponsor credentials).
 */

const FEATHERLESS_BASE_URL = "https://api.featherless.ai/v1";

function getClient(): OpenAI | null {
  const key = process.env.FEATHERLESS_API_KEY?.trim();
  if (!key) return null;
  return new OpenAI({
    apiKey: key,
    baseURL: FEATHERLESS_BASE_URL,
  });
}

export function isLLMAvailable(): boolean {
  return Boolean(process.env.FEATHERLESS_API_KEY?.trim());
}

const SYSTEM_PROMPT = `You are an expert US immigration strategist who turns
messy applicant inputs into a structured Case Repo for the ImmigrationHack platform.

You speak fluent USCIS evidentiary criteria for EB-1A, EB-2 NIW, O-1A, and H-1B.
You produce concrete, actionable, conservative legal strategy. You are NEVER giving
legal advice — you are organizing evidence and identifying gaps.

You ALWAYS respond with a single valid JSON object that matches the requested schema.`;

function buildUserPrompt(input: OnboardingInputs): string {
  const criteria = VISA_CRITERIA[input.visa]
    .map((c) => `  - ${c.id}: ${c.label}`)
    .join("\n");
  const milestones = VISA_MILESTONES[input.visa].map((m) => `  - ${m}`).join("\n");
  const filesSummary =
    input.files.length > 0
      ? input.files.map((f) => `- ${f.name} (${f.type || "unknown"}, ${(f.size / 1024).toFixed(1)} KB)`).join("\n")
      : "(none yet)";

  return `Generate a Case Repo JSON for an immigration case.

# Applicant
Owner: ${input.owner}
Repo name: ${input.name}
Visa template: ${VISA_LABELS[input.visa]}
Description: ${input.description || "(none)"}

# Files attached
${filesSummary}

# Visa criteria taxonomy (use these IDs)
${criteria || "(none — generic case)"}

# Suggested milestones for releases
${milestones || "(none)"}

# Required JSON schema (return ONLY this object, no prose)
{
  "readme": "Markdown string. Title, profile snapshot, recommended path, strategy, timeline.",
  "readinessScore": 0-100 integer,
  "readinessAdvice": "One sentence on what would lift score to 80",
  "criteria": [{ "id": "...", "label": "...", "score": 0-100, "reasoning": "...", "evidenceIds": [] }],
  "issues": [{ "number": 1, "title": "...", "body": "...", "state": "open"|"closed",
              "labels": ["blocker"|"evidence"|"recommendation-letter"|"press"|"award"|"publication"|"form"|"narrative"|"priority-high"],
              "criterionId": "...", "suggestedActions": ["..."], "createdAt": "<iso date>" }],
  "releases": [{ "tag": "v0.1", "title": "...", "body": "...", "state": "shipped"|"upcoming",
                 "date": "<iso>", "isLatest": false }],
  "evidence": [{ "id": "...", "title": "...", "folder": "evidence"|"letters"|"forms"|"narrative",
                 "type": "publication"|"patent"|"award"|"press"|"letter"|"form"|"code"|"talk"|"other",
                 "satisfies": ["criterion-id"], "note": "...", "addedAt": "<iso>" }],
  "commits": [{ "sha": "abc1234", "message": "...", "author": "...", "date": "<iso>" }],
  "topics": ["#tag1", "#tag2"]
}

Guidelines:
- Generate 6-10 issues, mostly open. Each issue blocks exactly one criterion.
- Generate exactly 4 releases: 1-2 shipped, rest upcoming. Mark one as isLatest.
- Generate 5-10 evidence items spread across folders.
- Score criteria honestly: give realistic 20-90 spread, not all 70+.
- readinessScore should equal a sensible aggregate of criteria (50-75 typical for a fresh case).
- Use today's date as base for createdAt timestamps; spread dates over the past 14 days.
- Include 3-6 commits.
- topics: 4-6 hashtag topics relevant to the applicant's profile.

Return ONLY the JSON.`;
}

interface AIResponseShape {
  readme: string;
  readinessScore: number;
  readinessAdvice: string;
  criteria: Case["criteria"];
  issues: Case["issues"];
  releases: Case["releases"];
  evidence: Case["evidence"];
  commits: Case["commits"];
  topics: string[];
}

function extractJson(text: string): string | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) return text.slice(start, end + 1);
  return null;
}

export async function generateCase(input: OnboardingInputs): Promise<Case> {
  const client = getClient();
  if (!client) {
    return buildMockCase(input);
  }

  const model = process.env.FEATHERLESS_MODEL || "meta-llama/Meta-Llama-3.1-8B-Instruct";

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(input) },
      ],
      temperature: 0.6,
      max_tokens: 4096,
    });

    const raw = completion.choices?.[0]?.message?.content ?? "";
    const jsonStr = extractJson(raw);
    if (!jsonStr) throw new Error("No JSON in response");
    const parsed = JSON.parse(jsonStr) as AIResponseShape;

    return {
      id: `${input.owner}/${input.name}`,
      owner: input.owner,
      name: input.name,
      visa: input.visa,
      description: input.description,
      visibility: input.visibility,
      readme: parsed.readme,
      readinessScore: parsed.readinessScore,
      readinessAdvice: parsed.readinessAdvice,
      criteria: parsed.criteria,
      issues: parsed.issues,
      releases: parsed.releases,
      evidence: parsed.evidence,
      commits: parsed.commits,
      topics: parsed.topics,
      createdAt: new Date().toISOString(),
      source: "ai",
    };
  } catch (err) {
    console.warn("[Featherless] generation failed, using mock:", err);
    const mock = buildMockCase(input);
    mock.source = "mock";
    return mock;
  }
}
