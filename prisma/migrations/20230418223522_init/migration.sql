-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "owner" INTEGER NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cardId" INTEGER NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending'
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "registrationDate" DATETIME NOT NULL,
    "password" TEXT NOT NULL,
    "balance" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_wallet_key" ON "User"("wallet");
