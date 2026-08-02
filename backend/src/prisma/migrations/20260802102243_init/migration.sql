-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(30) NOT NULL,
    `profile_image` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_nickname_key`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diaries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `title` VARCHAR(100) NULL,
    `content` TEXT NOT NULL,
    `emotion` ENUM('HAPPY', 'CALM', 'SAD', 'ANGRY', 'ANXIOUS', 'EXCITED', 'TIRED') NOT NULL,
    `weather` VARCHAR(30) NULL,
    `temperature` DECIMAL(4, 1) NULL,
    `location` VARCHAR(100) NULL,
    `ai_summary` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `diaries_user_id_idx`(`user_id`),
    INDEX `diaries_created_at_idx`(`created_at`),
    INDEX `diaries_emotion_idx`(`emotion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diary_id` INTEGER NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `photos_diary_id_idx`(`diary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `musics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diary_id` INTEGER NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `artist` VARCHAR(100) NULL,
    `youtube_url` VARCHAR(255) NULL,
    `spotify_url` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `musics_diary_id_idx`(`diary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diary_tags` (
    `diary_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    INDEX `diary_tags_diary_id_idx`(`diary_id`),
    INDEX `diary_tags_tag_id_idx`(`tag_id`),
    PRIMARY KEY (`diary_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ai_reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `report_type` ENUM('MONTH', 'YEAR') NOT NULL,
    `target_year` INTEGER NOT NULL,
    `target_month` INTEGER NULL,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ai_reports_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time_capsules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diary_id` INTEGER NOT NULL,
    `open_at` DATETIME(3) NOT NULL,
    `is_opened` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `time_capsules_diary_id_key`(`diary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `diaries` ADD CONSTRAINT `diaries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_diary_id_fkey` FOREIGN KEY (`diary_id`) REFERENCES `diaries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `musics` ADD CONSTRAINT `musics_diary_id_fkey` FOREIGN KEY (`diary_id`) REFERENCES `diaries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diary_tags` ADD CONSTRAINT `diary_tags_diary_id_fkey` FOREIGN KEY (`diary_id`) REFERENCES `diaries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diary_tags` ADD CONSTRAINT `diary_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ai_reports` ADD CONSTRAINT `ai_reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time_capsules` ADD CONSTRAINT `time_capsules_diary_id_fkey` FOREIGN KEY (`diary_id`) REFERENCES `diaries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
