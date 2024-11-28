import { getTags } from "@/app/actions/tags";
import ErrorMessage from "@/components/error-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseTable from "./add/_componet/expense-table";

export default async function Tags() {
  const result = await getTags();

  if (result?.success === false) {
    return <ErrorMessage error={result.error!} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags Management</CardTitle>
      </CardHeader>
      <CardContent>
        <ExpenseTable />
      </CardContent>
    </Card>
  );
}
