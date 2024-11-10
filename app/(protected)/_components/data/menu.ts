import { LayoutDashboard } from "lucide-react";

export const dashboardMenu = [
  {
    name: "Profile Settings",
    url: "/dashboard/profile",
  },
  {
    name: "Download History",
    url: "/dashboard/downloads",
  },
  {
    name: "Billing Information",
    url: "/dashboard/billing",
  },
  {
    name: "Support Tickets",
    url: "/dashboard/tickets",
  },
  {
    name: "Team Members",
    url: "/dashboard/members",
  },
  {
    name: "Access Token",
    url: "/dashboard/access-token",
  },
];

const menuItems = {
  dashboard: [
    { url: "/ecommerce", name: "Ecommerce" },
    { url: "/analytics", name: "Analytics" },
    { url: "/marketing", name: "Marketing" },
    { url: "/crm", name: "CRM" },
    { url: "/stocks", name: "Stocks", tag: "new" },
  ],
  support: [
    { url: "/help", name: "Help" },
    { url: "/faq", name: "FAQ" },
  ],
};

export const sidebarMenu = [
  {
    label: "MENU",
    name: "menu",
    children: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        children: menuItems.dashboard,
      },
      {
        name: "Calendar",
        icon: LayoutDashboard,
      },
      {
        name: "Profile",
        icon: LayoutDashboard,
      },
      {
        name: "Task",
        icon: LayoutDashboard,
        children: menuItems.dashboard,
      },
      {
        name: "Forms",
        icon: LayoutDashboard,
        children: menuItems.support,
      },
      {
        name: "Tables",
        icon: LayoutDashboard,
        children: menuItems.support,
      },
      {
        name: "Pages",
        icon: LayoutDashboard,
        children: menuItems.support,
      },
    ],
  },
  {
    label: "Supports",
    name: "Supports",
    children: [
      {
        name: "Message",
        icon: LayoutDashboard,
      },
      {
        name: "Inbox",
        icon: LayoutDashboard,
      },
      {
        name: "Invoice",
        icon: LayoutDashboard,
      },
    ],
  },
];
