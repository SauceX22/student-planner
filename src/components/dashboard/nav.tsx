"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMouse } from "@uidotdev/usehooks";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { debounce } from "lodash";
import { ChevronRight } from "lucide-react";
import type { User } from "next-auth";

import { dashboardConfig } from "@/config/dashboard";
import { buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account-nav";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  // items: SidebarNavItem[];
  user: User;
}

const items = dashboardConfig.sidebarNav;

const MotionLink = m(Link);

const HOVER_THRESHOLD = 0.13;
const DEBOUNCE_TIME = 450;

export function DashboardNav({ user }: DashboardNavProps) {
  const path = usePathname();
  const [expanded, setExpanded] = useState(false);

  const handleHide = debounce(() => {
    setExpanded(false);
  }, DEBOUNCE_TIME); // Adjust debounce delay as needed

  window?.addEventListener("mousemove", (mouseEvent) => {
    handleHide.cancel();
    if (mouseEvent.clientX < window.innerWidth * HOVER_THRESHOLD) {
      setExpanded(true);
    } else {
      handleHide();
    }
  });

  if (!items?.length) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {expanded && (
          <m.nav
            className="fixed left-0 top-0 z-50 m-6 flex h-[95%] w-[18%] flex-col items-center justify-start rounded-xl border-2 border-input bg-muted p-3 shadow-lg"
            layout
            initial={{
              x: "-130%",
              filter: "blur(1px)",
            }}
            animate={{
              x: "0",
              filter: "blur(0px)",
            }}
            whileHover={{
              x: "0",
              filter: "blur(0px)",
            }}
            exit={{
              x: "-130%",
              filter: "blur(1px)",
            }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}>
            <UserAccountNav user={user} />
            <div className="flex h-full w-full flex-col items-start justify-start gap-1 px-2 pb-2 pt-6">
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
                        path === item.href
                          ? "bg-white shadow-sm"
                          : "transparent",
                        { "cursor-not-allowed opacity-80": item.disabled },
                        { "mt-auto": index === items.length - 1 }
                      )}>
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </MotionLink>
                  )
                );
              })}
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
