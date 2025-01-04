import { getAnimales } from "@/app/actions/animals";
import { getTags } from "@/app/actions/tags";
import ErrorMessage from "@/components/error-message";
import AddExpenseForm from "./_components/expense-form";

export default async function Expense() {
  const animals = await getAnimales();
  const tags = await getTags();

  if (animals?.success === true && tags?.success === true) {
    return <AddExpenseForm tags={tags.data} animales={animals.data!} />;
  }
  // @ts-ignore
  return <ErrorMessage error={animals?.error! || tags?.error!} />;
}
