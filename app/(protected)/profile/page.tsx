"use client";

import { updatUser } from "@/actions/user";
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
import useDeepCompare from "@/hooks/use-deep-compare";
import { useMutation } from "@/hooks/use-mutation";
import { useToast } from "@/hooks/use-toast";
import { updateUserSchema } from "@/lib/validation/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProfileImageUpload } from "./_components/profile-image-upload";

export default function ProfileForm() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const { user } = session || {};
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      image: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      form.setValue("firstName", user?.firstName || "");
      form.setValue("lastName", user?.lastName || "");
      form.setValue("image", user?.image || "");
    }
  }, [status]);

  const isChanged = useDeepCompare({
    firstName: form.getValues("firstName"),
    lastName: form.getValues("lastName"),
  });

  const { action, isPending, state } = useMutation(updatUser, {
    onSuccess() {
      toast({
        title: "Success!",
        description: "User updated successfully.",
      });
    },
    onError({ error }) {
      if (error.type === "VALIDATION_ERROR") {
        form.trigger();
        return;
      }
      toast({
        title: error.type,
        description: error.message,
      });
    },
  });

  return (
    <div className="max-w-md mx-auto border p-5 rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <ProfileImageUpload
                  previewImage={previewImage}
                  setPreviewImage={setPreviewImage}
                  field={field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} value={field.value!} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={isChanged || isPending}
            type="submit"
            size="lg"
            className="w-full"
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
