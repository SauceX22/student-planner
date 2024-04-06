import * as React from "react";

import { cn } from "@/lib/utils";

type DashboardShellProps = React.HTMLAttributes<HTMLDivElement>;

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div
      className={cn("flex h-full flex-col items-start", className)}
      {...props}>
      {children}
    </div>
  );
}
