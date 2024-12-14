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
import { z } from "zod";

import { createUser } from "@/app/actions/user";
import { useMutation } from "@/hooks/use-mutation";
import { userSchema } from "@/lib/validation/user.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterForm() {
  const { toast } = useToast();
  const registerUserForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "Mukles",
      lastName: "Ali",
      image: "",
      email: "mukles.themefisher@gmail.com",
      password: "Kitkat124$",
    },
  });

  const { action, isPending } = useMutation(createUser, {
    onError({ error }) {
      if (error.type === "VALIDATION_ERROR") {
        registerUserForm.trigger();
        return;
      }
      toast({
        title: error.type,
        description: error.message,
      });
    },
    onSuccess(result) {
      registerUserForm.reset();
      toast({
        title: "Success!",
        description: "User register in successfully.",
      });

      signIn("credentials", {
        email: registerUserForm.getValues("email"),
        password: registerUserForm.getValues("password"),
      });
    },
  });

  return (
    <Form {...registerUserForm}>
      <form className="space-y-6" action={action}>
        <FormField
          control={registerUserForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your last name"
                  {...field}
                  value={field.value!}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerUserForm.control}
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
          control={registerUserForm.control}
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}
