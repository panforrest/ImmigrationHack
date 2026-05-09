import { GitPullRequestIcon } from "@primer/octicons-react";
import { TabPlaceholder } from "@/components/repo/tab-placeholder";

export default function PullsTab() {
  return (
    <TabPlaceholder
      step={11}
      icon={<GitPullRequestIcon size={28} />}
      title="Pull requests — Mentor & lawyer reviews"
      description="Every recommendation letter draft, narrative revision, and document edit becomes a pull request. Reviewers leave inline comments, you iterate, then merge."
    />
  );
}
