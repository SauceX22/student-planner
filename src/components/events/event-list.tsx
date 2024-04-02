import EventCard from "@/components/events/event-card";
import { Accordion } from "@/components/ui/accordion";
import React from "react";

const EventList = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-1/3 select-none space-y-2"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <EventCard key={i} value={i.toString()} />
      ))}
    </Accordion>
  );
};

export default EventList;
