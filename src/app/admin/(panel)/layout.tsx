import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Painel administrativo",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return <AdminShell userName={session.name}>{children}</AdminShell>;
}
