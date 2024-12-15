"use client";

import { Tag } from "@/actions/tags/type";
import { DataTable } from "@/components/data-table/common";
import { format } from "date-fns";

export default function TagsTable({ tags }: { tags: Tag[] }) {
  const columns = [
    {
      key: "id" as keyof Tag,
      header: "ID",
    },
    {
      key: "title" as keyof Tag,
      header: "Title",
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: "user" as keyof Tag,
      header: "Created By",
      render: (value: Tag["user"]) => (
        <span className="font-medium">
          {value?.firstName} {value?.lastName}
        </span>
      ),
    },
    {
      key: "createdAt" as keyof Tag,
      header: "Created At",
      render: (value: Date) => format(value, "MMM dd, yyyy"),
    },
  ];

  return (
    <DataTable data={tags} columns={columns} searchKeys={["id", "title"]} />
  );
}
