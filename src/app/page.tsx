import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#15162c] text-white">
      test
    </main>
  );
}
