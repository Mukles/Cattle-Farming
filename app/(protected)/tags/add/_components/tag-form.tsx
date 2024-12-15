"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { createTagAction } from "@/app/actions/tags";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@/hooks/use-mutation";
import { updateTagSchema } from "@/lib/validation/tag.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";

function AddTagForm({ user }: { user: User }) {
  const { toast } = useToast();
  const addTagForm = useForm<z.infer<typeof updateTagSchema>>({
    resolver: zodResolver(updateTagSchema),
    defaultValues: {
      title: "",
      createdBy: user?.id,
    },
    mode: "onChange",
  });

  const { action, isPending } = useMutation<z.infer<typeof updateTagSchema>>(
    createTagAction,
    {
      onError({ error }) {
        if (error.type === "VALIDATION_ERROR") {
          addTagForm.trigger();
          return;
        }
        toast({
          title: error.type,
          description: error.message,
        });
      },
      onSuccess(result) {
        addTagForm.reset();
        toast({
          title: "Success!",
          description: "Animal added successfully.",
        });
      },
    }
  );

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add New Tag
        </h2>
        <Form {...addTagForm}>
          <form action={action} className="space-y-4">
            <FormField
              control={addTagForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addTagForm.control}
              name="createdBy"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
              <Button
                disabled={!addTagForm.formState.isValid || isPending}
                type="submit"
              >
                Add Tag
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddTagForm;
