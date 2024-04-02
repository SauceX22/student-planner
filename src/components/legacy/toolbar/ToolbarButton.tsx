"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  icon: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function EventItemButton({ icon, onClick, className }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mx-auto flex h-14 w-14 flex-none items-center justify-center rounded-md text-neutral-400 duration-150 hover:bg-neutral-600 hover:text-neutral-200",
        className,
      )}
    >
      {icon}
    </button>
  );
}

export default EventItemButton;
