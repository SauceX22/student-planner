import React, { useState } from "react";

import { Card } from "@/components/ui/card";
import AnimatedCard from "@/components/events/animated-card";

type Props = React.ComponentProps<typeof Card>;

// always retracted, on hover expand down
const HoverCardList = ({ className, ...props }: Props) => {
  const [height, setHeight] = useState([100]);

  return (
    <div className="w-1/3">
      <AnimatedCard />
    </div>
  );
};

export default HoverCardList;
