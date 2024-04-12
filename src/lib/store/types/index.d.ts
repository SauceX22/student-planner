import { type EventType } from "@db/types";

export type CalendarSelection = {
  selectedDay: Date;
  setSelectedDay: (newSelectedDay: Date) => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
};

export type SelectedEventState = {
  selectedEvent: EventType | null;
  setSelectedEvent: (newSelectedEvent: EventType | null) => void;
};
