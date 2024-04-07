/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";

import {
  useCalendarData,
  useDisplayedMonth,
  useManipulatingEvent,
  useSelectedDay,
  useSelectedEvent,
} from "@/lib/store/event";
import { api } from "@/trpc/client";

import CalendarDay from "./calendar-day";
import CalendarHeader from "./calendar-header";

export function Calendar() {
  const today = startOfToday();
  const { selectedDay, setSelectedDay } = useSelectedDay();
  const { firstDayDispCalendar, setFirstDayDispCalendar } = useCalendarData();
  const { reschedulingEvent, setReschedulingEvent } = useManipulatingEvent();
  const { selectedEvent, setSelectedEvent } = useSelectedEvent();
  const [dispMonth, setDispMonth] = useState(format(today, "MMM-yyyy"));

  // TODO hardcoded user perfs data
  const userPrefsData = {
    userPrefs: {
      showDaysOutOfMonth: true,
    },
  };

  const { data: monthEvents, isLoading: isLoadingMonthEvents } =
    api.event.listMonthEvents.useQuery({
      firstDispDay: userPrefsData?.userPrefs?.showDaysOutOfMonth
        ? startOfWeek(firstDayDispCalendar)
        : firstDayDispCalendar,
      lastDispDay: userPrefsData?.userPrefs?.showDaysOutOfMonth
        ? endOfWeek(endOfMonth(firstDayDispCalendar))
        : endOfMonth(firstDayDispCalendar),
    });

  const daysOfMonth = (firstDayOfTheMonth: Date) =>
    eachDayOfInterval({
      start: userPrefsData?.userPrefs?.showDaysOutOfMonth
        ? startOfWeek(firstDayOfTheMonth)
        : firstDayOfTheMonth,
      end: userPrefsData?.userPrefs?.showDaysOutOfMonth
        ? endOfWeek(endOfMonth(firstDayOfTheMonth))
        : endOfMonth(firstDayOfTheMonth),
    });

  function goToCurrentMonth() {
    setSelectedDay(today);
    setFirstDayDispCalendar(parse(dispMonth, "MMM-yyyy", new Date()));
  }

  function getFirstDayPrevMonth(): Date {
    const firstDayPreviousMonth = add(firstDayDispCalendar, { months: -1 });
    setFirstDayDispCalendar(firstDayPreviousMonth);
    return firstDayPreviousMonth;
  }

  function getFirstDayNextMonth(): Date {
    const firstDayNextMonth = add(firstDayDispCalendar, { months: 1 });
    setFirstDayDispCalendar(firstDayNextMonth);
    return firstDayNextMonth;
  }

  function previousMonth() {
    setDispMonth(format(getFirstDayPrevMonth(), "MMM-yyyy"));
  }

  function nextMonth() {
    setDispMonth(format(getFirstDayNextMonth(), "MMM-yyyy"));
  }

  const getDayEvents = (day: Date) =>
    monthEvents?.filter((event) => isSameDay(event.due, day));

  const trpcUtils = api.useUtils();
  const rescheduleEvent = api.event.reschedule.useMutation({
    async onSuccess() {
      await trpcUtils.event.listMonthEvents.invalidate({
        firstDispDay: selectedDay,
        lastDispDay: selectedDay,
      });
    },
  });

  useEffect(() => {
    setDispMonth(format(selectedDay, "MMM-yyyy"));
    // if we're rescheudling an event, we want to call trpc to reschedule the event
    const rescheduleSelectedEvent = async () => {
      if (selectedEvent && reschedulingEvent) {
        try {
          await rescheduleEvent.mutateAsync({
            id: selectedEvent.id,
            due: selectedDay,
          });
        } catch (error) {
          console.log(error);
        }
        setReschedulingEvent(false);
      }
    };
    rescheduleSelectedEvent();
  }, [selectedDay]);

  return (
    <div
      className={`w-[40rem] max-w-xl select-none rounded-lg font-light md:px-4 md:py-4 md:text-xl lg:text-2xl ${
        isLoadingMonthEvents && "bg-neutral-800 grayscale"
      }`}>
      {/* Header */}
      <div className="mb-2 grid grid-cols-1 divide-x-8 divide-transparent">
        <div>
          {/* Control Header */}
          <CalendarHeader
            firstDayCurrentMonth={firstDayDispCalendar}
            goToCurrentMonth={goToCurrentMonth}
            previousMonth={previousMonth}
            nextMonth={nextMonth}
          />

          {/* === Headers for Days === */}
          <div className="mt-5 grid cursor-default grid-cols-7 text-center text-lg font-normal leading-8 text-gray-500">
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
      {/* === Days === */}
      <div className="h-full w-full">
        {isLoadingMonthEvents ? (
          <div className="loading-spinner border-t-3 duration-2000 mx-auto h-16 w-16 animate-spin rounded-[100%] border-2 border-transparent border-t-slate-400"></div>
        ) : (
          <div className="text-md mb-4 mt-0 grid grid-cols-7">
            {daysOfMonth(firstDayDispCalendar).map((day, dayIndx) => (
              <CalendarDay
                key={day.toISOString()}
                day={day}
                dayIndx={dayIndx}
                firstDayOfMonth={firstDayDispCalendar}
                dayEvents={getDayEvents(day)!}
                magnetProps={{
                  speed: 0.5,
                  scale: 1.5,
                  tollerance: 0.5,
                  borderRadius: "30px",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
