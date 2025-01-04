/*
  Warnings:

  - Made the column `type` on table `Expense` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_type_fkey";

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "type" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_type_fkey" FOREIGN KEY ("type") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
