/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React, { useState } from "react";

import {
  useManipulatingEvent,
  useSelectedDay,
  useSelectedEvent,
} from "@/lib/store/event";
import { api } from "@/trpc/client";

import EventInputs from "./EventInputs";

function UpdateEventInput() {
  const { selectedEvent } = useSelectedEvent();
  const { selectedDay } = useSelectedDay();
  const { setEditingEvent } = useManipulatingEvent();
  const [title, setTitle] = useState<string>(selectedEvent?.title!);
  const [description, setDescription] = useState<string>(
    selectedEvent?.description!
  );
  const [color, setColor] = useState<string>(selectedEvent?.color!);
  const [labels, setLabels] = useState<string[]>(selectedEvent?.labels!);

  const trpcUtils = api.useUtils();

  const updateEventMutation = api.event.update.useMutation({
    async onSuccess() {
      await trpcUtils.event.listMonthEvents.invalidate();
    },
  });

  const updateEvent = async (e: Event) => {
    e.preventDefault();
    if (title.length <= 0) {
      // TODO: show title error message using snackbars
      return;
    }

    if (!selectedEvent) {
      // TODO: show selected event error message using snackbars
      return;
    }

    try {
      const updatedEvent = await updateEventMutation.mutateAsync({
        id: selectedEvent.id,
        title: title,
        description: description,
        due: selectedDay,
        isRecurring: false,
        color: color,
        labels: labels,
      });
      console.log("Updated event: ", updatedEvent);
    } catch (error) {
      console.error(error);
    }
    setEditingEvent(false);
  };

  return (
    <EventInputs
      submit={async (e: Event) => {
        await updateEvent(e);
      }}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      color={color}
      setColor={setColor}
      labels={labels}
      setLabels={setLabels}
    />
  );
}

export default UpdateEventInput;
