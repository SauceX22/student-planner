import { CircleX } from "lucide-react";

type LabelChipProps = {
  children: string;
  onClickRemove: (label: string) => void;
};

function LabelChip({ children, onClickRemove }: LabelChipProps) {
  return (
    <div
      className="flex max-h-fit min-w-fit flex-shrink-0 flex-grow-0 flex-row items-center justify-center gap-2 rounded-full bg-transparent py-1 pl-4 pr-1 font-semibold outline outline-2 outline-neutral-700 hover:cursor-pointer hover:bg-neutral-800 hover:opacity-70 focus:outline focus:outline-2 focus:outline-white"
      onClick={() => onClickRemove(children)}
    >
      {children}
      <CircleX className="text-3xl" />
    </div>
  );
}

export default LabelChip;
