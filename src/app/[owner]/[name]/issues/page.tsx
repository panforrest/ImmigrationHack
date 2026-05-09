import { IssueOpenedIcon } from "@primer/octicons-react";
import { TabPlaceholder } from "@/components/repo/tab-placeholder";

export default function IssuesTab() {
  return (
    <TabPlaceholder
      step={7}
      icon={<IssueOpenedIcon size={28} />}
      title="Issues — Every gap, every blocker"
      description="GitHub-style issue tracker for your case. Each missing artifact, evidentiary gap, or unresolved blocker becomes an issue with labels, suggested actions, and an owner."
    />
  );
}
