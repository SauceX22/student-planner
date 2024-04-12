import { Calendar } from "@/components/calendar/calendar";
import { DashboardShell } from "@/components/dashboard/shell";

const HomePage = () => {
  return (
    <DashboardShell>
      <div className="mx-auto flex h-full w-full items-center  justify-center overflow-hidden px-6 py-4 xl:w-2/3">
        <Calendar />
      </div>
    </DashboardShell>
  );
};

export default HomePage;
