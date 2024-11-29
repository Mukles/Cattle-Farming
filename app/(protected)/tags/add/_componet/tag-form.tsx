"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { createTagAction } from "@/app/actions/tags";
import { Tag } from "@/app/actions/tags/type";
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
import { tagSchema } from "@/lib/validation/tag.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const defaultValues: Tag = {
  createdBy: "",
  id: 0,
  title: "",
};

function AddTagForm() {
  const { toast } = useToast();
  const addTagForm = useForm<Tag>({
    resolver: zodResolver(tagSchema),
    defaultValues,
    mode: "onChange",
  });

  const { action, isPending } = useMutation<Tag>(createTagAction, {
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
  });

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
            <div className="flex justify-end space-x-4">
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
              <Button disabled={isPending} type="submit">
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
