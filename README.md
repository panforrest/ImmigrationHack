# ImmigrationHack — GitHub for Immigration

> Every immigration journey is a repo. Every missing artifact is an issue. Every helper review is a pull request. Every milestone is a release. Every approved case can pay it forward.

Built at **Build for the Border — Immigrant Hackathon NYC** (May 9, 2026).

---

## 🎯 What it is

A case workspace for visa & green-card journeys (O-1, EB-1A, EB-2 NIW, H-1B). Drop in your resume, offer letter, LinkedIn, and publications — get back a structured **Case Repo**: visa strategy README, gap-analysis Issues, milestone Releases, an Evidence Graph mapping your artifacts to USCIS criteria, live research from Tavily, and an AI assistant that knows your full case.

Optionally, contribute your **anonymized playbook** back to the community when you're approved — so the next immigrant doesn't start from zero.

## 🧰 Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Featherless.ai** — LLM (parsing, scoring, drafting, chat)
- **Tavily** — real-time web research
- **Alai** — pitch deck generation
- **reactflow** — Evidence Graph
- **Vercel** — deployment

## 🏁 Getting started

```bash
# 1. Install
npm install

# 2. Set up env
cp .env.example .env.local
# fill in FEATHERLESS_API_KEY and TAVILY_API_KEY

# 3. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🏆 Sponsor integrations

- **Featherless.ai** — every AI surface (Case Repo generation, Readiness Score, gap analysis, chat assistant)
- **Tavily** — Research tab (USCIS processing times, RFE patterns, employer H-1B history, latest policy news)
- **Alai** — auto-generates the immigrant's advocacy / pitch deck for lawyers, sponsors, and recommenders

## 👤 Author

[Forrest Pan](https://github.com/panforrest) · [LinkedIn](https://www.linkedin.com/in/forrest-pan-153733232/) · [YouTube](https://www.youtube.com/@forrestpan1761)

## 📝 License

MIT
