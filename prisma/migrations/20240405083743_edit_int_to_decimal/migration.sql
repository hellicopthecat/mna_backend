-- AlterTable
ALTER TABLE "EquityLiabilities" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "InNout" ALTER COLUMN "budget" SET DEFAULT 0,
ALTER COLUMN "budget" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "IncomeExpend" ALTER COLUMN "money" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "itemPrice" SET DATA TYPE DECIMAL(65,30);
