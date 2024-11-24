"use client";

import { addAnimalAction } from "@/actions/animals";
import { Animal } from "@/actions/animals/type";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@/hooks/use-mutation";
import { cn } from "@/lib/utils";
import { animalSchema } from "@/lib/validation/animale";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const defaultValues: Animal = {
  name: "",
  age: 0,
  breed: "",
  isPurchased: false,
  purchaseDate: new Date(),
  seller: "",
  weight: 0,
  healthStatus: "Healthy",
  purchasePrice: 0,
};

function AddAnimalForm() {
  const { toast } = useToast();
  const addAnimalForm = useForm<Animal>({
    resolver: zodResolver(animalSchema),
    defaultValues,
    mode: "onChange",
  });
  const { action, isPending } = useMutation<Animal>(addAnimalAction, {
    onError({ error }) {
      if (error.type === "VALIDATION_ERROR") {
        addAnimalForm.trigger();
      }
    },
    onSuccess(result) {
      addAnimalForm.reset();
      toast({
        title: "Success!",
        description: "Animal added successfully.",
      });
    },
  });
  const isPurchased = addAnimalForm.watch("isPurchased");
  const isValid = !addAnimalForm.formState.isValid;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add New Animal
        </h2>
        <Form {...addAnimalForm}>
          <form action={action} className="space-y-4">
            <FormField
              control={addAnimalForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animal name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter animal name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addAnimalForm.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Breed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addAnimalForm.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (in years)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter Age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addAnimalForm.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (in kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addAnimalForm.control}
              name="healthStatus"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Health Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Healthy">Healthy</SelectItem>
                        <SelectItem value="Sick">Sick</SelectItem>
                        <SelectItem value="Under Treatment">
                          Under Treatment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addAnimalForm.control}
              name="isPurchased"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Purchased from Market?</FormLabel>
                    <FormDescription>
                      Check this box if the animal was purchased from a market
                      or external seller. Additional purchase details will be
                      required if selected
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {isPurchased && (
              <>
                <FormField
                  control={addAnimalForm.control}
                  name="purchaseDate"
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
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
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
                  control={addAnimalForm.control}
                  name="purchasePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Price"
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addAnimalForm.control}
                  name="seller"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Seller/Market Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter seller or market name"
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
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

export default AddAnimalForm;

//
