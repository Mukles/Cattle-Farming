"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

import { Expense } from "@/actions/expense/type";
import { Animal } from "@/app/actions/animals/type";
import { addExpenseAction } from "@/app/actions/expense";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@/hooks/use-mutation";
import { cn } from "@/lib/utils";
import { expenseSchema } from "@/lib/validation/expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const defaultValues: Expense = {
  date: new Date(),
  description: "",
  // @ts-ignore
  amount: "",
  // @ts-ignore
  type: "",
  animalId: "",
};

export default function AddExpenseForm({
  animales,
  tags,
}: {
  animales: Animal[];
  tags: Tag[];
}) {
  const { toast } = useToast();
  const addExpenseForm = useForm<Expense>({
    resolver: zodResolver(expenseSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const { action, isPending } = useMutation<Expense>(addExpenseAction, {
    onError({ error }) {
      if (error.type === "VALIDATION_ERROR") {
        addExpenseForm.trigger();
        return;
      }

      toast({
        title: error.type,
        description: error.message,
      });
    },
    onSuccess(result) {
      addExpenseForm.reset();
      toast({
        title: "Success!",
        description: "Expense added successfully.",
      });
    },
  });

  const isValid = addExpenseForm.formState.isValid;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add New Expense
        </h2>
        <Form {...addExpenseForm}>
          <form action={action} className="space-y-4">
            <FormField
              control={addExpenseForm.control}
              name="animalId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field} value={field.value?.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an animal" />
                      </SelectTrigger>
                      <SelectContent>
                        {animales.length === 0 ? (
                          <SelectItem value="0">No animals found</SelectItem>
                        ) : (
                          animales.map((animale) => {
                            return (
                              <SelectItem
                                key={animale.id}
                                value={animale.id!.toString()}
                              >
                                {animale.name}
                              </SelectItem>
                            );
                          })
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addExpenseForm.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an expense type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Expense Types</SelectLabel>
                          {tags.map((tag) => {
                            return (
                              <SelectItem
                                key={tag.id}
                                value={tag.id.toString()}
                              >
                                {tag.title}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addExpenseForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addExpenseForm.control}
              name="date"
              render={({ field }) => {
                const date = field.value;
                return (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Input
                          type="hidden"
                          value={field.value?.toISOString()}
                          name={field.name}
                        />
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {date ? (
                                format(date, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              {...field}
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              mode="single"
                              initialFocus
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={addExpenseForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
              <Button disabled={isPending || !isValid} type="submit">
                Add Animal
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
