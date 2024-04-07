/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import { useManipulatingEvent, useSelectedDay } from "@/lib/store/event";
import { api } from "@/trpc/client";

import EventInputs from "./EventInputs";

function NewEventInput() {
  const { selectedDay } = useSelectedDay();
  const { setCreatingEvent } = useManipulatingEvent();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#e44645");
  const [labels, setLabels] = useState<string[]>([]);

  const trpcUtils = api.useUtils();

  const addEventMutation = api.event.add.useMutation({
    async onSuccess() {
      await trpcUtils.event.listMonthEvents.invalidate();
    },
  });

  const addEvent = async (e: any) => {
    e.preventDefault();
    if (title.length <= 0) {
      // TODO: show error message using snackbars
      return;
    }
    try {
      const addedEvent = await addEventMutation.mutateAsync({
        title: title,
        description: description,
        due: selectedDay,
        isRecurring: false,
        color: color,
        labels: labels,
      });
      console.log("Added event: ", addedEvent);
    } catch (error) {
      console.error(error);
    }
    setCreatingEvent(false);
  };

  return (
    <EventInputs
      submit={async (e: any) => {
        await addEvent(e);
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

export default NewEventInput;
