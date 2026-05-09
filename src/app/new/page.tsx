"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  RepoIcon,
  RepoTemplateIcon,
  LockIcon,
  GlobeIcon,
  TriangleDownIcon,
  UploadIcon,
  CheckCircleFillIcon,
  InfoIcon,
  XIcon,
  FileIcon,
  ZapIcon,
  AlertIcon,
} from "@primer/octicons-react";
import { createCase } from "./actions";
import { saveCase } from "@/lib/case-store";
import type { VisaTemplate, Visibility } from "@/lib/types";

const VISA_TEMPLATES: { id: VisaTemplate; label: string; desc: string }[] = [
  { id: "none", label: "No template", desc: "Start from scratch" },
  {
    id: "eb1a",
    label: "EB-1A · Extraordinary Ability",
    desc: "Green card · 10 evidentiary criteria · self-petition",
  },
  {
    id: "eb2-niw",
    label: "EB-2 NIW · National Interest Waiver",
    desc: "Green card · 3-prong Dhanasar test · self-petition",
  },
  {
    id: "o1a",
    label: "O-1A · Extraordinary Ability",
    desc: "Non-immigrant · 8 criteria · employer-petitioned",
  },
  {
    id: "h1b",
    label: "H-1B · Specialty Occupation",
    desc: "Non-immigrant · cap-subject · employer-petitioned",
  },
];

const FUN_NAMES = [
  "super-pan-2026",
  "extraordinary-ability-quest",
  "the-eb1a-saga",
  "petition-prime",
  "visa-velocity",
];

const PROGRESS_STEPS = [
  "Reading your inputs...",
  "Mapping evidence to USCIS criteria...",
  "Drafting your visa strategy...",
  "Filing initial issues for every gap...",
  "Tagging milestones as releases...",
];

export default function NewCasePage() {
  const router = useRouter();
  const [owner] = useState("panforrest");
  const [repoName, setRepoName] = useState("eb1a-2026");
  const [description, setDescription] = useState(
    "EB-1A petition · ML Engineer · Filing target Q3 2026"
  );
  const [visibility, setVisibility] = useState<Visibility>("private");
  const [template, setTemplate] = useState<VisaTemplate>("eb1a");
  const [initReadme, setInitReadme] = useState(true);
  const [initRedaction, setInitRedaction] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const placeholder = FUN_NAMES[0];
  const repoNameValid = /^[a-z0-9][a-z0-9-]*$/i.test(repoName);

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!repoNameValid) return;
    setError(null);
    setSubmitting(true);
    setProgressStep(0);

    const progressTimer = setInterval(() => {
      setProgressStep((s) =>
        s < PROGRESS_STEPS.length - 1 ? s + 1 : s
      );
    }, 700);

    try {
      const result = await createCase({
        owner,
        name: repoName,
        description,
        visa: template,
        visibility,
        initReadme,
        initRedaction,
        files: files.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type || "application/octet-stream",
        })),
      });

      clearInterval(progressTimer);

      if (!result.ok) {
        setError(result.error);
        setSubmitting(false);
        return;
      }

      saveCase(result.case);
      setProgressStep(PROGRESS_STEPS.length - 1);
      setTimeout(() => router.push(`/${owner}/${repoName}`), 250);
    } catch (err) {
      clearInterval(progressTimer);
      setError(err instanceof Error ? err.message : "Unknown error");
      setSubmitting(false);
    }
  }

  if (submitting) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div
          className="rounded-md border p-8"
          style={{
            borderColor: "var(--gh-border-default)",
            background: "var(--gh-canvas-subtle)",
          }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: "var(--gh-attention-fg)" }}>
              <ZapIcon size={20} />
            </span>
            <h2 className="text-lg font-semibold">
              Generating your case repository
            </h2>
          </div>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            Featherless.ai is reading your inputs and building a structured
            Case Repo. This typically takes 5–15 seconds.
          </p>

          <ul className="mt-6 space-y-2.5">
            {PROGRESS_STEPS.map((label, i) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                {i < progressStep ? (
                  <span style={{ color: "var(--gh-success-fg)" }}>
                    <CheckCircleFillIcon size={16} />
                  </span>
                ) : i === progressStep ? (
                  <span
                    className="inline-flex h-4 w-4 rounded-full border-2 animate-spin"
                    style={{
                      borderColor: "var(--gh-attention-fg) transparent transparent transparent",
                    }}
                  />
                ) : (
                  <span
                    className="inline-flex h-4 w-4 rounded-full border"
                    style={{ borderColor: "var(--gh-border-default)" }}
                  />
                )}
                <span
                  style={{
                    color:
                      i <= progressStep
                        ? "var(--gh-fg-default)"
                        : "var(--gh-fg-muted)",
                  }}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header
        className="pb-6 border-b"
        style={{ borderColor: "var(--gh-border-muted)" }}
      >
        <h1 className="text-2xl font-semibold">
          Create a new case repository
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          A case repository contains your visa journey: evidence, narrative,
          mentor reviews, milestones, and an AI-generated strategy. Required
          fields are marked with an asterisk{" "}
          <span style={{ color: "var(--gh-danger-fg)" }}>*</span>.
        </p>
      </header>

      {error && (
        <div
          className="mt-6 rounded-md border p-4 flex items-start gap-3"
          style={{
            borderColor: "var(--gh-danger-fg)",
            background: "var(--gh-danger-subtle)",
          }}
        >
          <span style={{ color: "var(--gh-danger-fg)" }}>
            <AlertIcon size={16} />
          </span>
          <div className="text-sm">
            <div className="font-semibold">Generation failed</div>
            <div style={{ color: "var(--gh-fg-muted)" }}>{error}</div>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8 pt-8">
        <Field
          label="Repository name"
          required
          hint={
            repoNameValid && repoName ? (
              <span
                className="inline-flex items-center gap-1"
                style={{ color: "var(--gh-success-fg)" }}
              >
                <CheckCircleFillIcon size={12} /> {owner}/{repoName} is
                available.
              </span>
            ) : (
              <>
                Great repository names are short and memorable. Need
                inspiration? How about{" "}
                <button
                  type="button"
                  className="gh-link"
                  onClick={() => setRepoName(placeholder)}
                >
                  {placeholder}
                </button>
                ?
              </>
            )
          }
        >
          <div className="flex items-stretch gap-2 flex-wrap">
            <button
              type="button"
              className="gh-btn flex items-center gap-2"
              style={{ minWidth: 180 }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#1f6feb] to-[#a371f7] text-[10px] font-semibold text-white"
                aria-hidden
              >
                FP
              </span>
              {owner}
              <TriangleDownIcon size={12} />
            </button>
            <span
              className="self-center text-xl font-light"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              /
            </span>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 min-w-[200px] rounded-md border px-3 py-1.5 text-sm font-mono outline-none focus:border-[var(--gh-accent-emphasis)]"
              style={{
                borderColor:
                  repoName && !repoNameValid
                    ? "var(--gh-danger-fg)"
                    : "var(--gh-border-default)",
                background: "var(--gh-canvas-default)",
                color: "var(--gh-fg-default)",
              }}
            />
          </div>
        </Field>

        <Field
          label="Description"
          hint={<>Optional. Give your case a one-line summary.</>}
        >
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. EB-1A · ML Engineer · Filing target Q3 2026"
            className="w-full rounded-md border px-3 py-1.5 text-sm outline-none focus:border-[var(--gh-accent-emphasis)]"
            style={{
              borderColor: "var(--gh-border-default)",
              background: "var(--gh-canvas-default)",
            }}
          />
        </Field>

        <hr style={{ borderColor: "var(--gh-border-muted)" }} />

        <fieldset>
          <legend className="text-sm font-semibold mb-3">Visibility</legend>
          <div className="space-y-2">
            <VisibilityCard
              icon={<LockIcon size={16} />}
              label="Private"
              desc="You choose who can see and contribute to this case. Recommended for active filings."
              selected={visibility === "private"}
              onSelect={() => setVisibility("private")}
            />
            <VisibilityCard
              icon={<GlobeIcon size={16} />}
              label="Public"
              desc="Anyone can view. Useful only after approval, for sharing anonymized playbooks."
              selected={visibility === "public"}
              onSelect={() => setVisibility("public")}
            />
          </div>
        </fieldset>

        <hr style={{ borderColor: "var(--gh-border-muted)" }} />

        <Field
          label="Visa template"
          hint={
            <>
              <RepoTemplateIcon size={12} /> Templates pre-load USCIS
              evidentiary criteria, sample issues, and milestone releases for
              your visa path.
            </>
          }
        >
          <div className="space-y-2">
            {VISA_TEMPLATES.map((t) => (
              <label
                key={t.id}
                className="flex items-start gap-3 rounded-md border px-4 py-3 cursor-pointer transition-colors"
                style={{
                  borderColor:
                    template === t.id
                      ? "var(--gh-accent-emphasis)"
                      : "var(--gh-border-default)",
                  background:
                    template === t.id
                      ? "var(--gh-accent-subtle)"
                      : "var(--gh-canvas-default)",
                }}
              >
                <input
                  type="radio"
                  name="template"
                  checked={template === t.id}
                  onChange={() => setTemplate(t.id)}
                  className="mt-1 accent-[var(--gh-accent-emphasis)]"
                />
                <div>
                  <div className="text-sm font-semibold">{t.label}</div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--gh-fg-muted)" }}
                  >
                    {t.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Field>

        <hr style={{ borderColor: "var(--gh-border-muted)" }} />

        <fieldset>
          <legend className="text-sm font-semibold mb-3">
            Initialize this case repository with:
          </legend>
          <div className="space-y-2">
            <Checkbox
              checked={initReadme}
              onChange={setInitReadme}
              title="Add a README"
              desc="Auto-generate your visa strategy summary from your inputs."
            />
            <Checkbox
              checked={initRedaction}
              onChange={setInitRedaction}
              title="Add PII redaction rules"
              desc="Our .gitignore-style filter for personal info before any community contribution."
            />
          </div>
        </fieldset>

        <hr style={{ borderColor: "var(--gh-border-muted)" }} />

        <Field
          label="Initialize from your story"
          hint={
            <>
              <InfoIcon size={12} /> Drop your resume, offer letter,
              recommendation drafts, publications. PDF · DOCX · TXT · MD.
            </>
          }
        >
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className="rounded-md border-2 border-dashed px-6 py-10 text-center transition-colors"
            style={{
              borderColor: dragOver
                ? "var(--gh-accent-emphasis)"
                : "var(--gh-border-default)",
              background: dragOver
                ? "var(--gh-accent-subtle)"
                : "var(--gh-canvas-subtle)",
            }}
          >
            <UploadIcon size={32} className="mx-auto opacity-60" />
            <p className="mt-3 text-sm font-semibold">
              Drag and drop files here
            </p>
            <p
              className="mt-1 text-xs"
              style={{ color: "var(--gh-fg-muted)" }}
            >
              or{" "}
              <label className="gh-link cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setFiles((prev) => [
                      ...prev,
                      ...Array.from(e.target.files ?? []),
                    ])
                  }
                />
                browse to upload
              </label>
            </p>
            <p
              className="mt-3 text-xs"
              style={{ color: "var(--gh-fg-subtle)" }}
            >
              Files stay local in this session. Nothing is uploaded until you
              click Create.
            </p>
          </div>

          {files.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {files.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm"
                  style={{
                    borderColor: "var(--gh-border-default)",
                    background: "var(--gh-canvas-default)",
                  }}
                >
                  <FileIcon size={14} className="opacity-60" />
                  <span className="font-mono text-xs flex-1 truncate">
                    {f.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--gh-fg-muted)" }}
                  >
                    {(f.size / 1024).toFixed(1)} KB
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="opacity-60 hover:opacity-100"
                    aria-label="Remove"
                  >
                    <XIcon size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Field>

        <hr style={{ borderColor: "var(--gh-border-muted)" }} />

        <div className="flex items-center justify-end gap-3">
          <Link href="/" className="gh-btn">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!repoNameValid}
            className="gh-btn gh-btn-primary"
            style={{
              opacity: repoNameValid ? 1 : 0.5,
              cursor: repoNameValid ? "pointer" : "not-allowed",
            }}
          >
            <RepoIcon size={16} />
            Create case repository
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
        {required && (
          <span
            className="ml-1"
            style={{ color: "var(--gh-danger-fg)" }}
            aria-hidden
          >
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p
          className="mt-2 text-xs flex items-center gap-1"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function VisibilityCard({
  icon,
  label,
  desc,
  selected,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className="flex items-start gap-3 rounded-md border px-4 py-3 cursor-pointer transition-colors"
      style={{
        borderColor: selected
          ? "var(--gh-accent-emphasis)"
          : "var(--gh-border-default)",
        background: selected
          ? "var(--gh-accent-subtle)"
          : "var(--gh-canvas-default)",
      }}
    >
      <input
        type="radio"
        name="visibility"
        checked={selected}
        onChange={onSelect}
        className="mt-1 accent-[var(--gh-accent-emphasis)]"
      />
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          {icon} {label}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          {desc}
        </div>
      </div>
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
  title,
  desc,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  desc: string;
}) {
  return (
    <label
      className="flex items-start gap-3 cursor-pointer text-sm"
      style={{ color: "var(--gh-fg-default)" }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-[var(--gh-accent-emphasis)]"
      />
      <span>
        <span className="font-semibold">{title}</span>
        <span
          className="block text-xs"
          style={{ color: "var(--gh-fg-muted)" }}
        >
          {desc}
        </span>
      </span>
    </label>
  );
}
