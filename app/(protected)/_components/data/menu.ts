import {
  Cat,
  ClipboardList,
  DollarSign,
  Heart,
  LayoutDashboard,
  Package,
  PlusSquare,
  ShoppingCart,
  Tags,
} from "lucide-react";

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
  { name: "Overview", url: "/dashboard/overview" },
];

// Income Menu
export const incomeMenu: DashboardMenuItem[] = [
  { name: "View All", url: "/income" },
  { name: "Add Income", url: "/income/add" },
];

// Expense Menu
export const expenseMenu: DashboardMenuItem[] = [
  { name: "View All", url: "/expense" },
  { name: "Add Expense", url: "/expense/add" },
];

// Sidebar Menu with Relevant Icons
export const sidebarMenu: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    name: "dashboard",
    children: [
      {
        name: "Overview",
        url: "/dashboard/overview",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Animals",
    name: "animals",
    children: [
      { name: "View All", url: "/animals", icon: Cat },
      { name: "Add New", url: "/animals/add", icon: PlusSquare },
    ],
  },
  {
    label: "Sales",
    name: "sales",
    children: [
      { name: "View All", url: "/sales", icon: ShoppingCart },
      { name: "Add Sale", url: "/sales/add", icon: PlusSquare },
    ],
  },
  {
    label: "Income",
    name: "income",
    children: [
      { name: "View All", url: "/income", icon: DollarSign },
      { name: "Add Income", url: "/income/add", icon: PlusSquare },
    ],
  },
  {
    label: "Expenses",
    name: "expenses",
    children: [
      { name: "View All", url: "/expense", icon: Package },
      { name: "Add Expense", url: "/expense/add", icon: PlusSquare },
    ],
  },
  {
    label: "Feed Management",
    name: "feed-management",
    children: [
      { name: "Schedules", url: "/feed/schedules", icon: ClipboardList },
      { name: "Inventory", url: "/feed/inventory", icon: Package },
    ],
  },
  {
    label: "Tags",
    name: "tags",
    children: [
      { name: "View All", url: "/tags", icon: Tags },
      { name: "Add Tag", url: "/tags/add", icon: PlusSquare },
    ],
  },
  {
    label: "Health",
    name: "health",
    children: [
      { name: "Records", url: "/health/records", icon: Heart },
      { name: "Add Record", url: "/health/add", icon: PlusSquare },
    ],
  },
];
