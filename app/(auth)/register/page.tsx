import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import RegisterForm from "./_components/register-from";

export const metadata: Metadata = {
  title: "Login",
};

export default function Register() {
  return (
    <div className="px-4 py-8 min-h-screen w-full grid place-items-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Welcome
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
