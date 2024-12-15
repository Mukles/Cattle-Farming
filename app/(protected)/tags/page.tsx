import { getTags } from "@/app/actions/tags";
import ErrorMessage from "@/components/error-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TagTable from "./_components/tag-table";

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
        <TagTable tags={result?.data!} />
      </CardContent>
    </Card>
  );
}
