-- CreateTable
CREATE TABLE "credit_cards" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "holder_name" TEXT NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL,
    "cvv" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_cards_pkey" PRIMARY KEY ("id")
);
