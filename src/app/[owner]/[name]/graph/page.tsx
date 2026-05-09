import { GraphIcon } from "@primer/octicons-react";
import { TabPlaceholder } from "@/components/repo/tab-placeholder";

export default function GraphTab() {
  return (
    <TabPlaceholder
      step={9}
      icon={<GraphIcon size={28} />}
      title="Evidence Graph — Artifacts × USCIS criteria"
      description="An interactive canvas mapping every uploaded artifact to every USCIS criterion it satisfies. Gap nodes glow red. Click any artifact to see why the AI mapped it where it did."
    />
  );
}
