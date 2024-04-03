import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  MotionCard,
  MotionCardContent,
  MotionCardHeader,
} from "@/components/ui/card";
import type { EventType } from "@db/types";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";

type Props = {
  // event: Pick<EventType, "title" | "description" | "color">;
} & React.ComponentProps<typeof Card>;

const DEBOUNCE_TIME = 400;

// always retracted, on click expand down
const HoverCard = ({ className, ...props }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleHoverStart = debounce(() => {
    setExpanded(true);
  }, DEBOUNCE_TIME); // Adjust debounce delay as needed

  return (
    <MotionCard
      className={cn(
        className,
        "w-full p-4 select-none overflow-hidden relative rounded-2xl transition-colors",
        { "bg-blue-800": expanded },
      )}
      style={{ height: expanded ? "auto" : "fit-content" }}
      onTap={() => {
        if (expanded) {
          setExpanded(false);
        } else {
          handleHoverStart.flush() ?? setExpanded(true);
        }
      }}
      onHoverStart={() => !expanded && handleHoverStart()}
      onHoverEnd={() =>
        !expanded ? handleHoverStart.cancel() : setExpanded(false)
      }
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.1,
        type: "spring",
        stiffness: 700,
        damping: 30,
      }}
      layout
    >
      <MotionCardHeader
        layout
        className={cn("p-4", {
          "pb-6": expanded,
        })}
      >
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </MotionCardHeader>
      <AnimatePresence mode="popLayout">
        {expanded && (
          <MotionCardContent
            key="expanded-content"
            initial={{ opacity: 0, filter: "blur(2px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0.5, filter: "blur(2px)" }}
            transition={{ duration: 0.2 }}
            layout
            className="rounded-xl bg-muted px-6 py-4" // Remove overflow-hidden class
          >
            <p>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </p>
          </MotionCardContent>
        )}
      </AnimatePresence>
    </MotionCard>
  );
};

export default HoverCard;
