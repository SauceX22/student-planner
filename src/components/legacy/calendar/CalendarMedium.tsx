import React, { createContext, useContext, useEffect, useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";
import { EventType } from "@db/types";
import { GetServerSideProps } from "next";
import { useMonthEvents, useSelectedDay } from "@/lib/store/event";

type Props = {};

export default function CalendarMedium({}: Props) {
  const today = startOfToday();
  const { selectedDay, setSelectedDay } = useSelectedDay();

  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  // As options to modify
  const [showDaysOutOfMonth, setShowDaysOutOfMonth] = useState(true);

  const daysOfMonth = (firstDayOfMonth: Date) =>
    eachDayOfInterval({
      start: showDaysOutOfMonth
        ? startOfWeek(firstDayOfMonth)
        : firstDayOfMonth,
      end: showDaysOutOfMonth
        ? endOfWeek(endOfMonth(firstDayOfMonth))
        : endOfMonth(firstDayOfMonth),
    });

  function goToCurrentMonth() {
    setCurrentMonth(format(today, "MMM-yyyy"));
    setSelectedDay(today);
  }

  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  const getDayEvents = (day: Date) =>
    ([] as EventType[]).filter((event) => isSameDay(event.due, day));

  return (
    <div className="w-[30rem] max-w-lg select-none md:px-4 md:py-4 md:text-lg lg:text-xl">
      {/* Header */}
      <div className="mb-2 grid grid-cols-1 divide-x-8 divide-transparent">
        <div>
          {/* Control Header */}
          <CalendarHeader
            firstDayCurrentMonth={firstDayCurrentMonth}
            goToCurrentMonth={goToCurrentMonth}
            previousMonth={previousMonth}
            nextMonth={nextMonth}
          />

          {/* === Headers for Days === */}
          <div className="mt-2 grid cursor-default grid-cols-7 text-center text-sm leading-8 text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="divi mb-4 grid grid-cols-1 divide-x-2 divide-gray-500">
        {/* === Days === */}
        <div className="text-md mt-0 grid grid-cols-7">
          {daysOfMonth(firstDayCurrentMonth).map((day, dayIndx) => (
            <CalendarDay
              key={day.toISOString()}
              day={day}
              dayIndx={dayIndx}
              firstDayOfMonth={firstDayCurrentMonth}
              dayEvents={getDayEvents(day)}
              magnetProps={{
                speed: 0.5,
                scale: 1.5,
                tollerance: 0.5,
                borderRadius: "30px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
