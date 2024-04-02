import type {
  insertEventSchema,
  selectEventSchema,
  updateEventSchema,
} from "@/server/db/validation/event";
import { z } from "zod";

export type InsertEventType = z.infer<typeof insertEventSchema>;

export type UpdateEventType = z.infer<typeof updateEventSchema>;

export type EventType = z.infer<typeof selectEventSchema>;
