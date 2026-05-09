import type { VisaTemplate } from "./types";

/**
 * USCIS criteria taxonomy for each visa template.
 * Used to seed the AI prompt and for mock fallback.
 */

export const VISA_CRITERIA: Record<VisaTemplate, { id: string; label: string }[]> = {
  none: [],
  eb1a: [
    { id: "awards", label: "Nationally / Internationally Recognized Awards" },
    { id: "memberships", label: "Membership in Selective Associations" },
    { id: "press", label: "Published Material About You in Major Media" },
    { id: "judging", label: "Judging the Work of Others" },
    { id: "original-contributions", label: "Original Contributions of Major Significance" },
    { id: "authorship", label: "Authorship of Scholarly Articles" },
    { id: "exhibitions", label: "Display of Work at Artistic Exhibitions" },
    { id: "critical-role", label: "Leading / Critical Role at Distinguished Org" },
    { id: "high-salary", label: "High Salary Compared to Peers" },
    { id: "commercial-success", label: "Commercial Success in Performing Arts" },
  ],
  "eb2-niw": [
    { id: "substantial-merit", label: "Substantial Merit & National Importance" },
    { id: "well-positioned", label: "Well-Positioned to Advance the Endeavor" },
    { id: "balance-of-factors", label: "On Balance, Beneficial to Waive Job Offer" },
  ],
  o1a: [
    { id: "awards", label: "National / International Awards" },
    { id: "memberships", label: "Membership in Selective Associations" },
    { id: "press", label: "Press Coverage" },
    { id: "judging", label: "Judging Others' Work" },
    { id: "original-contributions", label: "Original Contributions of Major Significance" },
    { id: "authorship", label: "Scholarly Articles" },
    { id: "critical-role", label: "Critical Role at Distinguished Org" },
    { id: "high-salary", label: "High Remuneration" },
  ],
  h1b: [
    { id: "specialty-occupation", label: "Position is a Specialty Occupation" },
    { id: "degree-match", label: "Degree Matches Occupation" },
    { id: "employer-employee", label: "Bona Fide Employer-Employee Relationship" },
    { id: "lca", label: "Certified LCA on File" },
  ],
};

export const VISA_LABELS: Record<VisaTemplate, string> = {
  none: "Custom",
  eb1a: "EB-1A · Extraordinary Ability",
  "eb2-niw": "EB-2 NIW · National Interest Waiver",
  o1a: "O-1A · Extraordinary Ability",
  h1b: "H-1B · Specialty Occupation",
};

export const VISA_TOPICS: Record<VisaTemplate, string[]> = {
  none: [],
  eb1a: ["#eb1a", "#green-card", "#self-petition"],
  "eb2-niw": ["#eb2-niw", "#green-card", "#dhanasar"],
  o1a: ["#o1a", "#extraordinary-ability"],
  h1b: ["#h1b", "#specialty-occupation"],
};

export const VISA_MILESTONES: Record<VisaTemplate, string[]> = {
  none: [],
  eb1a: [
    "Case Initialized",
    "Evidence Mapped",
    "Letters Collected",
    "I-140 Filed",
    "I-140 Approved",
    "AOS / CP Filed",
    "Green Card Received",
  ],
  "eb2-niw": [
    "Case Initialized",
    "Endeavor Defined",
    "Letters Collected",
    "I-140 Filed",
    "I-140 Approved",
    "AOS / CP Filed",
    "Green Card Received",
  ],
  o1a: [
    "Case Initialized",
    "Evidence Mapped",
    "Letters Collected",
    "Consultation Letter",
    "I-129 Filed",
    "I-129 Approved",
    "Visa Stamping",
  ],
  h1b: [
    "Case Initialized",
    "LCA Filed",
    "LCA Certified",
    "Registration Submitted",
    "Cap Selection",
    "I-129 Filed",
    "I-129 Approved",
  ],
};
