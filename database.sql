-- MySQL Database Schema for Library Tracker & Friend Portal (XAMPP phpMyAdmin)

CREATE DATABASE IF NOT EXISTS `library_tracker_friend` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `library_tracker_friend`;

-- Books Table
CREATE TABLE IF NOT EXISTS `books` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `genre` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `pages` int(11) NOT NULL,
  `current_page` int(11) DEFAULT 0,
  `rating` float DEFAULT 4.5,
  `cover` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `lent_to` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Friends Table
CREATE TABLE IF NOT EXISTS `friends` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(100) NOT NULL,
  `avatar` text DEFAULT NULL,
  `currently_reading` varchar(255) DEFAULT NULL,
  `compatibility` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Posts Table
CREATE TABLE IF NOT EXISTS `posts` (
  `id` varchar(50) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `avatar` text DEFAULT NULL,
  `content` text NOT NULL,
  `book_title` varchar(255) DEFAULT NULL,
  `book_author` varchar(255) DEFAULT NULL,
  `book_cover` text DEFAULT NULL,
  `quote` text DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Loans Table
CREATE TABLE IF NOT EXISTS `loans` (
  `id` varchar(50) NOT NULL,
  `book_title` varchar(255) NOT NULL,
  `cover` text DEFAULT NULL,
  `lender` varchar(255) NOT NULL,
  `borrower` varchar(255) NOT NULL,
  `due_date` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Sample Data
INSERT INTO `books` (`id`, `title`, `author`, `genre`, `status`, `pages`, `current_page`, `rating`, `cover`, `notes`, `excerpt`) VALUES
('b1', 'Project Hail Mary', 'Andy Weir', 'Sci-Fi', 'reading', 496, 340, 4.9, 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&auto=format&fit=crop&q=80', 'Incredible survival narrative!', 'Ryland Grace is the sole survivor on a desperate mission.'),
('b2', 'Dune: Part One', 'Frank Herbert', 'Sci-Fi', 'completed', 658, 658, 4.8, 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', 'Masterpiece of sci-fi worldbuilding.', 'A beginning is the time for taking the most delicate care.'),
('b3', 'Atomic Habits', 'James Clear', 'Psychology', 'completed', 320, 320, 5.0, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80', 'Systems over goals.', 'You do not rise to the level of your goals.');

INSERT INTO `friends` (`id`, `name`, `handle`, `avatar`, `currently_reading`, `compatibility`) VALUES
('f1', 'Sarah Jenkins', '@sarah_reads', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'The Name of the Wind', '94%'),
('f2', 'Marcus Chen', '@marcus_scifi', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Hyperion Cantos', '98%');

INSERT INTO `posts` (`id`, `user_name`, `avatar`, `content`, `book_title`, `likes`) VALUES
('p1', 'Sarah Jenkins', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'Finished Chapter 12 of The Name of the Wind!', 'The Name of the Wind', 8);

INSERT INTO `loans` (`id`, `book_title`, `cover`, `lender`, `borrower`, `due_date`, `status`, `type`) VALUES
('l1', 'The Name of the Wind', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80', 'Alex Morgan (You)', 'Sarah Jenkins', '2026-08-15', 'active', 'lent');
