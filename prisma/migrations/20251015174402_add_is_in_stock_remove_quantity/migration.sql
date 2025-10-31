/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.

*/
-- Add the isInStock column with default value false
ALTER TABLE "Product" ADD COLUMN "isInStock" BOOLEAN NOT NULL DEFAULT false;

-- Update isInStock based on quantity
UPDATE "Product" SET "isInStock" = true WHERE "quantity" > 0;

-- Drop the quantity column
ALTER TABLE "Product" DROP COLUMN "quantity";
