/*
  Warnings:

  - A unique constraint covering the columns `[oauth_line_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_oauth_line_id_key" ON "User"("oauth_line_id");
