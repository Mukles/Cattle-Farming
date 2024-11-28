"use client";

import { DataTable } from "@/components/data-table/common";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: Date;
  tags: string[];
}

interface ExpenseTableProps {
  data: Expense[];
}

export default function ExpenseTable() {
  const columns = [
    {
      key: "id" as keyof Expense,
      header: "ID",
    },
    {
      key: "description" as keyof Expense,
      header: "Description",
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: "amount" as keyof Expense,
      header: "Amount",
      render: (value: number) => (
        <span className="font-medium">${value.toFixed(2)}</span>
      ),
    },
    {
      key: "category" as keyof Expense,
      header: "Category",
      render: (value: string) => (
        <Badge variant="outline" className="capitalize">
          {value}
        </Badge>
      ),
    },
    {
      key: "date" as keyof Expense,
      header: "Date",
      render: (value: Date) => format(value, "MMM dd, yyyy"),
    },
    {
      key: "tags" as keyof Expense,
      header: "Tags",
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.map((tag, index) => (
            <Badge key={index} variant="secondary" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      ),
    },
  ];

  const data: Expense[] = [
    {
      id: 1,
      description: "Feed Purchase",
      amount: 1200.5,
      category: "feed",
      date: new Date("2024-03-01"),
      tags: ["bulk", "winter", "hay"],
    },
    {
      id: 2,
      description: "Veterinary Services",
      amount: 450.0,
      category: "medical",
      date: new Date("2024-02-28"),
      tags: ["checkup", "vaccination"],
    },
    {
      id: 3,
      description: "Equipment Repair",
      amount: 325.75,
      category: "maintenance",
      date: new Date("2024-02-25"),
      tags: ["urgent", "machinery"],
    },
    {
      id: 4,
      description: "Labor Costs",
      amount: 2800.0,
      category: "labor",
      date: new Date("2024-02-20"),
      tags: ["monthly", "staff"],
    },
    {
      id: 5,
      description: "Fence Maintenance",
      amount: 550.25,
      category: "maintenance",
      date: new Date("2024-02-15"),
      tags: ["repair", "infrastructure"],
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      searchKeys={["description", "category", "tags"]}
    />
  );
}
