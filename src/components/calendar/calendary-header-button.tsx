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
        `mx-1.5 my-auto flex h-14 w-14 flex-none items-center justify-center place-self-center rounded-full text-2xl text-neutral-400 hover:bg-neutral-700`,
        prominent ? "hover:text-red-500" : "hover:text-neutral-300"
      )}>
      <span className="sr-only">{accessTxt}</span>
      {icon}
    </button>
  );
}
