-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN     "name_zh" TEXT,
ADD COLUMN     "role_zh" TEXT,
ADD COLUMN     "status_zh" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "name_zh" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "notes_zh" TEXT,
ADD COLUMN     "payment_method_zh" TEXT,
ADD COLUMN     "payment_status_zh" TEXT,
ADD COLUMN     "recipient_name_zh" TEXT,
ADD COLUMN     "shipping_address_zh" TEXT,
ADD COLUMN     "shipping_type_zh" TEXT,
ADD COLUMN     "status_zh" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "product_name_zh" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "gateway_zh" TEXT,
ADD COLUMN     "status_zh" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description_zh" TEXT,
ADD COLUMN     "material_zh" TEXT,
ADD COLUMN     "name_zh" TEXT;

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "address_line_zh" TEXT,
ADD COLUMN     "recipient_name_zh" TEXT;
