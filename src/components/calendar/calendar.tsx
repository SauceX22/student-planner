"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import { CalendarCheck2, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCalendarSelection } from "@/lib/store/event";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/client";

import CalendarDay from "./calendar-day";

export function Calendar() {
  const today = startOfToday();
  const { selectedDay, setSelectedDay } = useCalendarSelection();
  // const { selectedEvent, setSelectedEvent } = useSelectedEvent();

  const { data: monthEvents, isLoading: isLoadingMonthEvents } =
    api.event.getEventsForMonth.useQuery({
      month: startOfMonth(selectedDay),
    });

  function getDaysOfBlock(month: Date) {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(month)),
      end: endOfWeek(endOfMonth(month)),
    });
  }

  function goToCurrentMonth() {
    setSelectedDay(today);
  }

  function goToPreviousMonth() {
    setSelectedDay(subMonths(selectedDay, 1));
  }

  function goToNextMonth() {
    setSelectedDay(addMonths(selectedDay, 1));
  }

  function getDayEvents(day: Date) {
    return monthEvents?.filter((event) => isSameDay(event.due, day));
  }

  return (
    <Card
      className={cn("mb-auto w-fit select-none rounded-lg p-6 font-light", {
        grayscale: isLoadingMonthEvents,
      })}>
      <CardHeader className="mb-4 grid grid-cols-1 p-0">
        <div className="flex justify-center rounded-lg border border-neutral-800 p-6 shadow-md">
          <div className="flex flex-auto flex-col items-start justify-center gap-2">
            <CardTitle className="my-auto flex-auto items-center justify-center text-xl font-bold md:text-5xl">
              {format(selectedDay, "MMM yyyy")}
            </CardTitle>
            <CardDescription>
              {/* mention the actual selected day */}
              {format(selectedDay, "MMM d, yyyy")}
            </CardDescription>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="outline"
              name="Current month"
              className="h-fit w-fit rounded-full p-4"
              onClick={goToCurrentMonth}>
              <CalendarCheck2 className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              name="Previous month"
              className="h-fit w-fit rounded-full p-4"
              onClick={goToPreviousMonth}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              name="Next month"
              className="h-fit w-fit rounded-full p-4"
              onClick={goToNextMonth}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* === Headers for Days === */}
      <div className="mb-2 grid grid-cols-7 rounded-md border border-red-400 bg-red-300 py-1 text-center text-lg font-semibold leading-8">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>

      {/* Calendar */}
      {/* === Days === */}
      <CardContent className="grid grid-cols-7 rounded-md border border-orange-300 bg-orange-200 p-1 text-center text-lg font-semibold leading-8">
        {getDaysOfBlock(selectedDay).map((day, dayIndx) => (
          <CalendarDay
            key={day.toISOString()}
            day={day}
            dayIndx={dayIndx}
            firstDayOfMonth={startOfMonth(selectedDay)}
            dayEvents={getDayEvents(day) ?? []}
            className="p-2 text-center text-sm"
          />
        ))}
      </CardContent>
    </Card>
  );
}
