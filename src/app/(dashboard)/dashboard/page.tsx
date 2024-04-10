import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/calendar/calendar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";

const HomePage = () => {
  return (
    <DashboardShell>
      <DashboardHeader heading="Home" text="" />
      <Separator className="mt-4 w-full" />
      <div className="mx-auto flex h-full w-full items-center  justify-center overflow-hidden px-6 py-4 xl:w-2/3">
        <Calendar />
      </div>
    </DashboardShell>
  );
};

export default HomePage;
