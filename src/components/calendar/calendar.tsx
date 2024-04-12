"use client";

import { useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getWeeksInMonth,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck2, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MotionCardContent,
  MotionCardDescription,
  MotionCardTitle,
} from "@/components/ui/motion-card";
import CalendarDay from "@/components/calendar/calendar-day";
import { useCalendarSelection } from "@/lib/store/event";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/client";

const HEADER_MOVE_DISTANCE = 80;
const BLOCK_MOVE_DISTANCE = 300;

const headerVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? HEADER_MOVE_DISTANCE : -HEADER_MOVE_DISTANCE,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? HEADER_MOVE_DISTANCE : -HEADER_MOVE_DISTANCE,
      opacity: 0,
    };
  },
};

const blockVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? BLOCK_MOVE_DISTANCE : -BLOCK_MOVE_DISTANCE,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? BLOCK_MOVE_DISTANCE : -BLOCK_MOVE_DISTANCE,
      opacity: 0,
    };
  },
};

const MotionCalendarDay = motion(CalendarDay);

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function Calendar() {
  const { selectedDay, goToPreviousMonth, goToNextMonth, goToToday } =
    useCalendarSelection();
  const [[page, direction], setPage] = useState([0, 0]);

  function getDaysOfBlock(month: Date) {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(month)),
      end: endOfWeek(endOfMonth(month)),
    });
  }

  const { data: monthEvents, isLoading: isLoadingMonthEvents } =
    api.event.getEventsForMonth.useQuery({
      month: startOfMonth(selectedDay),
    });

  function getDayEvents(day: Date) {
    return monthEvents?.filter((event) => isSameDay(event.due, day));
  }

  const daysBlock = getDaysOfBlock(selectedDay);

  const paginate = (newDirection: number) => {
    if (newDirection === 0) {
      goToToday();
      return setPage([0, isBefore(selectedDay, startOfToday()) ? 1 : -1]);
    }
    if (newDirection > 0) goToNextMonth();
    else goToPreviousMonth();

    setPage([page + newDirection, newDirection]);
  };

  return (
    <Card className="mb-auto w-fit select-none rounded-lg p-6 font-light shadow-xl">
      <CardHeader className="mb-4 grid grid-cols-1 p-0">
        <div className="flex justify-center overflow-hidden rounded-lg border border-neutral-800 p-6 shadow-sm">
          <div className="flex flex-auto flex-col items-start justify-center gap-2">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <MotionCardTitle
                className="my-auto flex-auto items-center justify-center text-xl font-bold md:text-5xl"
                key={format(selectedDay, "MMM yyyy")}
                layout
                custom={direction}
                variants={headerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { duration: 0.1, ease: "easeOut" },
                  opacity: { duration: 0.08 },
                }}>
                {format(selectedDay, "MMM yyyy")}
              </MotionCardTitle>
              <MotionCardDescription
                key={format(selectedDay, "MMM d, yyyy")}
                layout
                custom={direction}
                variants={headerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { duration: 0.1, ease: "easeOut" },
                  opacity: { duration: 0.08 },
                }}>
                {/* mention the actual selected day */}
                {format(selectedDay, "MMM d, yyyy")}
              </MotionCardDescription>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="outline"
              name="go-to-today"
              className="h-fit w-fit rounded-full p-4"
              onClick={() => paginate(0)}>
              <CalendarCheck2 className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              name="go-to-previous-month"
              className="h-fit w-fit rounded-full p-4"
              onClick={() => paginate(-1)}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              name="go-to-next-month"
              className="h-fit w-fit rounded-full p-4"
              onClick={() => paginate(1)}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {/* === Headers for Days === */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        className="mb-2 grid grid-cols-7 rounded-md border border-red-400 bg-red-300 p-1 py-1 text-center text-lg font-semibold leading-8">
        <div className="px-2">S</div>
        <div className="px-2">M</div>
        <div className="px-2">T</div>
        <div className="px-2">W</div>
        <div className="px-2">T</div>
        <div className="px-2">F</div>
        <div className="px-2">S</div>
      </motion.div>
      {/* Calendar */}
      {/* === Days === */}
      <MotionCardContent
        className="flex flex-row items-start justify-center overflow-hidden rounded-md border
       border-orange-300 bg-orange-200 p-1 text-center text-lg font-semibold leading-8"
        transition={{
          duration: 0.1,
          type: "spring",
          stiffness: 700,
          damping: 25,
        }}>
        {/* TODO: solve this by rendering the 2 adjacent month blocks and move each block in as needed */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            className="grid grid-cols-7"
            key={page}
            layout
            custom={direction}
            variants={blockVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", duration: 0.25 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}>
            {daysBlock.map((day, dayIndx) => (
              <MotionCalendarDay
                key={day.toISOString()}
                day={day}
                layout
                dayIndx={dayIndx}
                firstDayOfMonth={startOfMonth(selectedDay)}
                dayEvents={getDayEvents(day) ?? []}
                className={cn("p-1.5 text-center text-sm", {
                  grayscale: isLoadingMonthEvents,
                })}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </MotionCardContent>
    </Card>
  );
}
