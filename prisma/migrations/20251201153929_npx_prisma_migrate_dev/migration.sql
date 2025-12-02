/*
  Warnings:

  - Made the column `order_number` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order_id` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `product_id` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unit_price` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password_hash` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- AlterTable
ALTER TABLE "AdminUser" ALTER COLUMN "password_hash" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "order_number" SET NOT NULL,
ALTER COLUMN "user_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "order_id" SET NOT NULL,
ALTER COLUMN "product_id" SET NOT NULL,
ALTER COLUMN "unit_price" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password_hash" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
