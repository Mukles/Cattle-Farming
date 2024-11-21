import { getAnimales } from "@/app/actions/animals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimalDataTable from "./_components/animal-data-table";

export default async function AnimalePage() {
  const result = await getAnimales();

  if (result?.success === false) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">
            <p>Error Type: {result.error?.type}</p>
            <p>Message: {result.error?.message}</p>
            {result.error?.details && (
              <pre className="mt-2 p-2 bg-gray-100 rounded">
                {JSON.stringify(result.error.details, null, 2)}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>
    );
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
