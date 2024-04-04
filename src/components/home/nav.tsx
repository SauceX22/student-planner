"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { dashboardConfig } from "@/config/dashboard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  // items: SidebarNavItem[];
}

const items = dashboardConfig.sidebarNav;

export function DashboardNav({}: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="flex h-fit w-full flex-col items-start justify-start gap-2 px-2 py-6">
      {items.map((item, index) => {
        if (
          item.adminOnly
          // TODO && session?.user.role !== "MANAGER"
        ) {
          return null;
        }

        const Icon = item.icon ?? ChevronRight;
        return (
          item.href && (
            <Link
              prefetch
              key={index}
              href={item.disabled ? "/dashboard" : item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group flex h-auto w-full items-center justify-start rounded-md border-none px-4 py-3 text-base font-medium text-foreground hover:bg-white",
                path === item.href ? "bg-white" : "transparent",
                item.disabled && "cursor-not-allowed opacity-80"
              )}>
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
