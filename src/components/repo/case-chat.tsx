"use client";

import { useState, useRef, useEffect } from "react";
import {
  XIcon,
  PaperAirplaneIcon,
  SparkleFillIcon,
  ZapIcon,
} from "@primer/octicons-react";
import { useCase } from "@/lib/case-context";

type Msg = { role: "user" | "assistant"; content: string };

const PRESETS = [
  "What's my biggest weakness?",
  "Draft a press outreach email",
  "What should I focus on this week?",
  "Compare my profile to approved EB-1A cases",
];

/** Custom event used by RepoHeader's inline "Ask AI" button so it can
 *  toggle the assistant even when the floating launcher is hidden by
 *  a browser extension. */
export const ASK_CASE_EVENT = "immigrationhack:open-case-chat";

export function CaseChat() {
  const c = useCase();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  // Allow an external trigger (the inline header button) to open this drawer.
  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener(ASK_CASE_EVENT, handler);
    return () => document.removeEventListener(ASK_CASE_EVENT, handler);
  }, []);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseData: c,
          message: text,
          history: messages,
        }),
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = {
            role: "assistant",
            content: next[next.length - 1].content + chunk,
          };
          return next;
        });
      }
    } catch (err) {
      setMessages((m) => {
        const next = [...m];
        next[next.length - 1] = {
          role: "assistant",
          content:
            "[Sorry — chat is unavailable right now. " +
            (err instanceof Error ? err.message : "") +
            "]",
        };
        return next;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* Floating launcher — uses inline styles instead of utility classes
          like `fixed bottom-5 right-5 rounded-full z-50` so adblockers
          that match common chat-widget patterns don't hide it. */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open case copilot"
          data-role="case-copilot-launcher"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 2147483646,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            border: 0,
            borderRadius: 999,
            cursor: "pointer",
            background:
              "linear-gradient(135deg, #1f6feb 0%, #a371f7 100%)",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            boxShadow:
              "0 12px 32px rgba(56,139,253,0.45), 0 0 0 1px rgba(255,255,255,0.1)",
          }}
        >
          <SparkleFillIcon size={16} />
          <span>Ask your case</span>
        </button>
      )}

      {/* Drawer */}
      {open && (
        <div
          className="w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-2rem)] flex flex-col rounded-xl border overflow-hidden"
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 2147483646,
            background: "var(--gh-canvas-default)",
            borderColor: "var(--gh-border-default)",
            boxShadow:
              "0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(56,139,253,0.2)",
          }}
        >
          {/* Header */}
          <header
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{
              borderColor: "var(--gh-border-muted)",
              background:
                "linear-gradient(135deg, rgba(31,111,235,0.18), rgba(163,113,247,0.18))",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #1f6feb, #a371f7)",
                  color: "#fff",
                }}
              >
                <SparkleFillIcon size={14} />
              </span>
              <div>
                <div className="text-sm font-semibold leading-tight">
                  Case Assistant
                </div>
                <div
                  className="text-[10px] leading-tight"
                  style={{ color: "var(--gh-fg-muted)" }}
                >
                  {c.owner}/{c.name} · {c.criteria.length} criteria loaded
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="opacity-70 hover:opacity-100"
              aria-label="Close"
            >
              <XIcon size={16} />
            </button>
          </header>

          {/* Body */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <div
                  className="rounded-md border p-3 text-xs flex items-start gap-2"
                  style={{
                    borderColor: "var(--gh-border-default)",
                    background: "var(--gh-canvas-subtle)",
                  }}
                >
                  <span style={{ color: "var(--gh-accent-fg)" }}>
                    <ZapIcon size={12} />
                  </span>
                  <div style={{ color: "var(--gh-fg-muted)" }}>
                    I know your full case — Readiness {c.readinessScore}/100,{" "}
                    {c.issues.filter((i) => i.state === "open").length} open
                    issues. Ask anything.
                  </div>
                </div>
                <div
                  className="text-[10px] uppercase tracking-wider font-semibold"
                  style={{ color: "var(--gh-fg-muted)" }}
                >
                  Try asking
                </div>
                <div className="space-y-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => send(p)}
                      className="block w-full text-left rounded-md border px-3 py-2 text-xs hover:border-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-subtle)] transition-colors"
                      style={{
                        borderColor: "var(--gh-border-default)",
                        background: "var(--gh-canvas-subtle)",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                    style={{
                      background:
                        "linear-gradient(135deg, #1f6feb, #a371f7)",
                      color: "#fff",
                    }}
                  >
                    <SparkleFillIcon size={10} />
                  </span>
                )}
                <div
                  className="max-w-[85%] rounded-md px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed"
                  style={
                    m.role === "user"
                      ? {
                          background: "var(--gh-accent-emphasis)",
                          color: "#fff",
                        }
                      : {
                          background: "var(--gh-canvas-subtle)",
                          border: "1px solid var(--gh-border-default)",
                          color: "var(--gh-fg-default)",
                        }
                  }
                >
                  {m.content || (
                    <span
                      className="inline-flex gap-1"
                      style={{ color: "var(--gh-fg-muted)" }}
                    >
                      <Dot delay={0} />
                      <Dot delay={150} />
                      <Dot delay={300} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 px-3 py-3 border-t"
            style={{ borderColor: "var(--gh-border-muted)" }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about your case..."
              rows={1}
              className="flex-1 rounded-md border px-3 py-2 text-sm outline-none resize-none focus:border-[var(--gh-accent-emphasis)]"
              style={{
                borderColor: "var(--gh-border-default)",
                background: "var(--gh-canvas-default)",
                color: "var(--gh-fg-default)",
                maxHeight: 80,
              }}
              disabled={streaming}
            />
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              className="rounded-md p-2"
              style={{
                background: input.trim() && !streaming
                  ? "var(--gh-btn-primary-bg)"
                  : "var(--gh-canvas-subtle)",
                color: input.trim() && !streaming
                  ? "#fff"
                  : "var(--gh-fg-muted)",
                cursor:
                  input.trim() && !streaming ? "pointer" : "not-allowed",
              }}
              aria-label="Send"
            >
              <PaperAirplaneIcon size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full animate-bounce"
      style={{
        background: "currentColor",
        animationDelay: `${delay}ms`,
      }}
    />
  );
}
