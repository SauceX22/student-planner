"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { debounce } from "lodash";
import { ChevronRight } from "lucide-react";
import type { User } from "next-auth";

import { dashboardConfig } from "@/config/dashboard";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account-nav";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  // items: SidebarNavItem[];
  user: User;
}

const items = dashboardConfig.sidebarNav;

const MotionLink = m(Link);
const MotionUserAccountNav = m(UserAccountNav);

const HOVER_THRESHOLD = 0.15 as const;
const DEBOUNCE_TIME = 400 as const;

export function DashboardNav({ user }: DashboardNavProps) {
  const path = usePathname();
  const [expanded, setExpanded] = useState(true);

  const handleHoverEnd = debounce(() => {
    setExpanded(false);
  }, DEBOUNCE_TIME); // Adjust debounce delay as needed

  window.addEventListener("mousemove", (mouseEvent) => {
    if (mouseEvent.clientX < window.innerWidth * HOVER_THRESHOLD) {
      handleHoverEnd.cancel();
      setExpanded(true);
    } else {
      handleHoverEnd();
    }
  });

  if (!items?.length) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-10 m-6 flex h-[95%] w-[20%] flex-col items-center justify-start rounded-lg border-2 bg-white p-2 shadow-xl transition-transform duration-500",
        !expanded && "-translate-x-[130%] transform"
      )}>
      {/* <Introduction focusChat={() => {}} /> */}
      <UserAccountNav user={user} />
      <AnimatePresence>
        {expanded && (
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
                    initial={{
                      filter: "blur(2px)",
                      opacity: 0,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                    }}
                    exit={{
                      filter: "blur(2px)",
                      opacity: 0,
                    }}
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
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const Introduction = ({ focusChat }: { focusChat?: () => void }) => {
  const [hideIntro, setHideIntro] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!hideIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [hideIntro]);

  return (
    <div
      className={
        "fixed inset-0 flex h-screen w-screen items-center justify-center transition-all " +
        (hideIntro ? "pointer-events-none z-[52]" : "z-50 bg-white")
      }>
      <div className="flex max-w-md flex-col items-center">
        <div
          className={
            "pointer-events-auto relative z-[52] flex gap-2 border bg-white px-3 py-2 transition-all duration-500 " +
            (hideIntro
              ? "w-56 -translate-y-[39vh] rounded-xl border-neutral-200 shadow-lg"
              : "mb-8 w-32 translate-x-0 rounded-none border-white")
          }>
          <div
            className={
              "aspect-square rounded-full bg-[url('https://avatar.vercel.sh/rauchg?size=40')] bg-cover transition-all duration-500 " +
              (hideIntro ? "w-12" : "w-24")
            }></div>
          {hideIntro && (
            <div
              className={
                "absolute top-1/2 z-10 mb-2 -translate-y-1/2 truncate p-1.5 transition-all duration-500 " +
                (hideIntro ? "left-[72px] opacity-100" : "opacity-0 blur-xl")
              }>
              <h2 className="font-medium">Florian's AI Clone</h2>
              <p className="text-sm text-neutral-500">Online 24/7</p>
            </div>
          )}
        </div>
        {!ready ? (
          <div
            className={
              "flex h-32 w-full flex-col items-center transition-all " +
              (hideIntro ? "opacity-0 blur-lg" : "opacity-100 blur-none")
            }>
            <h1 className="mb-2 text-center text-2xl font-bold">
              Talk to my AI clone
            </h1>
            <p className="mb-8 text-center text-neutral-500">
              This AI is a clone of me, especially useful for employees who want
              to ask me questions when I'm not around.
            </p>
            <Button
              onClick={() => {
                setHideIntro(true);
                focusChat?.();
                setTimeout(() => {
                  setReady(true);
                }, 500);
              }}>
              Get Started
            </Button>
          </div>
        ) : (
          <div className="h-32" />
        )}
      </div>
    </div>
  );
};
