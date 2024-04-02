import { format } from "date-fns";
import { CalendarCheck2, ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarHeaderButton } from "./CalendaryHeaderButton";

type Props = {
  firstDayCurrentMonth: Date;
  goToCurrentMonth: () => void;
  previousMonth: () => void;
  nextMonth: () => void;
};

function CalendarHeader({
  firstDayCurrentMonth,
  goToCurrentMonth,
  previousMonth,
  nextMonth,
}: Props) {
  return (
    <div className="flex h-[4.5rem] min-h-fit justify-items-center rounded-lg pl-6  shadow-md outline outline-2 outline-neutral-700 transition-colors duration-300 hover:bg-neutral-800 hover:shadow-lg">
      <h2 className="my-auto flex-auto items-center justify-center place-self-center text-xl font-semibold text-gray-200 md:text-3xl">
        {format(firstDayCurrentMonth, "MMMM yyyy")}
      </h2>

      <CalendarHeaderButton
        icon={<CalendarCheck2 />}
        accessTxt="Current month"
        clickFunction={goToCurrentMonth}
        prominent={true}
      />
      <CalendarHeaderButton
        icon={<ChevronLeft />}
        accessTxt="Previous month"
        clickFunction={previousMonth}
        prominent={false}
      />
      <CalendarHeaderButton
        icon={<ChevronRight />}
        accessTxt="Next month"
        clickFunction={nextMonth}
        prominent={false}
      />
    </div>
  );
}

export default CalendarHeader;
