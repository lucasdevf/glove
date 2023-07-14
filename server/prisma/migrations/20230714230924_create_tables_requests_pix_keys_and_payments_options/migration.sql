-- CreateEnum
CREATE TYPE "PixKeyType" AS ENUM ('cellphone', 'cpf', 'email', 'random');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('completed', 'in_progress');

-- CreateTable
CREATE TABLE "pix_keys" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "PixKeyType" NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pix_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "tax_percent" DOUBLE PRECISION NOT NULL,
    "pix_key_id" TEXT,
    "credit_card_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments_options" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "request_id" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_pix_key_id_fkey" FOREIGN KEY ("pix_key_id") REFERENCES "pix_keys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_credit_card_id_fkey" FOREIGN KEY ("credit_card_id") REFERENCES "credit_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments_options" ADD CONSTRAINT "payments_options_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
