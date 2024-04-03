import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  MotionCard,
  MotionCardContent,
  MotionCardHeader,
} from "@/components/ui/motion-card";
import { cn } from "@/lib/utils";

type Props = {
  // event: Pick<EventType, "title" | "description" | "color">;
} & React.ComponentProps<typeof Card>;

const AnimatedCard = ({ className, ...props }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <MotionCard
      className={cn(
        className,
        "relative w-full cursor-pointer select-none overflow-hidden rounded-2xl p-4 transition-colors",
        { "bg-blue-900": expanded }
      )}
      style={{ height: expanded ? "auto" : "fit-content" }}
      onTap={() => setExpanded(!expanded)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.1,
        type: "spring",
        stiffness: 700,
        damping: 30,
      }}
      layout>
      <MotionCardHeader
        layout
        className={cn("p-4", {
          "pb-6": expanded,
        })}>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </MotionCardHeader>
      <AnimatePresence mode="popLayout">
        {expanded && (
          <MotionCardContent
            key="expanded-content"
            initial={{
              opacity: 0,
              y: 10, // move downwards slightly
              scaleX: 0.98, // scale on x-axis
              filter: "blur(2px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scaleX: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0.5,
              y: 10, // move downwards slightly
              scaleX: 0.98, // scale on x-axis
              filter: "blur(2px)",
            }}
            transition={{ duration: 0.13 }}
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

export default AnimatedCard;
