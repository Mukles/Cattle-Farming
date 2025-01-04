/*
  Warnings:

  - The `type` column on the `Expense` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "type",
ADD COLUMN     "type" INTEGER;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_type_fkey" FOREIGN KEY ("type") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
