"use client";

import Link from "next/link";
import {
  MarkGithubIcon,
  SearchIcon,
  PlusIcon,
  TriangleDownIcon,
  ThreeBarsIcon,
  BellIcon,
  InboxIcon,
} from "@primer/octicons-react";

/**
 * SiteHeader — pixel-faithful clone of github.com's top nav.
 * Black bar, octicon mark, "/" search, +/avatar dropdowns.
 *
 * For ImmigrationHack we substitute the Octocat with a custom mark
 * but keep the layout identical so the brain registers "GitHub".
 */
export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        background: "var(--gh-header-bg)",
        borderColor: "var(--gh-header-border)",
      }}
    >
      <div className="flex h-[62px] items-center gap-4 px-4 lg:px-6">
        {/* Mobile: hamburger (decorative) */}
        <button
          className="md:hidden text-[var(--gh-fg-default)]"
          aria-label="Open menu"
        >
          <ThreeBarsIcon size={24} />
        </button>

        {/* Logo: GitHub mark + ImmigrationHack wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--gh-fg-default)] hover:text-white"
          aria-label="ImmigrationHack home"
        >
          <MarkGithubIcon size={32} />
          <span className="hidden md:inline-block font-semibold text-[15px] tracking-tight">
            ImmigrationHack
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex-1 max-w-[480px] hidden md:block">
          <button
            className="group flex w-full items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
            style={{
              borderColor: "var(--gh-border-default)",
              background: "var(--gh-canvas-default)",
              color: "var(--gh-fg-muted)",
            }}
          >
            <SearchIcon size={16} />
            <span className="flex-1 text-left">Search or jump to...</span>
            <kbd
              className="rounded border px-1.5 py-0.5 text-[11px] font-mono"
              style={{
                borderColor: "var(--gh-border-default)",
                color: "var(--gh-fg-muted)",
              }}
            >
              /
            </kbd>
          </button>
        </div>

        {/* Primary nav links (GitHub: Pull requests, Issues, Marketplace, Explore) */}
        <nav className="hidden lg:flex items-center gap-3 text-sm">
          <Link
            href="#"
            className="text-[var(--gh-fg-default)] hover:text-white transition-colors"
          >
            Pull requests
          </Link>
          <Link
            href="#"
            className="text-[var(--gh-fg-default)] hover:text-white transition-colors"
          >
            Issues
          </Link>
          <Link
            href="/explore"
            className="text-[var(--gh-fg-default)] hover:text-white transition-colors"
          >
            Explore
          </Link>
        </nav>

        {/* Right cluster: + dropdown, notifications, avatar */}
        <div className="ml-auto flex items-center gap-3">
          <button
            className="hidden md:flex items-center gap-1 rounded-md p-1.5 text-[var(--gh-fg-default)] hover:bg-[var(--gh-canvas-subtle)]"
            aria-label="Create new"
          >
            <PlusIcon size={16} />
            <TriangleDownIcon size={12} />
          </button>

          <button
            className="hidden md:flex rounded-md p-1.5 text-[var(--gh-fg-default)] hover:bg-[var(--gh-canvas-subtle)]"
            aria-label="Inbox"
          >
            <InboxIcon size={16} />
          </button>

          <button
            className="hidden md:flex rounded-md p-1.5 text-[var(--gh-fg-default)] hover:bg-[var(--gh-canvas-subtle)]"
            aria-label="Notifications"
          >
            <BellIcon size={16} />
          </button>

          {/* Avatar */}
          <button
            className="flex items-center gap-1"
            aria-label="Account menu"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1f6feb] to-[#a371f7] text-xs font-semibold text-white"
              aria-hidden
            >
              FP
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
