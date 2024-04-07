"use client";

import { Calendar, Delete, Edit, Plus } from "lucide-react";

import {
  useManipulatingEvent,
  useSelectedDay,
  useSelectedEvent,
} from "@/lib/store/event";
import { api } from "@/trpc/client";

import ConfirmPopup from "../popups/ConfirmPopup";
import ToolbarButton from "./ToolbarButton";

function Toolbar() {
  const { selectedEvent, setSelectedEvent } = useSelectedEvent();
  const { selectedDay, setSelectedDay } = useSelectedDay();
  const {
    creatingEvent,
    setCreatingEvent,
    editingEvent,
    setEditingEvent,
    reschedulingEvent,
    setReschedulingEvent,
  } = useManipulatingEvent();

  const trpcUtils = api.useUtils();

  const removeEvent = api.event.remove.useMutation({
    async onSuccess() {
      await trpcUtils.event.listMonthEvents.invalidate({
        firstDispDay: selectedDay,
        lastDispDay: selectedDay,
      });
    },
  });

  async function addEvent() {
    setCreatingEvent(!creatingEvent);
  }

  async function deleteEvent() {
    if (selectedEvent) {
      try {
        const deletedEvent = await removeEvent.mutateAsync({
          id: selectedEvent.id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function editItem() {
    if (selectedEvent) {
      setEditingEvent(!editingEvent);
    }
    // TODO in else statement, show error message using snackbars
  }

  async function reScheduleItem() {
    if (selectedEvent) {
      setReschedulingEvent(!reschedulingEvent);
    }
  }

  return (
    <div className="container mx-0 flex min-w-fit max-w-fit select-none flex-col items-center justify-between rounded-lg px-1 py-1 shadow-md outline outline-2 outline-neutral-700 transition-colors duration-300 hover:shadow-lg">
      <div className="top">
        <ToolbarButton
          className="text-2xl"
          icon={<Plus />}
          onClick={async (e) => await addEvent()}
        />
        <ToolbarButton
          className="text-2xl"
          icon={<Edit />}
          onClick={async (e) => await editItem()}
        />
        <ToolbarButton
          className="text-2xl"
          icon={<Calendar />}
          onClick={async (e) => await reScheduleItem()}
        />
      </div>

      <div className="bottom">
        <ConfirmPopup
          action={async (e) => await deleteEvent()}
          title="Are you sure you want to delete this item?"
          description="Item Cannot Be Recovered!"
          actionText="DELETE ITEM!">
          <ToolbarButton
            className="bg-opacity-30 text-3xl transition-colors hover:bg-red-500 hover:bg-opacity-100"
            icon={<Delete />}
          />
        </ConfirmPopup>
      </div>
    </div>
  );
}

export default Toolbar;
