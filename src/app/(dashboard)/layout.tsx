import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

import { DashboardNav } from "@/components/dashboard/nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Dashboard Layout",
  description: "A dashboard layout.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div
      className={cn(
        "flex h-screen max-h-screen bg-muted font-sans antialiased",
        inter.variable
      )}>
      <DashboardNav user={session.user} />
      <main className="h-full w-full p-2">
        <div className="h-full w-full overflow-hidden rounded-md border-2 bg-background shadow-sm">
          {children}
        </div>
      </main>
    </div>
  );
}
