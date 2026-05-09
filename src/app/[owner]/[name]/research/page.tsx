import { GlobeIcon } from "@primer/octicons-react";
import { TabPlaceholder } from "@/components/repo/tab-placeholder";

export default function ResearchTab() {
  return (
    <TabPlaceholder
      step={10}
      icon={<GlobeIcon size={28} />}
      title="Research — Live USCIS intelligence (Tavily)"
      description="Real-time web research powered by Tavily: current USCIS processing times for your path, recent RFE patterns, your employer's H-1B/PERM history, and the latest policy memos."
    />
  );
}
