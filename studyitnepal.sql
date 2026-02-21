-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2026 at 07:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studyitnepal`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `follow_us` text DEFAULT NULL,
  `facebook_profile` varchar(255) DEFAULT NULL,
  `instagram_Profile` varchar(255) DEFAULT NULL,
  `linkedln_Profile` varchar(255) DEFAULT NULL,
  `youtube_url` varchar(255) DEFAULT NULL,
  `about_us` text DEFAULT NULL,
  `about_img` varchar(255) DEFAULT NULL,
  `hideText` text DEFAULT NULL,
  `hideTextStatus` tinyint(1) DEFAULT 1,
  `footer_left` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `address`, `follow_us`, `facebook_profile`, `instagram_Profile`, `linkedln_Profile`, `youtube_url`, `about_us`, `about_img`, `hideText`, `hideTextStatus`, `footer_left`, `createdAt`, `updatedAt`) VALUES
(1, 'Demo', 'demo@gmail.com', '$2b$10$JEV1o1Jt./BppUkmRAI8V.EILHKaUixqVVkI9aJnYGILka0zm.xVS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-20 18:07:28', '2026-02-20 18:07:28'),
(2, 'User', 'anilb@gmail.com', '$2b$10$FoN.4EIexz6MMQHn6w1uHuDdh4ElOo.t0qPqe0HmDEhzHZxLmzeHC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-02-20 18:07:28', '2026-02-20 18:07:28');

-- --------------------------------------------------------

--
-- Table structure for table `blogcategories`
--

CREATE TABLE `blogcategories` (
  `id` int(11) NOT NULL,
  `category_name` text NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `blog` text DEFAULT NULL,
  `category_id` varchar(255) NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `sem_id` varchar(255) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `pdf_book` varchar(255) NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course_name` text NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `ans` text NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `missions`
--

CREATE TABLE `missions` (
  `id` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `sem_id` varchar(255) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `unit_id` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `practicals`
--

CREATE TABLE `practicals` (
  `id` int(11) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `sem_id` varchar(255) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `pdf_practical` varchar(255) NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `sem_id` varchar(255) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `questions` varchar(255) NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `test_id` text NOT NULL,
  `user_id` text NOT NULL,
  `title` text NOT NULL,
  `category_id` text NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `marksPerQuestion` text NOT NULL,
  `time` varchar(255) NOT NULL,
  `physics_question` text NOT NULL,
  `math_question` text NOT NULL,
  `chemistry_question` text NOT NULL,
  `english_question` text NOT NULL,
  `computer_question` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sems`
--

CREATE TABLE `sems` (
  `id` int(11) NOT NULL,
  `sem_name` text NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `follow_us` text DEFAULT NULL,
  `facebook_profile` varchar(255) DEFAULT NULL,
  `instagram_Profile` varchar(255) DEFAULT NULL,
  `linkedln_Profile` varchar(255) DEFAULT NULL,
  `youtube_url` varchar(255) DEFAULT NULL,
  `about_us` text DEFAULT NULL,
  `about_img` varchar(255) DEFAULT NULL,
  `home_screen_img` varchar(255) DEFAULT NULL,
  `hideText` text DEFAULT NULL,
  `hideTextStatus` tinyint(1) DEFAULT 1,
  `firebase` text DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `entrance_img` varchar(255) DEFAULT NULL,
  `mail_template` text DEFAULT NULL,
  `send_mail` varchar(255) DEFAULT NULL,
  `app_password` varchar(255) DEFAULT NULL,
  `signin_img` varchar(255) DEFAULT NULL,
  `signup_img` varchar(255) DEFAULT NULL,
  `privacy_Policy` text DEFAULT NULL,
  `terms_of_service` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subject_name` text NOT NULL,
  `description` text NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `sem_id` varchar(255) NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `syllabuses`
--

CREATE TABLE `syllabuses` (
  `id` int(11) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `sem_id` varchar(255) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `syllabus` text NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testcategories`
--

CREATE TABLE `testcategories` (
  `id` int(11) NOT NULL,
  `category_name` text NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE `tests` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `category_id` text NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `marksPerQuestion` text NOT NULL,
  `time` varchar(255) NOT NULL,
  `physics_question` text NOT NULL,
  `math_question` text NOT NULL,
  `chemistry_question` text NOT NULL,
  `english_question` text NOT NULL,
  `computer_question` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `topscores`
--

CREATE TABLE `topscores` (
  `id` int(11) NOT NULL,
  `test_id` varchar(255) NOT NULL,
  `firstLevel` varchar(255) NOT NULL,
  `secondLevel` varchar(255) NOT NULL,
  `thirdLevel` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `course_id` varchar(255) NOT NULL,
  `sem_id` varchar(255) NOT NULL,
  `subject_id` varchar(255) NOT NULL,
  `unit` text NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `profileUrl` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `state` text DEFAULT NULL,
  `district` text DEFAULT NULL,
  `city` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `collegeName` text DEFAULT NULL,
  `studyIn` text DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `otp` text DEFAULT NULL,
  `resetOtp` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `whatsayclients`
--

CREATE TABLE `whatsayclients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `profesion` varchar(255) NOT NULL,
  `review` text NOT NULL,
  `profile_url` varchar(255) NOT NULL,
  `block` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogcategories`
--
ALTER TABLE `blogcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `practicals`
--
ALTER TABLE `practicals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sems`
--
ALTER TABLE `sems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `syllabuses`
--
ALTER TABLE `syllabuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testcategories`
--
ALTER TABLE `testcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topscores`
--
ALTER TABLE `topscores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whatsayclients`
--
ALTER TABLE `whatsayclients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blogcategories`
--
ALTER TABLE `blogcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `missions`
--
ALTER TABLE `missions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `practicals`
--
ALTER TABLE `practicals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sems`
--
ALTER TABLE `sems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `syllabuses`
--
ALTER TABLE `syllabuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `testcategories`
--
ALTER TABLE `testcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tests`
--
ALTER TABLE `tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topscores`
--
ALTER TABLE `topscores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `whatsayclients`
--
ALTER TABLE `whatsayclients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
