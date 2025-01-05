"use client";

import { addAnimalAction } from "@/actions/animals";
import { Animal } from "@/actions/animals/type";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@/hooks/use-mutation";
import { cn } from "@/lib/utils";
import { animalSchema } from "@/lib/validation/animale.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const defaultValues: Animal = {
  name: "",
  breed: "",
  age: 0,
  teeth: 0,
  weight: 0,
  status: "ACTIVE",
  healthStatus: "HEALTHY",
  birthType: "SINGLE",
  parentId: null,
  isPurchased: false,
  purchaseDate: null,
  purchaseImage: null,
  purchasePrice: null,
  middleman: null,
  seller: null,
  comments: "",
  latestImage: null,
  species: "Cow",
  expectedSalePrice: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
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
        return;
      }

      toast({
        title: error.type,
        description: error.message,
      });
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
  const isValid = addAnimalForm.formState.isValid;

  return (
    <div className="container mx-auto py-6 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add New Animal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...addAnimalForm}>
            <form className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={addAnimalForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Animal Name</FormLabel>
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
                          <Input placeholder="Enter breed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={addAnimalForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (years)</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addAnimalForm.control}
                    name="teeth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teeth Count</FormLabel>
                        <FormControl>
                          <Input
                            type="string"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
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
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={addAnimalForm.control}
                  name="healthStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Health Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select health status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="HEALTHY">Healthy</SelectItem>
                          <SelectItem value="SICK">Sick</SelectItem>
                          <SelectItem value="UNDER_TREATMENT">
                            Under Treatment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Source Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Source Information</h3>
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
                        <FormLabel>Purchased from Market</FormLabel>
                        <FormDescription>
                          Check if the animal was purchased from a market rather
                          than born in the farm
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {isPurchased ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={addAnimalForm.control}
                        name="purchaseDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Purchase Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value ?? undefined}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
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
                                placeholder="Enter purchase price"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={addAnimalForm.control}
                        name="seller"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seller Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter seller name"
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addAnimalForm.control}
                        name="middleman"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Middleman (if any)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter middleman name"
                                {...field}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ) : (
                  <FormField
                    control={addAnimalForm.control}
                    name="parentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Animal ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter parent animal ID"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the ID of the mother cow if born in the farm
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <Separator />

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Additional Information
                </h3>
                <FormField
                  control={addAnimalForm.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Add any additional comments" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => addAnimalForm.reset()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!isValid}>
                  Add Animal
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddAnimalForm;

//
