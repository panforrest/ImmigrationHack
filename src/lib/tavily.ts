/**
 * Tavily client — agentic web search for the Research tab.
 * Falls back to seeded results when TAVILY_API_KEY is not set.
 */

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score?: number;
  publishedDate?: string;
}

export interface TavilyResponse {
  query: string;
  answer?: string;
  results: TavilyResult[];
  source: "tavily" | "mock";
}

const TAVILY_URL = "https://api.tavily.com/search";

export async function tavilySearch(
  query: string,
  opts: { maxResults?: number; includeAnswer?: boolean } = {}
): Promise<TavilyResponse> {
  const key = process.env.TAVILY_API_KEY?.trim();
  if (!key) {
    return mockResponse(query);
  }

  try {
    const r = await fetch(TAVILY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: key,
        query,
        max_results: opts.maxResults ?? 5,
        include_answer: opts.includeAnswer ?? true,
        search_depth: "basic",
      }),
      cache: "no-store",
    });
    if (!r.ok) throw new Error(`Tavily HTTP ${r.status}`);
    const json = await r.json();
    return {
      query,
      answer: json.answer,
      results: (json.results ?? []).map((x: TavilyResult) => ({
        title: x.title,
        url: x.url,
        content: x.content,
        score: x.score,
        publishedDate: x.publishedDate,
      })),
      source: "tavily",
    };
  } catch (err) {
    console.warn("[tavily] failed, falling back to mock:", err);
    return mockResponse(query);
  }
}

function mockResponse(query: string): TavilyResponse {
  return {
    query,
    answer:
      "USCIS EB-1A processing time at Texas Service Center for FY2026 averages 8.5 months for regular processing and 15 calendar days under Premium Processing. RFE rates trended down to 22% in Q1 2026.",
    results: [
      {
        title: "What to Expect in EB-1A Processing Times in 2026",
        url: "https://example.com/eb1a-2026",
        content:
          "Texas Service Center: 8.5 months median. Nebraska Service Center: 11 months median. Premium Processing remains 15 calendar days.",
        publishedDate: "2026-04-12",
      },
      {
        title: "USCIS Q1 2026 RFE Trends — Original Contributions Focus",
        url: "https://example.com/rfe-trends",
        content:
          "RFE rate dropped to 22% in Q1 2026. Most common RFE: documentation of original contributions' 'major significance' (citations, downstream impact, dollar value).",
        publishedDate: "2026-03-28",
      },
      {
        title: "Recent EB-1A Approvals — ML/AI Engineers",
        url: "https://example.com/approvals",
        content:
          "11 ML/AI engineers approved in March 2026. Common pattern: 5+ peer-reviewed papers, 1+ patent, OSS project with 1k+ stars, employer letters from senior leaders.",
        publishedDate: "2026-04-02",
      },
    ],
    source: "mock",
  };
}
