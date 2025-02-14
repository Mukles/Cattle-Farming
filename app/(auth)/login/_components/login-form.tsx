"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { loginUser } from "@/app/actions/user";
import { useMutation } from "@/hooks/use-mutation";
import { loginUserSchema } from "@/lib/validation/user.schema";
import Link from "next/link";
import { z } from "zod";

export default function LoginForm() {
  const { toast } = useToast();
  const loginUserForm = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "mukles.themefisher@gmail.com",
      password: "Kitkat124$",
    },
  });

  // @ts-ignore
  const { action, isPending, state } = useMutation<unkonwn>(loginUser, {
    onError({ error }) {
      if (error.type === "VALIDATION_ERROR") {
        loginUserForm.trigger();
        return;
      }
      toast({
        title: error.type,
        description: error.message,
      });
    },
    onSuccess(result) {
      loginUserForm.reset();
      toast({
        title: "Success!",
        description: "User logged in successfully.",
      });
    },
  });

  return (
    <Form {...loginUserForm}>
      <form className="space-y-6" action={action}>
        <FormField
          control={loginUserForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginUserForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-right text-sm">
          <Link href="#" className="text-primary hover:underline font-medium">
            Forgot your password?
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>

        <p className="text-sm text-muted-foreground">
          Don't have an account?
          <Link
            className="text-primary hover:underline font-medium"
            href="/register"
          >
            Create account
          </Link>
        </p>
      </form>
    </Form>
  );
}
