import { CaseLoaded } from "./case-loaded";

export default async function CasePage({
  params,
}: {
  params: Promise<{ owner: string; name: string }>;
}) {
  const { owner, name } = await params;
  return <CaseLoaded owner={owner} name={name} />;
}
