import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";

type Props = {
  title: string;
  description: string;
  actionText: string;
  action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & React.ComponentProps<typeof AlertDialogTrigger>;

function ConfirmPopup({
  children,
  title,
  description,
  actionText,
  action,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay className="animate-opacity fixed inset-0 bg-neutral-800  opacity-75" />
        <AlertDialogContent className="fixed left-1/2 top-1/2 flex max-h-full w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 select-none flex-col gap-10 rounded-lg bg-neutral-800 p-7 shadow-lg">
          <div className="flex flex-col items-start justify-center gap-4">
            <AlertDialogTitle className="text-2xl font-semibold">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="ml-8 text-lg leading-6 text-neutral-300">
              {description}
            </AlertDialogDescription>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <AlertDialogCancel asChild>
              <button className="rounded-md bg-transparent px-4 py-2 text-base font-semibold outline outline-2 outline-neutral-400 ">
                Cancel
              </button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                onClick={async (e) => {
                  await action(e);
                  setOpen(false);
                }}
                className={`rounded-md bg-transparent px-4 py-2 text-base font-semibold outline outline-2 outline-neutral-400`}
              >
                {actionText}
              </button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}

export default ConfirmPopup;
