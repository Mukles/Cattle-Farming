/*
  Warnings:

  - The values [Healthy,Sick,UnderTreatment] on the enum `HealthStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `species` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BirthType" AS ENUM ('SINGLE', 'TWIN', 'TRIPLE', 'OTHER');

-- CreateEnum
CREATE TYPE "FatherInsemination" AS ENUM ('NATURAL', 'ARTIFICIAL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'SOLD', 'DIED');

-- AlterEnum
BEGIN;
CREATE TYPE "HealthStatus_new" AS ENUM ('HEALTHY', 'SICK', 'RECOVERING', 'INJURED');
ALTER TABLE "Animal" ALTER COLUMN "healthStatus" TYPE "HealthStatus_new" USING ("healthStatus"::text::"HealthStatus_new");
ALTER TYPE "HealthStatus" RENAME TO "HealthStatus_old";
ALTER TYPE "HealthStatus_new" RENAME TO "HealthStatus";
DROP TYPE "HealthStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "birthType" "BirthType" DEFAULT 'SINGLE',
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "expectedSalePrice" DOUBLE PRECISION,
ADD COLUMN     "fatherInsemination" "FatherInsemination",
ADD COLUMN     "latestImage" TEXT,
ADD COLUMN     "middleman" TEXT,
ADD COLUMN     "parentId" INTEGER,
ADD COLUMN     "purchaseImage" TEXT,
ADD COLUMN     "species" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "teeth" INTEGER;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_id_fkey" FOREIGN KEY ("id") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
