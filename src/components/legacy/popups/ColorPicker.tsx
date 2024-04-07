import React from "react";
import { X as CloseIcon } from "lucide-react";
import * as RadixPopover from "@radix-ui/react-popover";
import { useState } from "react";
import { allColors } from "@/lib/colorTheme";

type Props = Omit<React.ComponentProps<"div">, ""> & {
  pickColor: (color: string) => void;
  selectedColor: string;
};

const ColorPicker = ({ pickColor, selectedColor, ...props }: Props) => {
  const [open, setOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild>
        <div
          {...props}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: isHover ? "#fff" : selectedColor,
          }}
        ></div>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className="w-52 rounded-md bg-neutral-900 px-2 pb-5 pt-8 shadow-lg transition-all duration-300"
          sideOffset={5}
        >
          {/* Content */}
          {/* TODO: give */}
          <div className="flex max-h-14 flex-col gap-2 scroll-auto">
            {allColors.map((colorRange, index) => (
              <ColorRange
                key={index}
                onPickColor={pickColor}
                setOpen={setOpen}
                colorLeft={colorRange.colorLeft}
                colorMid={colorRange.colorMid}
                colorRight={colorRange.colorRight}
              />
            ))}
          </div>

          {/* TODO: theme color on close x */}
          <RadixPopover.Close
            className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-red-500"
            aria-label="Close"
          >
            <CloseIcon />
          </RadixPopover.Close>
          <RadixPopover.Arrow className="fill-neutral-900" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

type ColorRangeProps = {
  onPickColor: (color: string) => void;
  setOpen: (open: boolean) => void;
  colorLeft: string;
  colorMid: string;
  colorRight: string;
};

const ColorRange = ({
  onPickColor,
  setOpen,
  colorLeft,
  colorMid,
  colorRight,
}: ColorRangeProps) => (
  <div className="flex w-full flex-row items-center justify-center">
    <button
      className="h-12 w-14 rounded-l-lg"
      onClick={() => {
        setOpen(false);
        onPickColor(colorLeft);
      }}
      style={{ backgroundColor: colorLeft }}
    ></button>
    <button
      className="h-12 w-14 rounded-none"
      onClick={() => {
        setOpen(false);
        onPickColor(colorMid);
      }}
      style={{ backgroundColor: colorMid }}
    ></button>
    <button
      className="h-12 w-14 rounded-r-lg"
      onClick={() => {
        setOpen(false);
        onPickColor(colorRight);
      }}
      style={{ backgroundColor: colorRight }}
    ></button>
  </div>
);

export default ColorPicker;
