import React from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  // event: Pick<EventType, "title" | "description" | "color">;
} & React.ComponentProps<typeof AccordionItem>;

// always retracted, on hover expand down
const EventCard = ({ className, ...props }: Props) => {
  return (
    <AccordionItem {...props} className="border-none">
      <AccordionTrigger asChild className="py-0">
        <Card className={cn(className, "w-full")}>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <AccordionContent className="p-0">
            <CardContent>
              <p>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </p>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionTrigger>
    </AccordionItem>
  );
};

export default EventCard;
