import { IssueDetail } from "./issue-detail";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ owner: string; name: string; number: string }>;
}) {
  const { number } = await params;
  return <IssueDetail issueNumber={parseInt(number, 10)} />;
}
