import { events } from "@db/schema";

export type Event = typeof events.$inferSelect;
