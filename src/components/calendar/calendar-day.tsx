/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { format, getDay, isEqual, isSameMonth, isToday } from "date-fns";

import { EventType } from "@db/types";
// import gsap from "gsap";
import { useManipulatingEvent, useSelectedDay } from "@/lib/store/event";

type Props = {
  day: Date;
  dayIndx: number;
  firstDayOfMonth: Date;
  dayEvents: EventType[];
  magnetProps: any;
};

const CalendarDay = ({
  day,
  dayIndx,
  firstDayOfMonth,
  dayEvents,
  magnetProps: {
    children,
    className,
    props,
    speed = 1,
    tollerance = 0.8,
    scale = 1.2,
    borderRadius = 0,
    debug = false,
  },
}: Props) => {
  const { selectedDay, setSelectedDay } = useSelectedDay();
  const { editingEvent, reschedulingEvent } = useManipulatingEvent();

  // const $root: any = useRef(null);
  // const $item: any = useRef(null);
  // const $hover = useRef(null);
  // const rootBound: any = useRef(null);
  // const itemBound: any = useRef(null);
  // const diffBound = useRef({ x: 0, y: 0 });

  // const handleMouseEnter = () => {
  //   if (!$root || !$item) return;

  //   gsap.killTweensOf($item.current);
  //   gsap.set($hover.current, {
  //     scale: scale,
  //     borderRadius,
  //     background: debug ? "rgba(0, 125, 255, .4)" : "transparent",
  //   });

  //   rootBound.current = $root.current.getBoundingClientRect();
  //   itemBound.current = $item.current.getBoundingClientRect();
  //   diffBound.current.x =
  //     (rootBound.current.width * scale - rootBound.current.width) / 2;
  //   diffBound.current.y =
  //     (rootBound.current.height * scale - rootBound.current.height) / 2;
  // };

  // const handleMouseLeave = () => {
  //   gsap.killTweensOf($item.current);
  //   gsap.to($item.current, {
  //     x: 0,
  //     y: 0,
  //     ease: "elastic.out(1.1, .4)",
  //     duration: 1.2,
  //   });
  //   gsap.set($hover.current, {
  //     scale: 1,
  //   });
  // };

  // const handleMouseMove = (e: any) => {
  //   const x: number = e.clientX || e.touches[0].clientX;
  //   const y: number = e.clientY || e.touches[0].clientY;

  //   const maxX =
  //     ((rootBound.current.width - itemBound.current.width) / 2) * tollerance;
  //   const maxY =
  //     ((rootBound.current.height - itemBound.current.height) / 2) * tollerance;

  //   const newX = gsap.utils.mapRange(
  //     0,
  //     rootBound.current.width * scale,
  //     -maxX,
  //     maxX,
  //     x - rootBound.current.x + diffBound.current.x,
  //   );

  //   const newY = gsap.utils.mapRange(
  //     0,
  //     rootBound.current.height * scale,
  //     -maxY,
  //     maxY,
  //     y - rootBound.current.y + diffBound.current.y,
  //   );

  //   gsap.killTweensOf($item.current);
  //   gsap.to($item.current, {
  //     x: newX,
  //     y: newY,
  //     ease: "power3.out",
  //     duration: speed,
  //   });
  // };

  return (
    <div
      key={day.toString()}
      className={clsx(dayIndx === 0 && colStartClasses[getDay(day)], "mt-4")}>
      <button
        // ref={$root}
        // onMouseEnter={handleMouseEnter}
        // onMouseMove={handleMouseMove}
        // onTouchMove={handleMouseMove}
        // onTouchStart={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // onTouchEnd={handleMouseLeave}
        type="button"
        onClick={() => setSelectedDay(day)}
        className={clsx(
          "magnetic-button z-1 relative cursor-pointer touch-none ",
          className + " ",
          // == Common Day in Month ==

          // When NOT Selected
          !isEqual(day, selectedDay) &&
            !isToday(day) &&
            isSameMonth(day, firstDayOfMonth) &&
            "text-neutral-300",

          // Days of other month
          !isEqual(day, selectedDay) &&
            !isToday(day) &&
            !isSameMonth(day, firstDayOfMonth) &&
            "text-neutral-500",

          // When Selected
          isEqual(day, selectedDay) && !isToday(day) && "bg-neutral-600",

          // On Hover
          !isEqual(day, selectedDay) && "hover:bg-neutral-700",
          // =========================

          // == Today ==

          // When NOT Selected
          !isEqual(day, selectedDay) &&
            isToday(day) &&
            "ouline-red-500 text-red-500 outline outline-2 hover:bg-neutral-800",

          // When Selected
          isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
          // =========================

          // Bolden Selected Day & Today
          (isEqual(day, selectedDay) || isToday(day)) && "font-normal",

          // Editing an event
          !isToday(day) &&
            (editingEvent || reschedulingEvent) &&
            "hover:bg-yellow-500 hover:outline hover:outline-2 hover:outline-yellow-600",

          // Other common styles
          "mx-auto flex h-16 w-16 items-center justify-center rounded-full transition-all duration-100"
        )}>
        <span
          className="magnetic-button--item inline-block"
          // ref={$item}
        >
          <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
        </span>
        <span
          className="magnetic-button--hover z-minus-1 absolute left-0 top-0 inline-block h-full w-full"
          // ref={$hover}
        />
      </button>

      <div className="mt-1 flex h-3 flex-row justify-center text-base">
        {(dayEvents || []).map(
          (event, eventIndex) =>
            eventIndex < 3 && (
              <div
                key={event.id}
                style={{ backgroundColor: event.color }}
                className={`${
                  eventIndex === 0 ? "" : "ml-1.5"
                } h-2 w-2 rounded-full`}></div>
            )
        )}
      </div>
    </div>
  );
};

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default CalendarDay;
