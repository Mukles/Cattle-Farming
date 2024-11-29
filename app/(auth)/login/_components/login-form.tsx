"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

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

import { loginUser } from "@/app/actions/user";
import { User } from "@/app/actions/user/type";
import { useMutation } from "@/hooks/use-mutation";
import { userSchema } from "@/lib/validation/user.schema";
import { useSession } from "next-auth/react";

export default function LoginForm() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  console.log({ session });

  const loginUserForm = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "mukles.themefisher@gmail.com",
      password: "Kitkat124$",
    },
  });

  // @ts-ignore
  const { action, isPending } = useMutation<User>(loginUser, {
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
