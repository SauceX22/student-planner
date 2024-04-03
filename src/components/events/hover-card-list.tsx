import React, { useState } from "react";
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
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import HoverCard from "@/components/events/hover-card";
import { Slider } from "@/components/ui/slider";

type Props = {} & React.ComponentProps<typeof Card>;

// always retracted, on hover expand down
const HoverCardList = ({ className, ...props }: Props) => {
  const [height, setHeight] = useState([100]);

  return (
    <div className="w-1/3">
      <HoverCard />
    </div>
  );
};

export default HoverCardList;
