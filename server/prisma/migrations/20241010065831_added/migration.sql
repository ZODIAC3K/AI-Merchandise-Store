/*
  Warnings:

  - You are about to drop the column `comment` on the `Post` table. All the data in the column will be lost.
  - Added the required column `comment` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "comment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "comment";
