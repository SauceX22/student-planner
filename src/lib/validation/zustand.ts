import { create } from "zustand";
import { format, parse, startOfToday } from "date-fns";
import { events } from "@db/schema";
import type {
  MonthEventsState,
  ManipulatingEventState,
  SelectedDayState,
  DisplayedMonthState,
  SelectedEventState,
  CalendarDataState,
} from "@/lib/validation/types";
import { type Event } from "@db/types";

export const useMonthEvents = create<MonthEventsState>((set) => ({
  monthEvents: [],
  setMonthEvents: (newMonthEvents: Event[]) =>
    set((state) => ({ monthEvents: [...newMonthEvents] })),
}));

export const useManipulatingEvent = create<ManipulatingEventState>((set) => ({
  creatingEvent: false,
  editingEvent: false,
  reschedulingEvent: false,
  setCreatingEvent: (creatingEventNewValue: boolean) =>
    set((state) => ({
      creatingEvent: creatingEventNewValue,
      editingEvent: false,
      reschedulingEvent: false,
    })),
  setEditingEvent: (editingNewValue: boolean) =>
    set((state) => ({
      editingEvent: editingNewValue,
      creatingEvent: false,
      reschedulingEvent: false,
    })),
  setReschedulingEvent: (reschedulingNewValue: boolean) =>
    set((state) => ({
      reschedulingEvent: reschedulingNewValue,
      creatingEvent: false,
      editingEvent: false,
    })),
}));

export const useSelectedDay = create<SelectedDayState>((set) => ({
  selectedDay: startOfToday(),
  setSelectedDay: (newSelectedDay: Date) =>
    set((state) => ({ selectedDay: newSelectedDay })),
}));

export const useDisplayedMonth = create<DisplayedMonthState>((set) => ({
  displayedMonth: startOfToday(),
  setDisplayedMonth: (newDisplayedMonth: Date) =>
    set((state) => ({ displayedMonth: newDisplayedMonth })),
}));

export const useSelectedEvent = create<SelectedEventState>((set) => ({
  selectedEvent: null,
  setSelectedEvent: (newSelectedEvent: Event | null) =>
    set((state) => ({ selectedEvent: newSelectedEvent })),
}));

export const useCalendarData = create<CalendarDataState>((set) => ({
  firstDayDispCalendar: parse(
    format(startOfToday(), "MMM-yyyy"),
    "MMM-yyyy",
    new Date(),
  ),
  setFirstDayDispCalendar: (newFirstDay: Date) =>
    set((state) => ({ firstDayDispCalendar: newFirstDay })),
}));
