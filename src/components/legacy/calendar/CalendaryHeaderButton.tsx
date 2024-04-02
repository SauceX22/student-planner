import { clsx } from "clsx";

type ButtonProps = {
  icon: React.ReactNode;
  accessTxt: string;
  clickFunction: () => void;
  prominent: boolean;
};

export function CalendarHeaderButton({
  icon,
  accessTxt,
  clickFunction,
  prominent,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={clickFunction}
      className={clsx(
        `flex flex-none items-center place-self-center justify-center mx-1.5 my-auto text-2xl hover:bg-neutral-700 h-14 w-14 rounded-full text-neutral-400`,
        prominent ? "hover:text-red-500" : "hover:text-neutral-300",
      )}
    >
      <span className="sr-only">{accessTxt}</span>
      {icon}
    </button>
  );
}
