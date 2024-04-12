"use client";

import { useState } from "react";
import { format, getDay, isSameDay, isSameMonth, isToday } from "date-fns";
import { random } from "lodash";

import type { EventType } from "@db/types";
import { useCalendarSelection } from "@/lib/store/event";
import { cn } from "@/lib/utils";

type Props = {
  day: Date;
  dayIndx: number;
  firstDayOfMonth: Date;
  dayEvents: EventType[];
} & React.HTMLAttributes<HTMLDivElement>;

const CalendarDay = ({
  day,
  dayIndx,
  firstDayOfMonth,
  dayEvents,
  className,
  ...props
}: Props) => {
  const { selectedDay, setSelectedDay } = useCalendarSelection();

  return (
    <div
      {...props}
      className={cn(
        dayIndx === 0 && colStartClasses[getDay(day)],
        "w-fit",
        className
      )}>
      <button
        key={day.toString()}
        type="button"
        onClick={() => setSelectedDay(day)}
        className={cn(
          "z-1 relative cursor-pointer touch-none ",
          // == Common Day in Month ==

          {
            // When NOT Selected
            "text-neutral-500":
              !isSameDay(day, selectedDay) &&
              !isToday(day) &&
              isSameMonth(day, firstDayOfMonth),
          },
          {
            // Days of other month
            "text-neutral-400":
              !isSameDay(day, selectedDay) &&
              !isToday(day) &&
              !isSameMonth(day, firstDayOfMonth),
          },
          {
            // When Selected
            "bg-neutral-600": isSameDay(day, selectedDay) && !isToday(day),
          },
          {
            // On Hover
            "hover:bg-neutral-700": !isSameDay(day, selectedDay),
          },
          // =========================

          // == Today ==
          {
            // When NOT Selected
            "ouline-red-500 text-red-500 outline outline-2 hover:bg-neutral-800":
              !isSameDay(day, selectedDay) && isToday(day),
          },
          {
            // When Selected
            "bg-red-500": isSameDay(day, selectedDay) && isToday(day),
          },
          // =========================

          // Bolden Selected Day & Today
          (isSameDay(day, selectedDay) || isToday(day)) && "font-normal",

          // Editing an event
          // !isToday(day) &&
          //   (editingEvent || reschedulingEvent) &&
          //   "hover:bg-yellow-500 hover:outline hover:outline-2 hover:outline-yellow-600",

          // Other common styles
          "mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg transition-all duration-100"
        )}>
        <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
      </button>

      <div className="mt-1 flex h-3 w-full items-center justify-center space-x-1.5">
        {dayEvents.map(
          (event, idx) =>
            idx < 3 && (
              <div
                // key={event.id}
                // style={{ backgroundColor: event.color }}
                key={idx}
                style={{ backgroundColor: "#EF4444" }}
                className="h-2 w-2 rounded-full"></div>
            )
        )}
      </div>
    </div>
  );
};

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default CalendarDay;
