-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "num_reviews" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0.0;