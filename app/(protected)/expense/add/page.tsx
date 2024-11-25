import { getAnimales } from "@/app/actions/animals";
import AddExpenseForm from "./_components/expense-form";

export default async function Expense() {
  const animals = await getAnimales();

  if (animals?.success === true) {
    return <AddExpenseForm animales={animals.data} />;
  }

  return (
    <div>
      <h1>Error</h1>
    </div>
  );
}
