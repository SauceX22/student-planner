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
      title: "Home",
      href: "/home",
      icon: "home",
    },

    {
      title: "Users",
      href: "/users",
      icon: "user",
      adminOnly: true,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
};
