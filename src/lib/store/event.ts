import type {
  CalendarDataState,
  DisplayedMonthState,
  ManipulatingEventState,
  MonthEventsState,
  SelectedDayState,
  SelectedEventState,
} from "@/lib/store/types";
import { type EventType } from "@db/types";
import { format, parse, startOfToday } from "date-fns";
import { create } from "zustand";

export const useMonthEvents = create<MonthEventsState>((set) => ({
  monthEvents: [],
  setMonthEvents: (newMonthEvents: EventType[]) =>
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
  setSelectedEvent: (newSelectedEvent: EventType | null) =>
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
