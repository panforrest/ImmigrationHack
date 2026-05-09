<div align="center">

# ImmigrationHack

### GitHub for Immigration

> Every immigration journey is a repo.  
> Every missing artifact is an issue.  
> Every helper review is a pull request.  
> Every milestone is a release.  
> Every approved case can pay it forward.

Built at **Build for the Border — Immigrant Hackathon NYC** · May 9, 2026

🚀 **Live demo:** [immigration-hack.vercel.app](https://immigration-hack.vercel.app)

</div>

---

## The problem

Every year, millions of brilliant people try to move to, build in, or stay in the US — and get crushed by a system designed for no one. Lawyers cost $5K–$25K per case. Timelines are brutal. Documents live in a graveyard of email threads, Google Drives, and Slack DMs. There is no version control, no review workflow, no progress tracker, no shared playbook.

Engineers ship code with `git`, code review, CI, and release notes. Immigrants ship the most consequential project of their lives with **none of that infrastructure**.

**ImmigrationHack fixes that.**

---

## The product

A case workspace for visa & green-card journeys (O-1, EB-1A, EB-2 NIW, H-1B). Drop in your resume, offer letter, LinkedIn, and publications — the AI returns a full **Case Repo**: visa strategy README, gap-analysis Issues, milestone Releases, an Evidence Graph mapping artifacts to USCIS criteria, live research from Tavily, and an AI assistant that knows your full case.

When you're approved, optionally contribute your **anonymized playbook** back to the community — so the next immigrant doesn't start from zero.

## The mapping

The entire app speaks fluent GitHub. Judges, immigrants, and lawyers all "get it" instantly.

| GitHub primitive | In ImmigrationHack |
|---|---|
| **Repository** | A Case (one per visa journey) — `you/eb1a-2026` |
| **README.md** | AI-generated visa strategy & eligibility analysis |
| **Issues** | Missing artifacts, evidentiary gaps, blockers |
| **Pull Requests** | Mentor / lawyer / friend reviews of letter & narrative drafts |
| **Commits** | Every document upload or narrative revision |
| **Releases** 🏷️ | Milestones — `PERM Filed`, `I-140 Approved`, `AOS Submitted`, `Green Card Received` |
| **Actions** ⚡ | Automated reminders & deadline checklists |
| **Contributors** | Recommenders, lawyer, mentor, employer rep |
| **Stars** ⭐ | Community endorsements (post-approval) |
| **Forks** 🍴 | "Use this approved playbook as my template" |
| **Topics** | `#eb1a` `#stem` `#machine-learning` `#approved` |
| **Public / Private** | Private by default; opt-in to community |
| **Explore** | Trending anonymized playbooks by visa & profession |

## Features

### Core (P0)

- **Case Repo Generator** — upload resume + offer + LinkedIn → AI builds the full case
- **Readiness Score (0–100)** — per-criterion subscores (the viral hook)
- **README tab** — auto-generated visa strategy in markdown
- **Issues tab** — every gap auto-filed with labels (`blocker`, `evidence`, `letter`)
- **Releases tab** — milestone timeline with estimated USCIS dates
- **Evidence Graph** — reactflow canvas mapping artifacts → criteria; gaps glow red
- **GitHub-faithful UI** — pixel-tuned to GitHub Dark Mode

### Wow (P1)

- **Research tab (Tavily)** — live USCIS processing times, RFE patterns, employer H-1B history
- **Pull Requests** — review threads on letter drafts with diff view
- **AI Chat Assistant** — knows your full case context; pre-loaded prompts
- **Community / Explore** — anonymized successful playbooks, browseable & forkable

### Stretch (P2)

- **Alai pitch deck** — auto-generated advocacy deck for lawyers / sponsors / recommenders
- **Recommender Hub** — shareable upload links, no account required
- **Visa path comparator** — O-1 vs EB-1A vs NIW for the same profile

## Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 14** (App Router) + **TypeScript** |
| Styling | **Tailwind CSS** + **shadcn/ui** with GitHub Dark Mode tokens |
| Icons | **@primer/octicons-react** (real GitHub icons) |
| AI / LLM | **Featherless.ai** (sponsor) — 25,000+ models, single API |
| Web search | **Tavily** (sponsor) — agentic web research |
| Pitch deck | **Alai** (sponsor) — generated advocacy deck |
| Graph viz | **reactflow** |
| Deploy | **Vercel** |

## Sponsor integrations

- **Featherless.ai** powers every AI surface — case generation, gap analysis, readiness scoring, narrative drafting, chat assistant.
- **Tavily** powers the Research tab — current USCIS processing times, recent RFE patterns, employer history, latest policy news.
- **Alai** generates the immigrant's advocacy deck for lawyers, sponsors, and recommenders.

## Getting started

```bash
git clone https://github.com/panforrest/ImmigrationHack
cd ImmigrationHack

cp .env.example .env.local
# Fill in FEATHERLESS_API_KEY and TAVILY_API_KEY

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Privacy

- Documents are processed in-session and **never logged**.
- All cases are private by default.
- Public contribution to community playbooks requires explicit opt-in *and* automated PII redaction.

## Project status

🚢 **Shipped** at the Immigrant Hackathon NYC — May 9, 2026.

| Step | Status |
|---|---|
| 0 · Repo + env scaffolding | ✅ |
| 1 · Next.js + Tailwind + GitHub design system | ✅ |
| 2 · Landing page | ✅ |
| 3 · Onboarding wizard | ✅ |
| 4 · Featherless.ai case generation | ✅ |
| 5 · Case Repo workspace shell | ✅ |
| 6 · README tab | ✅ |
| 7 · Issues tab | ✅ |
| 8 · Releases timeline | ⏳ |
| 9 · Evidence Graph | ✅ |
| 10 · Tavily Research tab | ✅ |
| 11 · AI Chat Assistant | ✅ |
| 12 · Community / Explore | ⏳ |
| 13 · Vercel deploy | ✅ |

## Team

Built in 8 hours at Build for the Border — Immigrant Hackathon NYC.

- **Forrest Pan** — [GitHub](https://github.com/panforrest) · [LinkedIn](https://www.linkedin.com/in/forrest-pan-153733232/) · [YouTube](https://www.youtube.com/@forrestpan1761)
- **Frank Yu**
- **Xun Liu**
- **Jin Thakur**

## License

MIT
