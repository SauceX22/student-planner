import { LayoutDashboard, Settings, UsersRound } from "lucide-react";

import { type DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      title: "Users",
      href: "/users",
      icon: UsersRound,
      adminOnly: true,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ],
};
