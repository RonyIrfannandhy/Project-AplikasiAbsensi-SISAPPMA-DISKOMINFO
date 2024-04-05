-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2024 at 06:17 AM
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
-- Database: `presensi_magang_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refreshTokens` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `nama`, `username`, `password`, `refreshTokens`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin1', 'Admin1', '$2a$12$EzfSRYTdVR9DroSUClbuXeoF0WuxshMhHxHw65.mmQVq8P/TPE7L.', NULL, '2023-10-27 01:25:13', '2023-10-27 01:25:13'),
(29, 'Atmin', 'atmin123', '$2a$10$/g2.YeBxfWMRuEvvr2.5LewevNRlYqaQxjG.PUvhpA2gMpb.im9pq', NULL, '2024-01-16 03:28:56', '2024-02-05 02:49:29'),
(30, 'Adminferdy', 'adminferdy', '$2a$10$ak82/Txv5ccgezlJc.hjUuuBru.WC5A/FTifP0jp9n3SNoTuZ/euK', NULL, '2024-02-06 09:06:29', '2024-02-06 09:06:29'),
(31, 'Admin3', 'admin3', '$2a$10$a6uBkSQOzbcZpJUEe5V7eOpBvWX.WhplnaL0GZgAmbzJTuwKU9caW', NULL, '2024-02-07 07:03:36', '2024-02-07 07:04:38');

-- --------------------------------------------------------

--
-- Table structure for table `peserta_magangs`
--

CREATE TABLE `peserta_magangs` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `asal_univ` varchar(255) DEFAULT NULL,
  `asal_jurusan` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) NOT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refreshTokens` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status_aktif` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peserta_magangs`
--

INSERT INTO `peserta_magangs` (`id`, `nama`, `asal_univ`, `asal_jurusan`, `no_telp`, `tanggal_mulai`, `tanggal_selesai`, `username`, `password`, `refreshTokens`, `createdAt`, `updatedAt`, `status_aktif`) VALUES
(8, 'ferdy', 'UNDIP', 'Komputer', '08988812345', '2024-02-24', '2024-03-29', 'ferdy', '$2a$10$6NxeylqfmH/AHuPH.lKHreHRavqwCa/zUJ8bnD9dZu8UjdRAiMZW6', NULL, '2023-10-27 10:21:55', '2024-02-07 07:06:53', 3),
(12, 'Abdul Jawar', 'UNDIP', 'Komputer', '', '2023-10-01', '2023-11-02', 'adi', '$2a$12$kFl03BlpfBEyIC7NxSBmreWq4tVtGuY0ZC0lcVtjNkhnJZyUsBseq', NULL, '2023-10-27 19:37:53', '2024-02-05 03:13:10', 1),
(99, 'Lil Tay', 'Tay', 'Taykom', '', '2024-02-05', '2024-02-09', 'taytay', '$2a$12$pWAHIJp7A9H.2J8bfR7jjerFbIowyYpL72J4DsGUqqAeRetS6gvAu', NULL, '2024-02-05 04:55:54', '2024-02-12 04:17:58', 1),
(145, 'Liam White', 'Stanford', 'Biologi', '', '2025-01-13', '2025-01-18', 'liam_176', '734', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3),
(146, 'Mia Clark', 'Harvard', 'Ilmu Komputer', '', '2025-01-18', '2025-01-23', 'mia_177', '294', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3),
(148, 'Olivia Adams', 'Yale', 'Psikologi', '', '2025-01-28', '2025-02-02', 'olivia_179', '531', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3),
(149, 'Patrick Davis', 'Princeton', 'Ilmu Politik', '', '2025-02-02', '2025-02-07', 'patrick_180', '971', NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3),
(155, 'Abdul Jawar 1111', 'UNDIP', 'Komputer', '', '2023-11-15', '2023-12-09', 'mb1233333', '$2a$10$j.R/xdmYkV/tkyBav71PZ.JUbFLG7iT9KTMnc8OUFOMmb7zyzeWWu', NULL, '2023-11-03 16:27:51', '2024-02-05 03:13:10', 1),
(157, 'Abdul Jawar 999', 'UNDIP', 'Komputer', '', '2023-11-04', '2023-11-05', 'mbstar12345', '$2a$10$UxyTS5psFvuFNBB/hJB9ae.L88vZhUef5D1AzEx6pkAZxxZrcmSwm', NULL, '2023-11-04 23:45:10', '2024-02-05 03:13:10', 1),
(158, 'Abdul Jawar 1111111', 'UNDIP', 'Komputer', '', '2023-11-01', '2023-11-07', 'mbstar123456789', '$2a$10$z00HUYBQFz0O3Qzv3XfkkutbuenZXUY10AQyngeivZxTsWzIehMBe', NULL, '2023-11-04 23:46:50', '2024-02-05 03:13:10', 1),
(170, 'Ferdy1', 'univ1', 'tekom', '', '2024-02-08', '2024-03-14', 'ferdy1', '$2a$10$NUPLbF541TQQk4JsnH8buezdkbR0ns2GZR4Z8ujDs7.kT6ZcoUoiW', NULL, '2024-02-07 08:06:55', '2024-02-07 08:06:55', 2),
(171, 'Ferdy2', 'univ2', 'tekom', '', '2024-02-12', '2024-03-18', 'ferdy2', '$2a$10$hDqOPYFLPbhWpfjpqfEWoOENUqLbnh4DESNJyiQkK4U8p/b5CFwWu', NULL, '2024-02-12 04:53:17', '2024-02-12 04:53:17', 2),
(172, 'Ferdy3', 'univ3', 'tekom', '', '2024-02-12', '2024-03-18', 'ferdy3', '$2a$10$bHWfSzqy31u9ndwHM.0uheuHTx06X7wLDsTAopkS.LzKDfeLR7JqW', NULL, '2024-02-12 06:19:17', '2024-02-12 06:19:17', 2),
(173, 'ferdy4', 'univ4', 'tekom', '', '2024-02-13', '2024-03-19', 'ferdy4', '$2a$10$mrbZyp3luW.CC0zlQG94nOQFxXmwPFzQwOnR/vwDrezfGjIdq1SD2', NULL, '2024-02-12 06:26:16', '2024-02-12 06:26:16', 2),
(174, 'Ferdy5', 'univ5', 'tekom', '', '2024-02-14', '2024-03-19', 'ferdy5', '$2a$10$swucF8JWQiTpniVqw0TJRO4ancURUfxsmDZVpThEkLxUyQGWFn1Ta', NULL, '2024-02-13 00:51:26', '2024-02-13 00:51:26', 3),
(175, 'adikun', 'undip', 'tekkom', '08999533123', '2024-02-23', '2024-04-06', 'adikun', '$2a$10$tEC.uKYKKfmO2G7ZHF6oZ.StuAl3FkZfDKRwFD60OFXwh5bQPSQ1m', NULL, '2024-02-23 05:38:05', '2024-02-23 05:38:05', 2);

--
-- Triggers `peserta_magangs`
--
DELIMITER $$
CREATE TRIGGER `update_status_aktif` BEFORE INSERT ON `peserta_magangs` FOR EACH ROW BEGIN
    SET NEW.status_aktif = 
        CASE
            WHEN NEW.tanggal_selesai < CURDATE() THEN 1
            WHEN CURDATE() BETWEEN NEW.tanggal_mulai AND NEW.tanggal_selesai THEN 2
            WHEN NEW.tanggal_mulai > CURDATE() THEN 3
        END;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `presensis`
--

CREATE TABLE `presensis` (
  `id` int(11) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `image_url_in` varchar(255) DEFAULT NULL,
  `image_url_out` varchar(255) DEFAULT NULL,
  `p_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `presensis`
--

INSERT INTO `presensis` (`id`, `tanggal`, `check_in`, `check_out`, `image_url_in`, `image_url_out`, `p_id`, `createdAt`, `updatedAt`) VALUES
(89, '2023-10-27', '2023-10-30 08:00:00', NULL, 'http://localhost:3000/uploads/1696123852384.JPG', NULL, 8, '2023-10-27 10:21:55', '2023-10-27 10:21:55'),
(90, '2023-10-30', '2023-10-30 00:59:59', NULL, 'http://localhost:3000/uploads/1698636344085.jpeg', NULL, 8, '2023-10-27 10:21:55', '2023-10-30 03:25:44'),
(91, '2023-10-31', NULL, NULL, NULL, NULL, 8, '2023-10-27 10:21:55', '2023-10-27 10:21:55'),
(112, '2023-10-02', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(113, '2023-10-03', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(114, '2023-10-04', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(115, '2023-10-05', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(116, '2023-10-06', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(117, '2023-10-09', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(118, '2023-10-10', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(119, '2023-10-11', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(120, '2023-10-12', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(121, '2023-10-13', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(122, '2023-10-16', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(123, '2023-10-17', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(124, '2023-10-18', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(125, '2023-10-19', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(126, '2023-10-20', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(127, '2023-10-23', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(128, '2023-10-24', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(129, '2023-10-25', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(130, '2023-10-26', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(131, '2023-10-27', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(132, '2023-10-30', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(133, '2023-10-31', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(134, '2023-11-01', NULL, NULL, NULL, NULL, 12, '2023-10-27 19:37:53', '2023-10-27 19:37:53'),
(143, '2023-11-15', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(144, '2023-11-16', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(145, '2023-11-17', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(146, '2023-11-20', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(147, '2023-11-21', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(148, '2023-11-22', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(149, '2023-11-23', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(150, '2023-11-24', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(151, '2023-11-27', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(152, '2023-11-28', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(153, '2023-11-29', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(154, '2023-11-30', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(155, '2023-12-01', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(156, '2023-12-04', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(157, '2023-12-05', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(158, '2023-12-06', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(159, '2023-12-07', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(160, '2023-12-08', NULL, NULL, NULL, NULL, 155, '2023-11-03 16:27:51', '2023-11-03 16:27:51'),
(177, '2023-11-01', NULL, NULL, NULL, NULL, 158, '2023-11-04 23:46:50', '2023-11-04 23:46:50'),
(178, '2023-11-02', NULL, NULL, NULL, NULL, 158, '2023-11-04 23:46:50', '2023-11-04 23:46:50'),
(179, '2023-11-03', NULL, NULL, NULL, NULL, 158, '2023-11-04 23:46:50', '2023-11-04 23:46:50'),
(180, '2023-11-01', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(181, '2023-11-02', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(182, '2023-11-03', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(183, '2023-11-06', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(184, '2023-11-07', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(185, '2023-11-08', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(186, '2023-11-09', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(187, '2023-11-10', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(188, '2023-11-13', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(189, '2023-11-14', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(190, '2023-11-15', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(191, '2023-11-16', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(192, '2023-11-17', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(193, '2023-11-20', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(194, '2023-11-21', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(195, '2023-11-22', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(196, '2023-11-23', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(197, '2023-11-24', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(198, '2023-11-27', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(199, '2023-11-28', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(200, '2023-11-29', NULL, NULL, NULL, NULL, 8, '2023-11-09 17:02:01', '2023-11-09 17:02:01'),
(221, '2023-11-06', NULL, NULL, NULL, NULL, 158, '2023-11-09 18:07:35', '2023-11-09 18:07:35'),
(222, '2023-11-07', NULL, NULL, NULL, NULL, 158, '2023-11-09 18:07:35', '2023-11-09 18:07:35'),
(282, '2024-02-26', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(283, '2024-02-27', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(284, '2024-02-28', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(285, '2024-02-29', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(286, '2024-03-01', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(287, '2024-03-04', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(288, '2024-03-05', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(289, '2024-03-06', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(290, '2024-03-07', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(291, '2024-03-08', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(292, '2024-03-11', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(293, '2024-03-12', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(294, '2024-03-13', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(295, '2024-03-14', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(296, '2024-03-15', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(297, '2024-03-18', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(298, '2024-03-19', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(299, '2024-03-20', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(300, '2024-03-21', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(301, '2024-03-22', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(302, '2024-03-25', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(303, '2024-03-26', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(304, '2024-03-27', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(305, '2024-03-28', NULL, NULL, NULL, NULL, 8, '2024-02-07 07:06:53', '2024-02-07 07:06:53'),
(355, '2024-02-08', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(356, '2024-02-09', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(357, '2024-02-12', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(358, '2024-02-13', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(359, '2024-02-14', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(360, '2024-02-15', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(361, '2024-02-16', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(362, '2024-02-19', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(363, '2024-02-20', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(364, '2024-02-21', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(365, '2024-02-22', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(366, '2024-02-23', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(367, '2024-02-26', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(368, '2024-02-27', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(369, '2024-02-28', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(370, '2024-02-29', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(371, '2024-03-01', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(372, '2024-03-04', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(373, '2024-03-05', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(374, '2024-03-06', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(375, '2024-03-07', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(376, '2024-03-08', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(377, '2024-03-11', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(378, '2024-03-12', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(379, '2024-03-13', NULL, NULL, NULL, NULL, 170, '2024-02-07 08:06:55', '2024-02-07 08:06:55'),
(380, '2024-02-12', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(381, '2024-02-13', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(382, '2024-02-14', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(383, '2024-02-15', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(384, '2024-02-16', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(385, '2024-02-19', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(386, '2024-02-20', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(387, '2024-02-21', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(388, '2024-02-22', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(389, '2024-02-23', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(390, '2024-02-26', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(391, '2024-02-27', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(392, '2024-02-28', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(393, '2024-02-29', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(394, '2024-03-01', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(395, '2024-03-04', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(396, '2024-03-05', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(397, '2024-03-06', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(398, '2024-03-07', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(399, '2024-03-08', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(400, '2024-03-11', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(401, '2024-03-12', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(402, '2024-03-13', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(403, '2024-03-14', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(404, '2024-03-15', NULL, NULL, NULL, NULL, 171, '2024-02-12 04:53:17', '2024-02-12 04:53:17'),
(405, '2024-02-12', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(406, '2024-02-13', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(407, '2024-02-14', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(408, '2024-02-15', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(409, '2024-02-16', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(410, '2024-02-19', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(411, '2024-02-20', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(412, '2024-02-21', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(413, '2024-02-22', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(414, '2024-02-23', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(415, '2024-02-26', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(416, '2024-02-27', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(417, '2024-02-28', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(418, '2024-02-29', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(419, '2024-03-01', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(420, '2024-03-04', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(421, '2024-03-05', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(422, '2024-03-06', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(423, '2024-03-07', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(424, '2024-03-08', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(425, '2024-03-11', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(426, '2024-03-12', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(427, '2024-03-13', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(428, '2024-03-14', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(429, '2024-03-15', NULL, NULL, NULL, NULL, 172, '2024-02-12 06:19:17', '2024-02-12 06:19:17'),
(430, '2024-02-13', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(431, '2024-02-14', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(432, '2024-02-15', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(433, '2024-02-16', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(434, '2024-02-19', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(435, '2024-02-20', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(436, '2024-02-21', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(437, '2024-02-22', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(438, '2024-02-23', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(439, '2024-02-26', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(440, '2024-02-27', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(441, '2024-02-28', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(442, '2024-02-29', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(443, '2024-03-01', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(444, '2024-03-04', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(445, '2024-03-05', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(446, '2024-03-06', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(447, '2024-03-07', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(448, '2024-03-08', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(449, '2024-03-11', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(450, '2024-03-12', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(451, '2024-03-13', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(452, '2024-03-14', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(453, '2024-03-15', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(454, '2024-03-18', NULL, NULL, NULL, NULL, 173, '2024-02-12 06:26:16', '2024-02-12 06:26:16'),
(455, '2024-02-14', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(456, '2024-02-15', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(457, '2024-02-16', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(458, '2024-02-19', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(459, '2024-02-20', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(460, '2024-02-21', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(461, '2024-02-22', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(462, '2024-02-23', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(463, '2024-02-26', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(464, '2024-02-27', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(465, '2024-02-28', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(466, '2024-02-29', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(467, '2024-03-01', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(468, '2024-03-04', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(469, '2024-03-05', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(470, '2024-03-06', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(471, '2024-03-07', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(472, '2024-03-08', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(473, '2024-03-11', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(474, '2024-03-12', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(475, '2024-03-13', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(476, '2024-03-14', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(477, '2024-03-15', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(478, '2024-03-18', NULL, NULL, NULL, NULL, 174, '2024-02-13 00:51:26', '2024-02-13 00:51:26'),
(479, '2024-02-23', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(480, '2024-02-26', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(481, '2024-02-27', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(482, '2024-02-28', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(483, '2024-02-29', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(484, '2024-03-01', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(485, '2024-03-04', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(486, '2024-03-05', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(487, '2024-03-06', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(488, '2024-03-07', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(489, '2024-03-08', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(490, '2024-03-11', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(491, '2024-03-12', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(492, '2024-03-13', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(493, '2024-03-14', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(494, '2024-03-15', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(495, '2024-03-18', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(496, '2024-03-19', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(497, '2024-03-20', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(498, '2024-03-21', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(499, '2024-03-22', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(500, '2024-03-25', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(501, '2024-03-26', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(502, '2024-03-27', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(503, '2024-03-28', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(504, '2024-03-29', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(505, '2024-04-01', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(506, '2024-04-02', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(507, '2024-04-03', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(508, '2024-04-04', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05'),
(509, '2024-04-05', NULL, NULL, NULL, NULL, 175, '2024-02-23 05:38:05', '2024-02-23 05:38:05');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Alumni'),
(2, 'Aktif'),
(3, 'Calon');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230917090945-create-peserta-magang.js'),
('20230917091615-create-admin.js'),
('20230917091836-create-presensi.js'),
('20230917092231-create-tugas.js'),
('20230917093126-create-status-tugas.js');

-- --------------------------------------------------------

--
-- Table structure for table `status_tugas`
--

CREATE TABLE `status_tugas` (
  `id` int(11) NOT NULL,
  `p_id` int(11) DEFAULT NULL,
  `t_id` int(11) DEFAULT NULL,
  `tugas_url` varchar(255) DEFAULT NULL,
  `keterangan` tinyint(1) DEFAULT NULL,
  `status_pengerjaan` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_tugas`
--

INSERT INTO `status_tugas` (`id`, `p_id`, `t_id`, `tugas_url`, `keterangan`, `status_pengerjaan`, `createdAt`, `updatedAt`) VALUES
(1, 8, 1, 'http://localhost:3000/uploads/1696123852384.JPG', NULL, 1, '2023-10-28 10:44:22', '2023-10-28 10:44:22'),
(3, 12, 1, NULL, NULL, 0, '2023-10-28 10:44:22', '2023-10-28 10:44:22'),
(4, 8, 2, 'http://localhost:3000/uploads/1696123852384.JPG', NULL, 1, '2023-10-28 10:45:09', '2023-10-28 10:45:09'),
(6, 12, 2, NULL, NULL, 0, '2023-10-28 10:45:09', '2023-10-28 10:45:09'),
(7, 8, 3, NULL, NULL, 0, '2023-10-28 10:45:38', '2023-10-28 10:45:38'),
(9, 12, 3, NULL, NULL, 0, '2023-10-28 10:45:38', '2023-10-28 10:45:38'),
(10, 8, 4, 'http://localhost:3000/uploads/1707205111490.png', 0, 1, '2023-10-28 12:28:09', '2024-02-06 07:38:31'),
(12, 12, 4, NULL, NULL, 0, '2023-10-28 12:28:09', '2023-10-28 12:28:09'),
(13, 8, 5, NULL, NULL, 0, '2023-10-29 03:16:51', '2023-10-29 03:16:51'),
(15, 12, 5, NULL, NULL, 0, '2023-10-29 03:16:51', '2023-10-29 03:16:51'),
(16, 8, 6, NULL, NULL, 0, '2023-10-29 03:17:31', '2023-10-29 03:17:31'),
(18, 12, 6, NULL, NULL, 0, '2023-10-29 03:17:31', '2023-10-29 03:17:31'),
(19, 8, 7, NULL, NULL, 0, '2023-10-29 03:17:35', '2023-10-29 03:17:35'),
(21, 12, 7, NULL, NULL, 0, '2023-10-29 03:17:35', '2023-10-29 03:17:35'),
(25, 8, 9, NULL, NULL, 0, '2023-10-29 03:23:23', '2023-10-29 03:23:23'),
(27, 12, 9, NULL, NULL, 0, '2023-10-29 03:23:23', '2023-10-29 03:23:23'),
(30, 145, 10, NULL, NULL, 0, '2023-11-10 01:21:23', '2023-11-10 01:21:23'),
(31, 146, 10, NULL, NULL, 0, '2023-11-10 01:21:23', '2023-11-10 01:21:23'),
(32, 148, 10, NULL, NULL, 0, '2023-11-10 01:21:23', '2023-11-10 01:21:23'),
(33, 149, 10, NULL, NULL, 0, '2023-11-10 01:21:23', '2023-11-10 01:21:23'),
(34, 155, 10, NULL, NULL, 0, '2023-11-10 01:21:23', '2023-11-10 01:21:23');

-- --------------------------------------------------------

--
-- Table structure for table `tugas`
--

CREATE TABLE `tugas` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `tugas_url` varchar(255) DEFAULT NULL,
  `dueDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tugas`
--

INSERT INTO `tugas` (`id`, `judul`, `tugas_url`, `dueDate`, `createdAt`, `updatedAt`) VALUES
(1, 'Survei', 'www.kucingpoi.com isi survei dilink berikut', '0000-00-00 00:00:00', '2023-10-28 10:44:22', '2023-10-28 10:44:22'),
(2, 'Survei', 'www.kucingpoi.com isi survei dilink berikut', '0000-00-00 00:00:00', '2023-10-28 10:45:09', '2023-10-28 10:45:09'),
(3, 'Survei', 'www.kucingpoi.com isi survei dilink berikut', '2023-10-30 23:59:59', '2023-10-28 10:45:38', '2023-10-28 10:45:38'),
(4, 'Coba edit - Ferdy', 'Coba fitur edit tugas tugas di admin dan deadline di user', '2024-02-06 07:35:00', '2023-10-28 12:28:09', '2024-02-06 07:32:36'),
(5, 'Abdul Jawar', 'www', '2024-02-29 16:59:00', '2023-10-29 03:16:51', '2024-02-23 07:04:48'),
(6, 'Abdul Jawar', 'www', '2023-10-30 23:59:00', '2023-10-29 03:17:31', '2023-10-29 03:17:31'),
(7, 'Abdul Jawar', 'www', '2023-10-30 23:59:00', '2023-10-29 03:17:35', '2023-10-29 03:17:35'),
(9, 'Abdul', 'www', '2023-10-31 16:59:00', '2023-10-29 03:23:23', '2023-10-29 03:23:23'),
(10, 'Abdu', 'www', '2023-11-30 09:00:00', '2023-11-10 01:21:23', '2024-02-06 01:42:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `peserta_magangs`
--
ALTER TABLE `peserta_magangs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_status_aktif` (`status_aktif`);

--
-- Indexes for table `presensis`
--
ALTER TABLE `presensis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `status_tugas`
--
ALTER TABLE `status_tugas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `p_id` (`p_id`),
  ADD KEY `t_id` (`t_id`);

--
-- Indexes for table `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `peserta_magangs`
--
ALTER TABLE `peserta_magangs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- AUTO_INCREMENT for table `presensis`
--
ALTER TABLE `presensis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=510;

--
-- AUTO_INCREMENT for table `status_tugas`
--
ALTER TABLE `status_tugas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `peserta_magangs`
--
ALTER TABLE `peserta_magangs`
  ADD CONSTRAINT `fk_status_aktif` FOREIGN KEY (`status_aktif`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `presensis`
--
ALTER TABLE `presensis`
  ADD CONSTRAINT `presensis_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `peserta_magangs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `status_tugas`
--
ALTER TABLE `status_tugas`
  ADD CONSTRAINT `status_tugas_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `peserta_magangs` (`id`),
  ADD CONSTRAINT `status_tugas_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `tugas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
