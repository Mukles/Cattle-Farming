import { getAnimales } from "@/app/actions/animals";
import ErrorMessage from "@/components/error-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimalDataTable from "./_components/animal-data-table";

export default async function AnimalePage() {
  const result = await getAnimales();
  if (result?.success === false) {
    return <ErrorMessage error={result.error!} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Animals Management</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimalDataTable data={result?.data!} />
      </CardContent>
    </Card>
  );
}
