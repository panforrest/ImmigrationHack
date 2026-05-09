"use server";

import { tavilySearch, type TavilyResponse } from "@/lib/tavily";

export interface ResearchPanel {
  title: string;
  query: string;
  data: TavilyResponse;
}

export async function fetchResearch(
  visa: string,
  description: string
): Promise<ResearchPanel[]> {
  const queries = [
    {
      title: "USCIS Processing Times",
      query: `USCIS ${visa.toUpperCase()} processing time 2026 Texas Nebraska service center`,
    },
    {
      title: "Recent RFE Trends",
      query: `${visa.toUpperCase()} RFE patterns 2026 evidence requirements site:uscis.gov OR site:trackitt.com`,
    },
    {
      title: "Recent Approvals & Strategy",
      query: `${visa.toUpperCase()} approval ${description.split(" ").slice(0, 4).join(" ")} 2026`,
    },
  ];

  const results = await Promise.all(
    queries.map(async (q) => ({
      title: q.title,
      query: q.query,
      data: await tavilySearch(q.query, { maxResults: 4, includeAnswer: true }),
    }))
  );

  return results;
}
