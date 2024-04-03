import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";

import { UserAccountNav } from "../../components/user-account-nav";

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
      <nav className="flex w-1/6 max-w-[17%] flex-col items-center justify-start bg-muted p-3 pr-1.5">
        <UserAccountNav user={session.user} />
      </nav>
      <main className="h-full w-5/6 p-3 pb-0 pl-1.5 pr-0">
        <div className="h-full w-full rounded-tl-lg border-2 bg-white">
          {children}
        </div>
      </main>
    </div>
  );
}
