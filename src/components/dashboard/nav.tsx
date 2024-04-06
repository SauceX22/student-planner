"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { dashboardConfig } from "@/config/dashboard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  // items: SidebarNavItem[];
}

const items = dashboardConfig.sidebarNav;

const MotionLink = motion(Link);

export function DashboardNav({}: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="flex h-full w-full flex-col items-start justify-start gap-1 px-2 pb-2 pt-6">
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
            <MotionLink
              layout
              prefetch
              key={index}
              href={item.disabled ? "/dashboard" : item.href}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.1,
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group flex h-auto w-full items-center justify-start rounded-md border-none px-4 py-3 text-base font-medium text-foreground hover:bg-white hover:shadow-sm",
                path === item.href ? "bg-white shadow-sm" : "transparent",
                { "cursor-not-allowed opacity-80": item.disabled },
                { "mt-auto": index === items.length - 1 }
              )}>
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </MotionLink>
          )
        );
      })}
    </nav>
  );
}
