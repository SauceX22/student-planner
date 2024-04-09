"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHover, useIdle, useMouse } from "@uidotdev/usehooks";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { debounce } from "lodash";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { User } from "next-auth";

import { dashboardConfig } from "@/config/dashboard";
import { useMouseAcceleration } from "@/hooks/useMouseAcceleration";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserAccountNav } from "@/components/user-account-nav";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  // items: SidebarNavItem[];
  user: User;
}

const items = dashboardConfig.sidebarNav;

const MotionLink = m(Link);

const SHOW_MOUSE_THRESHOLD = 0.17;
const HIDE_TIME = 500;
const EXPANDED_WIDTH = "17%";

export function DashboardNav({ user }: DashboardNavProps) {
  const path = usePathname();
  const [shown, setShown] = useState(false);
  const idle = useIdle(5000);

  const debounceHide = debounce(() => {
    setShown(false);
  }, HIDE_TIME);

  useEffect(() => {
    if (shown && idle) {
      setShown(false);
    }
  }, [idle]);

  useEffect(() => {
    function handler(mouseEvent: MouseEvent) {
      if (mouseEvent.clientX < window.innerWidth * SHOW_MOUSE_THRESHOLD) {
        debounceHide.cancel();
        setShown(true);
      } else {
        debounceHide();
      }
    }
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  if (!items?.length) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {shown && (
          <m.nav
            className="fixed left-0 top-0 z-50 m-[3vh] flex h-[94%] flex-col items-center justify-start
            rounded-lg border-2 border-input bg-muted p-3 text-muted-foreground  hover:opacity-100"
            layout
            style={{
              // backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              WebkitFontSmoothing: "subpixel-antialiased",
            }}
            initial={{
              filter: "blur(1px)",
              opacity: 0,
              scale: 0.95,
              width: "5%",
            }}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              width: EXPANDED_WIDTH,
            }}
            whileHover={{
              filter: "blur(0px)",
              opacity: 1,
              width: EXPANDED_WIDTH,
            }}
            onHoverStart={() => {
              debounceHide.cancel();
              setShown(true);
            }}
            onHoverEnd={() => {
              debounceHide();
            }}
            exit={{
              filter: "blur(2px)",
              opacity: 0,
              scale: 0.95,
              width: "5%",
            }}
            transition={{
              duration: 0.18,
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}>
            <UserAccountNav user={user} modal={false}>
              <Button
                variant="ghost"
                className="flex h-fit w-full items-center justify-start overflow-hidden rounded-md p-0 hover:bg-background hover:shadow-sm">
                <div className="flex h-full w-full flex-row items-center justify-start overflow-ellipsis p-4">
                  <UserAvatar user={user} className="mr-3 h-10 w-10" />
                  <m.p
                    className="mr-2 truncate text-lg font-semibold leading-none tracking-tight"
                    style={{
                      marginTop: 0,
                    }}
                    initial={{
                      opacity: 0,
                      x: 100,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}>
                    {user.name}
                  </m.p>
                  <ChevronDown className="ml-auto flex-shrink-0 flex-grow-0 text-foreground" />
                </div>
              </Button>
            </UserAccountNav>
            <Separator className="my-4 w-full" />
            <div className="flex h-full w-full flex-col items-start justify-start gap-1 px-2 py-2">
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
                        "group flex h-auto w-full items-center justify-start rounded-md border-none px-4 py-3 text-base font-medium text-foreground hover:bg-background hover:shadow-sm",
                        path === item.href
                          ? "bg-background shadow-sm"
                          : "transparent",
                        { "cursor-not-allowed opacity-80": item.disabled }
                        // { "mt-auto": index === items.length - 1 }
                      )}>
                      <Icon className="mr-2 h-4 w-4" />
                      <m.span
                        initial={{
                          opacity: 0,
                          x: 100,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                          delay: 0.02 * index,
                        }}>
                        {item.title}
                      </m.span>
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
