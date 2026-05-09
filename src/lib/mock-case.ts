import type { Case, OnboardingInputs } from "./types";
import { VISA_CRITERIA, VISA_LABELS, VISA_MILESTONES, VISA_TOPICS } from "./visa-templates";

/**
 * Build a rich mock Case for demos / when FEATHERLESS_API_KEY is not set.
 * For EB-1A we hand-craft a polished demo (the headline showcase).
 * Other visa templates get a procedurally-generated reasonable seed.
 */

export function buildMockCase(input: OnboardingInputs): Case {
  if (input.visa === "eb1a") return buildEb1aMock(input);
  return buildGenericMock(input);
}

function nowIso(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString();
}

function shortSha(): string {
  return Math.random().toString(16).slice(2, 9);
}

function buildEb1aMock(input: OnboardingInputs): Case {
  const owner = input.owner;
  const name = input.name;

  const readme = `# EB-1A · ${owner} · Filing target Q3 2026

> Auto-generated visa strategy. Updated by ImmigrationHack on ${new Date().toLocaleDateString()}.

## Profile snapshot

Senior ML engineer with **2 patents**, **7 peer-reviewed publications**, **1.2k GitHub stars** across two open-source ML libraries, and a leadership role at a Series B startup. Strongest on **Original Contributions of Major Significance** and **Critical Role**. Notable gaps in **Press Coverage** and **Awards**.

## Recommended path

EB-1A self-petition is viable. Profile clears 4 of the 10 evidentiary criteria today; recommend filing once 2 more are reinforced (target: **5 strong + 1 supplementary**).

## Strategy

1. **Press push** — secure 2 long-form features (TechCrunch profile, technical blog interview).
2. **Awards** — submit to ACM Best Paper, Forbes 30U30, A16Z OSS Grant.
3. **Letters** — collect 6 recommendation letters: 3 independent experts, 2 collaborators, 1 employer.
4. **Original contributions** — quantify impact: cite production deployments, downstream papers, dollar-impact.
5. **File I-140 with Premium Processing** in Q3 2026.

## Estimated timeline

| Phase | Estimate |
|---|---|
| Evidence completion | 8 weeks |
| Letter drafting & review | 4 weeks |
| Petition assembly | 3 weeks |
| USCIS adjudication (PP) | 15 calendar days |

## Confidence

Readiness Score **62 / 100**. Reaching **80** requires closing the Press and Awards issues.
`;

  const criteria = VISA_CRITERIA.eb1a.map((c) => {
    const scoresById: Record<string, { score: number; reasoning: string; evidenceIds: string[] }> = {
      awards: {
        score: 15,
        reasoning: "No nationally-recognized awards yet. ACM submission pending.",
        evidenceIds: [],
      },
      memberships: {
        score: 40,
        reasoning: "ACM and IEEE membership noted; neither requires outstanding-achievement vetting.",
        evidenceIds: ["ev-membership-acm"],
      },
      press: {
        score: 20,
        reasoning: "Single Medium feature found. Insufficient for major-media criterion.",
        evidenceIds: ["ev-press-medium"],
      },
      judging: {
        score: 45,
        reasoning: "NeurIPS workshop reviewer 2024–2025. Conference-level judging documented.",
        evidenceIds: ["ev-judging-neurips"],
      },
      "original-contributions": {
        score: 85,
        reasoning: "2 patents + 1.2k-star OSS library used in 4 production stacks.",
        evidenceIds: ["ev-patent-1", "ev-patent-2", "ev-oss-stars"],
      },
      authorship: {
        score: 70,
        reasoning: "7 peer-reviewed papers, 240 citations, h-index 5.",
        evidenceIds: ["ev-pub-1", "ev-pub-2", "ev-pub-3"],
      },
      exhibitions: {
        score: 0,
        reasoning: "Not applicable to STEM petition.",
        evidenceIds: [],
      },
      "critical-role": {
        score: 78,
        reasoning: "ML Tech Lead at Series B; led team of 6, owned platform serving 2M users.",
        evidenceIds: ["ev-letter-employer"],
      },
      "high-salary": {
        score: 55,
        reasoning: "Comp at 75th percentile per BLS; documentation needed.",
        evidenceIds: [],
      },
      "commercial-success": {
        score: 0,
        reasoning: "Not applicable to STEM petition.",
        evidenceIds: [],
      },
    };
    const m = scoresById[c.id];
    return { ...c, ...m };
  });

  const issues: Case["issues"] = [
    {
      number: 1,
      title: "Missing recommendation letter from Prof. Chen",
      body: "Letter from Prof. Chen (Stanford) was promised in March but not yet received. Independent expert letter is critical to satisfy authorship + original-contributions criteria.",
      state: "open",
      labels: ["blocker", "recommendation-letter", "priority-high"],
      criterionId: "original-contributions",
      suggestedActions: [
        "Send polite reminder email referencing March 14 conversation",
        "Offer to draft a starter version Prof. Chen can edit",
        "Suggest 30-min call to align on key claims",
      ],
      createdAt: nowIso(-7),
    },
    {
      number: 2,
      title: "Press coverage gap — only 1 article cited",
      body: "Petition needs 2-3 articles in major media (definition: Tier-1 publication, original reporting). Current evidence: 1 Medium feature (insufficient).",
      state: "open",
      labels: ["evidence", "press", "priority-high"],
      criterionId: "press",
      suggestedActions: [
        "Pitch TechCrunch with patent #2 angle",
        "Reach out to Lex Fridman / Latent Space podcast",
        "Get featured in ACM Tech News",
      ],
      createdAt: nowIso(-5),
    },
    {
      number: 3,
      title: "Award submissions pending",
      body: "ACM Best Paper submission deadline: June 15. Forbes 30U30 nomination window opens August.",
      state: "open",
      labels: ["award", "priority-high"],
      criterionId: "awards",
      suggestedActions: [
        "Finalize ACM Best Paper PDF by June 1",
        "Identify nominator for Forbes 30U30",
        "Submit A16Z Open-Source Grant application",
      ],
      createdAt: nowIso(-3),
    },
    {
      number: 4,
      title: "Salary documentation missing",
      body: "Need offer letter, W-2, and BLS comparison data to substantiate high-salary criterion.",
      state: "open",
      labels: ["evidence", "form"],
      criterionId: "high-salary",
      suggestedActions: [
        "Request HR letter quoting current base + bonus",
        "Pull BLS percentile data for ML engineer NYC",
      ],
      createdAt: nowIso(-2),
    },
    {
      number: 5,
      title: "Citation count screenshot needed",
      body: "Google Scholar h-index 5, 240 citations. Need timestamped screenshot.",
      state: "open",
      labels: ["evidence", "publication", "good-first-task"],
      criterionId: "authorship",
      suggestedActions: [
        "Screenshot Google Scholar profile",
        "Export citation list as PDF",
      ],
      createdAt: nowIso(-1),
    },
    {
      number: 6,
      title: "Patent USPTO certified copies",
      body: "Need certified copies of patents US-11,234,567 and US-11,345,678.",
      state: "open",
      labels: ["evidence", "form"],
      criterionId: "original-contributions",
      suggestedActions: ["Order certified copies from USPTO ($25 each)"],
      createdAt: nowIso(-1),
    },
    {
      number: 7,
      title: "Draft narrative for original-contributions section",
      body: "Need a 2-page narrative tying patents + OSS + papers into a coherent contributions story.",
      state: "open",
      labels: ["narrative"],
      criterionId: "original-contributions",
      suggestedActions: ["Outline 3 contribution arcs", "Draft 2 paragraphs per arc"],
      createdAt: nowIso(0),
    },
    {
      number: 8,
      title: "Identify 6th recommender",
      body: "Have 5 confirmed recommenders. Need 1 more independent expert.",
      state: "open",
      labels: ["recommendation-letter"],
      criterionId: "original-contributions",
      suggestedActions: [
        "Ask Prof. Chen for intro to her former PhD",
        "Reach out to OSS library maintainer who cited the work",
      ],
      createdAt: nowIso(0),
    },
    {
      number: 9,
      title: "Patent USPTO citation collected",
      body: "USPTO citation pulled and added to evidence/.",
      state: "closed",
      labels: ["evidence"],
      criterionId: "original-contributions",
      suggestedActions: [],
      createdAt: nowIso(-10),
    },
    {
      number: 10,
      title: "Initial profile parsed and structured",
      body: "Resume + LinkedIn + GitHub parsed. Initial criterion mapping complete.",
      state: "closed",
      labels: ["good-first-task"],
      suggestedActions: [],
      createdAt: nowIso(-14),
    },
  ];

  const releases: Case["releases"] = [
    {
      tag: "v0.4",
      title: "I-140 Filed (target)",
      body: "Petition assembled, signed, mailed to USCIS Texas Service Center with Premium Processing.",
      state: "upcoming",
      date: nowIso(60),
    },
    {
      tag: "v0.3",
      title: "Letters Collected",
      body: "All 6 recommendation letters received and reviewed.",
      state: "upcoming",
      date: nowIso(28),
      isLatest: true,
    },
    {
      tag: "v0.2",
      title: "Evidence Mapped",
      body: "Every artifact tagged to one or more EB-1A criteria.",
      state: "shipped",
      date: nowIso(-7),
    },
    {
      tag: "v0.1",
      title: "Case Initialized",
      body: "Resume, LinkedIn, GitHub, publications ingested. Strategy README generated.",
      state: "shipped",
      date: nowIso(-14),
    },
  ];

  const evidence: Case["evidence"] = [
    {
      id: "ev-patent-1",
      title: "US Patent 11,234,567 — Adaptive ML Pipeline",
      folder: "evidence",
      type: "patent",
      satisfies: ["original-contributions"],
      note: "Primary inventor. Granted 2024.",
      addedAt: nowIso(-12),
    },
    {
      id: "ev-patent-2",
      title: "US Patent 11,345,678 — Streaming Embedding Cache",
      folder: "evidence",
      type: "patent",
      satisfies: ["original-contributions"],
      note: "Primary inventor. Granted 2025.",
      addedAt: nowIso(-12),
    },
    {
      id: "ev-pub-1",
      title: "NeurIPS 2024 — Sparse Mixture-of-Experts at Inference",
      folder: "evidence",
      type: "publication",
      satisfies: ["authorship", "original-contributions"],
      note: "First author. 86 citations.",
      addedAt: nowIso(-12),
    },
    {
      id: "ev-pub-2",
      title: "ICML 2023 — Calibrated Uncertainty for LLMs",
      folder: "evidence",
      type: "publication",
      satisfies: ["authorship"],
      note: "Co-author. 102 citations.",
      addedAt: nowIso(-12),
    },
    {
      id: "ev-pub-3",
      title: "TMLR 2025 — Edge Inference Benchmarks",
      folder: "evidence",
      type: "publication",
      satisfies: ["authorship"],
      addedAt: nowIso(-10),
    },
    {
      id: "ev-oss-stars",
      title: "fastlite — 1.2k GitHub stars, 240 forks",
      folder: "evidence",
      type: "code",
      satisfies: ["original-contributions"],
      note: "Used in production at 4 documented startups.",
      addedAt: nowIso(-10),
    },
    {
      id: "ev-press-medium",
      title: "Medium feature — How fastlite changed our latency budget",
      folder: "evidence",
      type: "press",
      satisfies: ["press"],
      note: "Insufficient on its own — need Tier-1 outlet.",
      addedAt: nowIso(-9),
    },
    {
      id: "ev-judging-neurips",
      title: "NeurIPS Workshop Reviewer 2024 + 2025",
      folder: "evidence",
      type: "other",
      satisfies: ["judging"],
      addedAt: nowIso(-8),
    },
    {
      id: "ev-membership-acm",
      title: "ACM Senior Member",
      folder: "evidence",
      type: "other",
      satisfies: ["memberships"],
      addedAt: nowIso(-8),
    },
    {
      id: "ev-letter-employer",
      title: "Employer letter — Series B CTO",
      folder: "letters",
      type: "letter",
      satisfies: ["critical-role"],
      addedAt: nowIso(-5),
    },
  ];

  const commits: Case["commits"] = [
    {
      sha: shortSha(),
      message: "ai: regenerate strategy after Patent #2 grant",
      author: "ai-assistant",
      date: nowIso(0),
    },
    {
      sha: shortSha(),
      message: "evidence: add fastlite OSS stars screenshot",
      author: owner,
      date: nowIso(-1),
    },
    {
      sha: shortSha(),
      message: "letters: recommendation v3 — Prof. Chen draft",
      author: "mentor-bot",
      date: nowIso(-2),
    },
    {
      sha: shortSha(),
      message: "narrative: strengthen original-contributions section",
      author: owner,
      date: nowIso(-3),
    },
    {
      sha: shortSha(),
      message: "forms: i-140 draft initialized",
      author: owner,
      date: nowIso(-4),
    },
  ];

  return {
    id: `${owner}/${name}`,
    owner,
    name,
    visa: "eb1a",
    description: input.description || "EB-1A petition · ML Engineer · Filing target Q3 2026",
    visibility: input.visibility,
    readme,
    readinessScore: 62,
    readinessAdvice: "Add 1 awards entry + 2 press articles to reach 80.",
    criteria,
    issues,
    releases,
    evidence,
    commits,
    topics: [...VISA_TOPICS.eb1a, "#stem", "#machine-learning", "#open-source"],
    createdAt: nowIso(-14),
    source: "mock",
  };
}

function buildGenericMock(input: OnboardingInputs): Case {
  const owner = input.owner;
  const name = input.name;
  const visa = input.visa;
  const criteriaSeed = VISA_CRITERIA[visa];
  const milestones = VISA_MILESTONES[visa];

  const criteria = criteriaSeed.map((c, i) => ({
    ...c,
    score: 35 + ((i * 13) % 50),
    reasoning: `AI assessment pending. Initial heuristic based on visa template defaults.`,
    evidenceIds: [],
  }));

  const overall =
    criteria.length > 0
      ? Math.round(criteria.reduce((a, c) => a + c.score, 0) / criteria.length)
      : 50;

  const releases = milestones.map((m, i) => ({
    tag: `v0.${i + 1}`,
    title: m,
    body: `Milestone ${i + 1} of ${milestones.length}.`,
    state: (i === 0 ? "shipped" : "upcoming") as "shipped" | "upcoming",
    date: nowIso(i === 0 ? -7 : i * 14),
    isLatest: i === 1,
  }));

  return {
    id: `${owner}/${name}`,
    owner,
    name,
    visa,
    description: input.description || `${VISA_LABELS[visa]} case`,
    visibility: input.visibility,
    readme: `# ${VISA_LABELS[visa]} · ${owner}/${name}\n\n${input.description || "Case initialized."}\n\n## Strategy\n\nDraft strategy will appear here once Featherless.ai analyzes your inputs.`,
    readinessScore: overall,
    readinessAdvice: "Upload more evidence to refine the readiness score.",
    criteria,
    issues: [
      {
        number: 1,
        title: "Initial profile parsing required",
        body: "Run AI analysis on uploaded documents to populate criteria scores.",
        state: "open",
        labels: ["good-first-task"],
        suggestedActions: ["Upload resume", "Upload offer letter", "Add LinkedIn URL"],
        createdAt: nowIso(0),
      },
    ],
    releases,
    evidence: [],
    commits: [
      {
        sha: shortSha(),
        message: "init: case repository created from " + visa + " template",
        author: owner,
        date: nowIso(0),
      },
    ],
    topics: VISA_TOPICS[visa],
    createdAt: nowIso(0),
    source: "mock",
  };
}
