"use client";

import { Animal } from "@/actions/animals/type";
import { columns } from "@/components/animales/column";
import { DataTable } from "@/components/animales/data-table";

export default function AnimalDataTable({ data }: { data: Animal[] }) {
  console.log(data);
  return <DataTable data={data} columns={columns} />;
}
