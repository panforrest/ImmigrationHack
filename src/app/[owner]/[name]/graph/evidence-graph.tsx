"use client";

import { useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  GraphIcon,
  AlertFillIcon,
  CheckCircleFillIcon,
  ZapIcon,
  FileIcon,
  LawIcon,
  BookIcon,
  TagIcon,
  CodeIcon,
  MegaphoneIcon,
  TrophyIcon,
} from "@primer/octicons-react";
import { useCase } from "@/lib/case-context";
import type { CaseCriterion, CaseEvidence } from "@/lib/types";

type CriterionNodeData = { criterion: CaseCriterion; isGap: boolean };
type EvidenceNodeData = { evidence: CaseEvidence };

function colorForScore(score: number): string {
  if (score >= 70) return "#3fb950";
  if (score >= 40) return "#d29922";
  return "#f85149";
}

function CriterionNode({ data }: NodeProps) {
  const { criterion: c, isGap } = data as unknown as CriterionNodeData;
  const color = colorForScore(c.score);
  return (
    <div
      className={`relative rounded-md border-2 px-4 py-3 transition-all ${
        isGap ? "animate-pulse" : ""
      }`}
      style={{
        background: "#0d1117",
        borderColor: color,
        boxShadow: isGap
          ? `0 0 24px ${color}66, 0 0 0 1px ${color}99`
          : `0 0 12px ${color}33`,
        minWidth: 220,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: color, width: 8, height: 8, border: "none" }}
      />
      <div
        className="text-[10px] uppercase tracking-wider font-semibold mb-1"
        style={{ color: "#7d8590" }}
      >
        USCIS Criterion
      </div>
      <div
        className="text-sm font-semibold leading-tight mb-2"
        style={{ color: "#e6edf3" }}
      >
        {c.label}
      </div>
      <div className="flex items-center justify-between">
        <div
          className="h-1.5 flex-1 rounded-full overflow-hidden"
          style={{ background: "#21262d" }}
        >
          <div
            className="h-full"
            style={{ width: `${c.score}%`, background: color }}
          />
        </div>
        <span
          className="ml-2 text-xs font-mono font-semibold"
          style={{ color }}
        >
          {c.score}%
        </span>
      </div>
      {isGap && (
        <div
          className="mt-2 flex items-center gap-1 text-[10px] font-semibold"
          style={{ color }}
        >
          <AlertFillIcon size={10} />
          GAP — needs evidence
        </div>
      )}
    </div>
  );
}

const TYPE_ICONS = {
  publication: <BookIcon size={12} />,
  patent: <ZapIcon size={12} />,
  award: <TrophyIcon size={12} />,
  press: <MegaphoneIcon size={12} />,
  letter: <LawIcon size={12} />,
  form: <FileIcon size={12} />,
  code: <CodeIcon size={12} />,
  talk: <MegaphoneIcon size={12} />,
  other: <TagIcon size={12} />,
};

function EvidenceNode({ data }: NodeProps) {
  const { evidence: e } = data as unknown as EvidenceNodeData;
  return (
    <div
      className="rounded-md border px-3 py-2"
      style={{
        background: "#161b22",
        borderColor: "#30363d",
        minWidth: 220,
        maxWidth: 240,
      }}
    >
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#2f81f7", width: 8, height: 8, border: "none" }}
      />
      <div
        className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold mb-1"
        style={{ color: "#7d8590" }}
      >
        <span style={{ color: "#2f81f7" }}>{TYPE_ICONS[e.type] ?? <FileIcon size={12} />}</span>
        {e.type}
      </div>
      <div
        className="text-xs font-medium leading-snug"
        style={{ color: "#e6edf3" }}
      >
        {e.title}
      </div>
      <div
        className="mt-1 text-[10px] font-mono"
        style={{ color: "#7d8590" }}
      >
        {e.folder}/
      </div>
    </div>
  );
}

const nodeTypes = {
  criterion: CriterionNode,
  evidence: EvidenceNode,
};

export function EvidenceGraph() {
  const c = useCase();
  const [hoveredCriterion, setHoveredCriterion] = useState<string | null>(null);

  // Filter to applicable criteria (skip 0-scored exhibitions/commercial-success for STEM)
  const applicableCriteria = c.criteria.filter(
    (cr) => cr.score > 0 || cr.evidenceIds.length > 0
  );

  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const evY = (i: number, n: number) => i * 90 - (n - 1) * 45;
    const crY = (i: number, n: number) => i * 110 - (n - 1) * 55;

    c.evidence.forEach((e, i) => {
      nodes.push({
        id: `ev-${e.id}`,
        type: "evidence",
        position: { x: 0, y: evY(i, c.evidence.length) },
        data: { evidence: e },
      });
    });

    applicableCriteria.forEach((cr, i) => {
      const isGap = cr.score < 35;
      nodes.push({
        id: `cr-${cr.id}`,
        type: "criterion",
        position: { x: 480, y: crY(i, applicableCriteria.length) },
        data: { criterion: cr, isGap },
      });
    });

    // Edges: each evidence -> each criterion it satisfies
    c.evidence.forEach((e) => {
      e.satisfies.forEach((critId) => {
        const target = applicableCriteria.find((x) => x.id === critId);
        if (!target) return;
        const color = colorForScore(target.score);
        const highlighted =
          hoveredCriterion === critId || hoveredCriterion === e.id;
        edges.push({
          id: `${e.id}->${critId}`,
          source: `ev-${e.id}`,
          target: `cr-${critId}`,
          animated: highlighted,
          style: {
            stroke: color,
            strokeWidth: highlighted ? 2.5 : 1.2,
            opacity: highlighted ? 1 : 0.6,
          },
        });
      });
    });

    return { nodes, edges };
  }, [c, applicableCriteria, hoveredCriterion]);

  const gaps = applicableCriteria.filter((cr) => cr.score < 35);
  const strong = applicableCriteria.filter((cr) => cr.score >= 70);

  return (
    <div className="space-y-3">
      {/* Header card */}
      <div
        className="rounded-md border p-4 flex items-start gap-4 flex-wrap"
        style={{
          borderColor: "var(--gh-border-default)",
          background: "var(--gh-canvas-subtle)",
        }}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full flex-shrink-0"
          style={{
            background: "var(--gh-accent-subtle)",
            color: "var(--gh-accent-fg)",
          }}
        >
          <GraphIcon size={24} />
        </div>
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-lg font-semibold">Evidence Graph</h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--gh-fg-muted)" }}
          >
            Live AI-mapped graph of every artifact &harr; every USCIS
            criterion. Gap criteria pulse red. Hover edges to trace
            artifact-to-criterion contribution.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Stat
            color="var(--gh-success-fg)"
            icon={<CheckCircleFillIcon size={12} />}
            label={`${strong.length} strong`}
          />
          <Stat
            color="var(--gh-attention-fg)"
            icon={<TagIcon size={12} />}
            label={`${c.evidence.length} artifacts`}
          />
          <Stat
            color="var(--gh-danger-fg)"
            icon={<AlertFillIcon size={12} />}
            label={`${gaps.length} gaps`}
          />
        </div>
      </div>

      {/* Graph canvas */}
      <div
        className="rounded-md border overflow-hidden"
        style={{
          borderColor: "var(--gh-border-default)",
          background: "#010409",
          height: 640,
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          minZoom={0.3}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          onNodeMouseEnter={(_, n) => {
            const data = n.data as unknown as
              | CriterionNodeData
              | EvidenceNodeData;
            if ("criterion" in data) {
              setHoveredCriterion(data.criterion.id);
            } else {
              setHoveredCriterion(data.evidence.id);
            }
          }}
          onNodeMouseLeave={() => setHoveredCriterion(null)}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="#21262d"
          />
          <Controls
            style={{
              background: "#161b22",
              border: "1px solid #30363d",
              borderRadius: 6,
            }}
          />
          <MiniMap
            nodeStrokeColor="#30363d"
            nodeColor={(n) => {
              const d = n.data as unknown as
                | CriterionNodeData
                | EvidenceNodeData;
              if (d && "criterion" in d) {
                return colorForScore(d.criterion.score);
              }
              return "#2f81f7";
            }}
            maskColor="rgba(1,4,9,0.9)"
            style={{
              background: "#0d1117",
              border: "1px solid #30363d",
              borderRadius: 6,
            }}
          />
        </ReactFlow>
      </div>

      {/* Legend + gap focus */}
      <div className="grid lg:grid-cols-2 gap-3">
        <Legend />
        <GapList gaps={gaps} />
      </div>
    </div>
  );
}

function Stat({
  color,
  icon,
  label,
}: {
  color: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold"
      style={{
        borderColor: color,
        color,
        background: "transparent",
      }}
    >
      {icon}
      {label}
    </span>
  );
}

function Legend() {
  return (
    <div
      className="rounded-md border p-4 text-xs"
      style={{
        borderColor: "var(--gh-border-default)",
        background: "var(--gh-canvas-subtle)",
      }}
    >
      <h3
        className="text-[11px] uppercase tracking-wider font-semibold mb-3"
        style={{ color: "var(--gh-fg-muted)" }}
      >
        Legend
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <Item color="#3fb950" label="Strong (70%+)" />
        <Item color="#d29922" label="Moderate (40–69%)" />
        <Item color="#f85149" label="Gap (&lt;40%) — pulses" />
        <Item color="#2f81f7" label="Evidence artifact" />
      </div>
    </div>
  );
}

function Item({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      <span
        dangerouslySetInnerHTML={{ __html: label }}
        style={{ color: "var(--gh-fg-default)" }}
      />
    </div>
  );
}

function GapList({ gaps }: { gaps: CaseCriterion[] }) {
  if (gaps.length === 0) {
    return (
      <div
        className="rounded-md border p-4 text-xs flex items-center gap-2"
        style={{
          borderColor: "var(--gh-success-fg)",
          background: "var(--gh-success-subtle)",
          color: "var(--gh-success-fg)",
        }}
      >
        <CheckCircleFillIcon size={14} />
        No gaps detected — every criterion has supporting evidence.
      </div>
    );
  }
  return (
    <div
      className="rounded-md border p-4"
      style={{
        borderColor: "var(--gh-danger-fg)",
        background: "var(--gh-danger-subtle)",
      }}
    >
      <h3
        className="text-[11px] uppercase tracking-wider font-semibold mb-2 flex items-center gap-1"
        style={{ color: "var(--gh-danger-fg)" }}
      >
        <AlertFillIcon size={12} />
        Critical gaps · {gaps.length}
      </h3>
      <ul className="space-y-1.5">
        {gaps.map((g) => (
          <li
            key={g.id}
            className="flex items-baseline gap-2 text-xs"
            style={{ color: "var(--gh-fg-default)" }}
          >
            <span
              className="font-mono w-10 text-right"
              style={{ color: "var(--gh-danger-fg)" }}
            >
              {g.score}%
            </span>
            <span className="font-semibold">{g.label}</span>
            <span className="opacity-70">— {g.reasoning}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
