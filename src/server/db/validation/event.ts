import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { events } from "@db/schema";

// Schema for inserting a user - used to validate API requests
export const insertEventSchema = createInsertSchema(events, {
  labels: z.array(z.string()).default([]),
}).omit({ id: true, createdAt: true, updatedAt: true, createdById: true });

// Schema for updating a user - used to validate API requests
export const updateEventSchema = insertEventSchema.partial().extend({
  id: z.string().uuid(),
});

// Schema for selecting a user - used to validate API responses
export const selectEventSchema = createSelectSchema(events, {
  labels: z.array(z.string()).default([]),
});
