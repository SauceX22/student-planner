"use client";

import { EventType } from "@db/types";
import {
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isToday,
  startOfWeek,
} from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import EventItem from "./EventItem";
import NewEventInput from "../event/NewEventInput";
import {
  useCalendarData,
  useManipulatingEvent,
  useSelectedDay,
} from "@/lib/store/event";
import { api } from "@/trpc/client";
import UpdateEventInput from "../event/UpdateEventInput";

type Props = {};

function EventsArea({}: Props) {
  const [selectedDayEvents, setSelectedDayEvents] = useState<EventType[]>([]);
  const { selectedDay } = useSelectedDay();
  const { creatingEvent, editingEvent } = useManipulatingEvent();
  const { firstDayDispCalendar } = useCalendarData();

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

  const getDayEvents = (day: Date) =>
    monthEvents?.filter((event) => isSameDay(event.due, day));

  useEffect(() => {
    console.log("Events Area (Re-Render Triggered)");
    if (selectedDay) setSelectedDayEvents(getDayEvents(selectedDay)!);
  }, [selectedDay, monthEvents]);

  const copyText = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const anchor = e.target as HTMLButtonElement;
    const range = document.createRange();
    range.selectNode(anchor);
    window.getSelection()?.addRange(range);

    try {
      anchor.textContent &&
        (await navigator.clipboard.writeText(anchor.textContent));
      console.log("Link copied to clipboard");
    } catch (err) {
      console.error("Unable to copy link: ", err);
    }
  };

  return (
    <div
      className={`container ml-4 flex max-w-5xl select-none flex-col rounded-lg px-4 py-4 shadow-md outline outline-2 outline-neutral-700 transition-colors duration-300 hover:shadow-lg ${
        isLoadingMonthEvents && "bg-neutral-800 grayscale"
      }`}
    >
      <h2 className="px-2 text-lg font-semibold text-gray-400">
        <span>Schedule for</span>
        <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
          <button
            className={`rounded-lg bg-transparent px-1.5 py-0.5 hover:bg-neutral-800 hover:shadow-lg ${
              isToday(selectedDay) ? "text-red-500" : ""
            }`}
            onClick={copyText}
          >
            {format(selectedDay, "MMM dd, yyy")}
          </button>
        </time>
      </h2>
      {/* Events Portion */}
      <div className="w-xfull flex h-full flex-col items-center justify-center">
        {isLoadingMonthEvents ? (
          <div className="loading-spinner border-t-3 duration-2000 mx-auto h-16 w-16 animate-spin rounded-[100%] border-2 border-transparent border-t-slate-400"></div>
        ) : (
          <div className="content flex h-full w-full flex-col justify-between">
            <ol className="mt-5 flex flex-col gap-2 text-sm leading-6">
              {selectedDayEvents?.length > 0 ? (
                selectedDayEvents?.map((event) => (
                  <EventItem key={event.id} event={event} />
                ))
              ) : (
                <p className="ml-4 text-lg text-neutral-400">
                  No events for today.
                </p>
              )}
            </ol>
            <div className="create-event-popup-area">
              {creatingEvent && <NewEventInput />}
              {editingEvent && <UpdateEventInput />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventsArea;
