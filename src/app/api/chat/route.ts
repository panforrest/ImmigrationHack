import { NextRequest } from "next/server";
import OpenAI from "openai";
import type { Case } from "@/lib/types";

export const runtime = "nodejs";

const SYSTEM_PROMPT = (c: Case) => `You are the AI strategist for an immigration Case Repo on ImmigrationHack.
You know the applicant's full case below. Be concise, direct, and never offer legal advice — you organize evidence and draft strategy.

Case context (JSON):
- visa: ${c.visa}
- description: ${c.description}
- readinessScore: ${c.readinessScore}
- readinessAdvice: ${c.readinessAdvice}
- topCriteria: ${c.criteria
  .slice()
  .sort((a, b) => b.score - a.score)
  .slice(0, 5)
  .map((cr) => `${cr.label}=${cr.score}`)
  .join(", ")}
- weakCriteria: ${c.criteria
  .filter((cr) => cr.score < 40)
  .map((cr) => cr.label)
  .join(", ") || "none"}
- openIssues: ${c.issues.filter((i) => i.state === "open").length}
- topIssues: ${c.issues
  .filter((i) => i.state === "open")
  .slice(0, 5)
  .map((i) => `#${i.number} ${i.title}`)
  .join("; ")}

Respond in 1-3 short paragraphs. When listing things, use bullets with •.
When drafting documents (emails, letters), put the draft in a fenced code block.
End with one suggested follow-up question the user might ask.`;

export async function POST(req: NextRequest) {
  const { caseData, message, history } = (await req.json()) as {
    caseData: Case;
    message: string;
    history: { role: "user" | "assistant"; content: string }[];
  };

  const apiKey = process.env.FEATHERLESS_API_KEY?.trim();
  if (!apiKey) {
    return new Response(
      mockReply(message, caseData),
      { headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.featherless.ai/v1",
  });

  const stream = await client.chat.completions.create({
    model: process.env.FEATHERLESS_MODEL || "meta-llama/Meta-Llama-3.1-8B-Instruct",
    stream: true,
    temperature: 0.7,
    max_tokens: 700,
    messages: [
      { role: "system", content: SYSTEM_PROMPT(caseData) },
      ...history.slice(-6),
      { role: "user", content: message },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices?.[0]?.delta?.content ?? "";
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            "\n\n[Connection interrupted — please try again or refresh.]"
          )
        );
        console.error("[chat] stream error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function mockReply(message: string, c: Case): string {
  const lc = message.toLowerCase();
  if (lc.includes("weak")) {
    const weak = c.criteria.filter((cr) => cr.score < 40);
    return `Your weakest area${weak.length === 1 ? " is" : "s are"}:\n\n${weak
      .map((w) => `• **${w.label}** at ${w.score}% — ${w.reasoning}`)
      .join("\n")}\n\nClosing the highest-priority gap typically lifts the overall Readiness Score by 8-12 points.\n\nFollow-up: *Want me to draft a 30-day plan to close the press gap?*`;
  }
  if (lc.includes("press") || lc.includes("media")) {
    return `Drafted outreach below:\n\n\`\`\`\nSubject: Story idea — ML engineer's open-source library used in production at 4 startups\n\nHi [Reporter],\n\nI saw your recent piece on [topic]. I'd love to share a story that might fit your beat...\n\`\`\`\n\nFollow-up: *Want me to identify 5 reporters who cover ML/immigration?*`;
  }
  return `Based on your case (Readiness ${c.readinessScore}/100, ${c.issues.filter(
    (i) => i.state === "open"
  ).length} open issues), here's my read:\n\n• Your strongest pillar is **Original Contributions**\n• Your biggest blockers are **Press** and **Awards**\n• Recommended next 7-day focus: close issue #1 (recommendation letter) and submit ACM Best Paper\n\nFollow-up: *What concrete steps should I take this week?*`;
}
