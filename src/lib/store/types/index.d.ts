import { type EventType } from "@db/types";

export type MonthEventsState = {
  monthEvents: EventType[];
  setMonthEvents: (newMonthEvents: EventType[]) => void;
};

export type ManipulatingEventState = {
  creatingEvent: boolean;
  editingEvent: boolean;
  reschedulingEvent: boolean;
  setCreatingEvent: (creatingEventNewValue: boolean) => void;
  setEditingEvent: (editingNewValue: boolean) => void;
  setReschedulingEvent: (reschedulingNewValue: boolean) => void;
};

export type SelectedDayState = {
  selectedDay: Date;
  setSelectedDay: (newSelectedDay: Date) => void;
};

export type DisplayedMonthState = {
  displayedMonth: Date;
  setDisplayedMonth: (newDisplayedMonth: Date) => void;
};

export type SelectedEventState = {
  selectedEvent: EventType | null;
  setSelectedEvent: (newSelectedEvent: EventType | null) => void;
};

export type CalendarDataState = {
  firstDayDispCalendar: Date;
  setFirstDayDispCalendar: (newFirstDay: Date) => void;
};
