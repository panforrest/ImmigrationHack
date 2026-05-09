import { PlayIcon } from "@primer/octicons-react";
import { TabPlaceholder } from "@/components/repo/tab-placeholder";

export default function ActionsTab() {
  return (
    <TabPlaceholder
      step={11}
      icon={<PlayIcon size={28} />}
      title="Actions — Automated reminders & checklists"
      description="GitHub Actions for your case: scheduled reminders for filing windows, auto-checklists when milestones complete, and triggers when USCIS posts policy updates."
    />
  );
}
