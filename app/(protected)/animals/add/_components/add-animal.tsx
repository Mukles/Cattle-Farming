"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn } from "@/lib/utils";
import { animalSchema } from "@/lib/validation/animale";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function AddAnimalForm() {
  const addAnimalForm = useForm<z.infer<typeof animalSchema>>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      name: "",
      age: 0,
      breed: "",
      isPurchased: false,
      purchaseDate: "",
      seller: "",
      weight: 0,
      healthStatus: "Healthy",
      purchasePrice: 0,
    },
  });

  const isPurchased = addAnimalForm.watch("isPurchased");

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Add New Animal
        </h2>
        <Form {...addAnimalForm}>
          <form
            onSubmit={addAnimalForm.handleSubmit((data) => console.log(data))}
            className="space-y-4"
          >
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
                    <Input placeholder="Enter Age" {...field} />
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
                    <Input placeholder="Enter weight" {...field} />
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
                          <>
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
                          </>
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
                        <Input placeholder="Enter Price" {...field} />
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
              >
                Add Animal
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddAnimalForm;
