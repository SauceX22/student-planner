import { clsx } from "clsx";
import React from "react";

type Props = {
  icon: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function EventItemButton({ icon, onClick, className, ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      onClick={onClick}
      className={clsx(
        "my-auto flex h-14 w-14 flex-none items-center justify-center place-self-center rounded-md text-neutral-400 transition-colors duration-100 hover:bg-neutral-600 hover:text-neutral-300",
        className,
      )}
    >
      {icon}
    </button>
  );
}

export default EventItemButton;
