-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_credit_card_id_fkey";

-- AlterTable
ALTER TABLE "requests" ALTER COLUMN "credit_card_id" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'in_progress';

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
