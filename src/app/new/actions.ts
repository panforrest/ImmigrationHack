"use server";

import type { Case, OnboardingInputs } from "@/lib/types";
import { generateCase, isLLMAvailable } from "@/lib/featherless";

export interface CreateCaseResult {
  ok: true;
  case: Case;
  usedAI: boolean;
}

export interface CreateCaseError {
  ok: false;
  error: string;
}

/**
 * Server action — turns onboarding inputs into a Case via Featherless.ai
 * (or a rich mock if no key is configured).
 */
export async function createCase(
  input: OnboardingInputs
): Promise<CreateCaseResult | CreateCaseError> {
  try {
    if (!input.owner || !input.name) {
      return { ok: false, error: "Owner and name are required." };
    }
    if (!/^[a-z0-9][a-z0-9-]*$/i.test(input.name)) {
      return {
        ok: false,
        error: "Repository name must be alphanumeric with hyphens.",
      };
    }

    const generated = await generateCase(input);
    return { ok: true, case: generated, usedAI: isLLMAvailable() && generated.source === "ai" };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
