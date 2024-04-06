import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import AnimatedCard from "@/components/events/animated-card";
import { cn } from "@/lib/utils";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <DashboardShell>
      <DashboardHeader heading="Home" text="" />
      <Separator className="mt-4 w-full" />
      <div className="flex h-full w-full items-center justify-center overflow-hidden px-6 py-4">
        <AnimatedCard>
          <p className="text-lg font-semibold">Drag me around!</p>
        </AnimatedCard>
      </div>
    </DashboardShell>
  );
};

export default HomePage;
