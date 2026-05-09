import { TagIcon } from "@primer/octicons-react";
import { TabPlaceholder } from "@/components/repo/tab-placeholder";

export default function ReleasesTab() {
  return (
    <TabPlaceholder
      step={8}
      icon={<TagIcon size={28} />}
      title="Releases — Every milestone, tagged"
      description="PERM Filed · I-140 Approved · AOS Submitted · Green Card Received. Each milestone is a tagged release with the assets that were filed and the date USCIS confirmed."
    />
  );
}
