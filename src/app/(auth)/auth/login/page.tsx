import Image from "next/image";
import { redirect } from "next/navigation";

import UserAuthLoginCard from "@/components/auth/user-auth-login-card";
import { getServerAuthSession } from "@/server/auth";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  if (session) {
    // Redirect to the page the user came from
    return redirect("/home");
  }

  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <UserAuthLoginCard />
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full rounded-l-2xl object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
