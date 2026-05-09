import Link from "next/link";
import { MarkGithubIcon, HeartFillIcon } from "@primer/octicons-react";

export function SiteFooter() {
  return (
    <footer
      className="mt-24 border-t"
      style={{
        borderColor: "var(--gh-border-muted)",
        background: "var(--gh-canvas-default)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-4 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <MarkGithubIcon size={24} />
              <span className="font-semibold">ImmigrationHack</span>
            </div>
            <p
              className="mt-3 text-xs leading-relaxed"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              GitHub for Immigration. Organize evidence. Track milestones.
              Collaborate with mentors. Pay it forward.
            </p>
          </div>

          <div>
            <h4
              className="text-xs uppercase tracking-wider mb-3 font-semibold"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/new" className="gh-link">
                  Create case
                </Link>
              </li>
              <li>
                <Link href="/explore" className="gh-link">
                  Explore playbooks
                </Link>
              </li>
              <li>
                <Link href="#" className="gh-link">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xs uppercase tracking-wider mb-3 font-semibold"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              Sponsors
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://featherless.ai"
                  target="_blank"
                  className="gh-link"
                >
                  Featherless.ai
                </a>
              </li>
              <li>
                <a href="https://tavily.com" target="_blank" className="gh-link">
                  Tavily
                </a>
              </li>
              <li>
                <a href="https://getalai.com" target="_blank" className="gh-link">
                  Alai
                </a>
              </li>
              <li>
                <a
                  href="https://lovable.dev"
                  target="_blank"
                  className="gh-link"
                >
                  Lovable
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xs uppercase tracking-wider mb-3 font-semibold"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              Built by
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/panforrest"
                  target="_blank"
                  className="gh-link"
                >
                  @panforrest
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/forrest-pan-153733232/"
                  target="_blank"
                  className="gh-link"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@forrestpan1761"
                  target="_blank"
                  className="gh-link"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs"
          style={{
            borderColor: "var(--gh-border-muted)",
            color: "var(--gh-fg-muted)",
          }}
        >
          <p className="flex items-center gap-1.5">
            Built with{" "}
            <HeartFillIcon size={12} className="text-[var(--gh-danger-fg)]" />{" "}
            at Build for the Border NYC · May 9, 2026
          </p>
          <p>© 2026 ImmigrationHack · MIT Licensed</p>
        </div>
      </div>
    </footer>
  );
}
