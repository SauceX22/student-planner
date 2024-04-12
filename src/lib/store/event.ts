import { addMonths, startOfMonth, startOfToday, subMonths } from "date-fns";
import { create } from "zustand";

import { type EventType } from "@db/types";
import type { CalendarSelection, SelectedEventState } from "@/lib/store/types";

export const useCalendarSelection = create<CalendarSelection>(
  /**
   * This is the state of the calendar selection
   *
   * @param selectedDay - The currently selected day
   * @param setSelectedDay - A function to set the selected day
   * @param goToPreviousMonth - A function to go to the previous month
   * @param goToNextMonth - A function to go to the next month
   * @param goToToday - A function to go to the current day
   */
  (set) => ({
    selectedDay: startOfToday(),
    setSelectedDay: (newSelectedDay: Date) =>
      set((state) => ({ selectedDay: newSelectedDay })),
    goToPreviousMonth: () =>
      set((state) => ({
        selectedDay: startOfMonth(subMonths(state.selectedDay, 1)),
      })),
    goToNextMonth: () =>
      set((state) => ({
        selectedDay: startOfMonth(addMonths(state.selectedDay, 1)),
      })),
    goToToday: () =>
      set((state) => ({
        selectedDay: startOfToday(),
      })),
  })
);

export const useSelectedEvent = create<SelectedEventState>((set) => ({
  selectedEvent: null,
  setSelectedEvent: (newSelectedEvent: EventType | null) =>
    set((state) => ({ selectedEvent: newSelectedEvent })),
}));
