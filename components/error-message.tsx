import { ErrorType } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorMessage({
  error,
}: {
  error: {
    type: ErrorType;
    message: string;
    details?: Record<string, any>;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-red-500">
          <p>Error Type: {error?.type}</p>
          <p>Message: {error?.message}</p>
          {error?.details && (
            <pre className="mt-2 p-2 bg-gray-100 rounded">
              {JSON.stringify(error.details, null, 2)}
            </pre>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
