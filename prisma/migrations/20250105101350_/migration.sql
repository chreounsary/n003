/*
  Warnings:

  - You are about to drop the `_developertoproject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `developer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_developertoproject` DROP FOREIGN KEY `_DeveloperToProject_A_fkey`;

-- DropForeignKey
ALTER TABLE `_developertoproject` DROP FOREIGN KEY `_DeveloperToProject_B_fkey`;

-- DropForeignKey
ALTER TABLE `developer` DROP FOREIGN KEY `Developer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_developerId_fkey`;

-- DropIndex
DROP INDEX `Task_developerId_fkey` ON `task`;

-- DropTable
DROP TABLE `_developertoproject`;

-- DropTable
DROP TABLE `developer`;

-- CreateTable
CREATE TABLE `DeveloperHandler` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `DeveloperHandler_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DeveloperHandlerToProject` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DeveloperHandlerToProject_AB_unique`(`A`, `B`),
    INDEX `_DeveloperHandlerToProject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_developerId_fkey` FOREIGN KEY (`developerId`) REFERENCES `DeveloperHandler`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeveloperHandler` ADD CONSTRAINT `DeveloperHandler_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DeveloperHandlerToProject` ADD CONSTRAINT `_DeveloperHandlerToProject_A_fkey` FOREIGN KEY (`A`) REFERENCES `DeveloperHandler`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DeveloperHandlerToProject` ADD CONSTRAINT `_DeveloperHandlerToProject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
