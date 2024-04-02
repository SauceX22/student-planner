import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { events } from "@db/schema";
import { insertEventSchema, updateEventSchema } from "@db/validation/event";
import { and, eq } from "drizzle-orm";

export const eventRouter = createTRPCRouter({
  add: protectedProcedure
    .input(insertEventSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .insert(events)
        .values({
          ...input,
          createdById: ctx.session.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
    }),
  update: protectedProcedure
    .input(updateEventSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .update(events)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(events.createdById, ctx.session.user.id),
            eq(events.id, input.id),
          ),
        )
        .returning();
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.events.findMany({
      where(fields, { eq, gte, lte }) {
        return eq(fields.createdById, ctx.session.user.id);
      },
      orderBy(fields, { asc, desc, sql }) {
        return desc(fields.order);
      },
    });
  }),
  listMonthEvents: protectedProcedure
    .input(
      z.object({
        firstDispDay: z.date(),
        lastDispDay: z.date(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.events.findMany({
        where(fields, { and, gte, lte, eq }) {
          return and(
            gte(fields.due, input.firstDispDay),
            lte(fields.due, input.lastDispDay),
            eq(fields.createdById, ctx.session.user.id),
          );
        },
        orderBy(fields, { asc, desc, sql }) {
          return asc(fields.due);
        },
      });
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .delete(events)
        .where(eq(events.id, input.id))
        .returning();
    }),
  reschedule: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        due: z.date().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db
        .update(events)
        .set({
          due: input.due,
          updatedAt: new Date(),
        })
        .where(eq(events.id, input.id))
        .returning();
    }),
});
