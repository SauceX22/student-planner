import { useManipulatingEvent, useSelectedEvent } from "@/lib/store/event";
import { EventType } from "@db/types";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

type Props = {
  event: EventType;
};

{
  /* Huge button to open detals */
}
{
  /* Checkbox button */
}
function EventItem({ event }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { selectedEvent, setSelectedEvent } = useSelectedEvent();
  const { editingEvent, reschedulingEvent } = useManipulatingEvent();

  function onEventClick() {
    if (!expanded) setSelectedEvent(event);
    else if (expanded) setSelectedEvent(null);
  }

  useEffect(() => {
    selectedEvent === event ? setExpanded(true) : setExpanded(false);
  }, [selectedEvent]);

  return (
    <a
      className={clsx(
        "group/event-item container mx-0 flex min-h-fit w-full cursor-pointer select-none flex-row justify-between rounded-md px-4 py-0 shadow-md outline outline-2 outline-neutral-700 transition-all duration-200 hover:bg-neutral-700 hover:shadow-lg",
        expanded ? "h-40 bg-neutral-800" : "h-16 hover:outline-none",
        editingEvent || reschedulingEvent ? "bg-yellow-500" : "",
      )}
      onClick={onEventClick}
      aria-checked
    >
      <div
        className={clsx(
          "content flex w-full flex-shrink flex-grow-0",
          expanded
            ? "mt-0 flex-col items-start justify-center gap-0"
            : "my-auto flex-row gap-4",
        )}
      >
        <div
          className={clsx(
            "heading-content flex max-h-min flex-shrink flex-grow-0 flex-row gap-4",
            expanded ? "mt-4 w-full max-w-full" : "my-auto",
          )}
        >
          <div
            style={{ backgroundColor: event.color }}
            className="coloredItem my-auto h-5 w-5 rounded-md"
          ></div>
          <div className="my-auto max-w-sm flex-shrink truncate text-2xl">
            {/* {'Math Study 11.6'} */}
            {event.title}
          </div>
        </div>

        <p
          className={clsx(
            "my-auto max-w-full flex-shrink",
            expanded
              ? "h-24 overflow-auto scroll-smooth text-lg text-white"
              : "max-w-lg truncate text-base text-neutral-500 group-hover/event-item:text-neutral-300",
          )}
        >
          {/* {'Slides on G-Drive, also from kuhaili Slides on G-Drive, also from kuhaili Slides on G-Drive, also from kuhaili Slides on G-Drive, also from kuhaili Slides on G-Drive Slides on G-Drive, also from kuhaili Slides on G-Drive, also from kuhaili Slides on G-Drive, also from kuhaili Slides on G-Drive, also from kuhaili Slides on G-Drive'} */}
          {event.description}
        </p>

        {/* Tages: Maybe colors to indicate course */}
      </div>

      {/* <div className='buttons flex flex-row gap-2 my-auto'></div> */}
    </a>
  );
}

export default EventItem;
