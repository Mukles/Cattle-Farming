import { Cat, LayoutDashboard } from "lucide-react";

// Define a type for the basic menu item structure
interface MenuItem {
  name: string;
  url: string;
  tag?: string;
}

// Define a type for the dashboard menu items without the icon
interface DashboardMenuItem {
  name: string;
  url: string;
}

// Define a type for the sidebar menu items with optional children and icons
interface SidebarMenuItem {
  label: string;
  name: string;
  children: SubMenuItem[];
}

// Define a type for submenu items with optional children and icon
interface SubMenuItem {
  name: string;
  url?: string;
  icon?: typeof LayoutDashboard;
  children?: MenuItem[];
}

// Dashboard Menu
export const dashboardMenu: DashboardMenuItem[] = [
  { name: "Profile Settings", url: "/dashboard/profile" },
  { name: "Download History", url: "/dashboard/downloads" },
  { name: "Billing Information", url: "/dashboard/billing" },
  { name: "Support Tickets", url: "/dashboard/tickets" },
  { name: "Team Members", url: "/dashboard/members" },
  { name: "Access Token", url: "/dashboard/access-token" },
];

// Main Menu Items with Nested Support and Dashboard Menus
const menuItems = {
  dashboard: [
    { url: "/ecommerce", name: "Ecommerce" },
    { url: "/analytics", name: "Analytics" },
    { url: "/marketing", name: "Marketing" },
    { url: "/crm", name: "CRM" },
    { url: "/stocks", name: "Stocks", tag: "new" },
  ] as MenuItem[],
  support: [
    { url: "/help", name: "Help" },
    { url: "/faq", name: "FAQ" },
  ] as MenuItem[],
};

// Sidebar Menu with Nested Menu Items and Icons
export const sidebarMenu: SidebarMenuItem[] = [
  {
    label: "MENU",
    name: "menu",
    children: [
      {
        name: "Dashboard",
        icon: Cat,
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
];
