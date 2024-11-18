"use client";

import { columns } from "@/components/animales/column";
import { DataTable } from "@/components/animales/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnimalePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Animals Management</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={[]} />
      </CardContent>
    </Card>
  );
}
