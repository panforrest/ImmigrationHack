import { CaseShell } from "@/components/repo/case-shell";

export default async function CaseLayout({
  params,
  children,
}: {
  params: Promise<{ owner: string; name: string }>;
  children: React.ReactNode;
}) {
  const { owner, name } = await params;
  return (
    <CaseShell owner={owner} name={name}>
      {children}
    </CaseShell>
  );
}
