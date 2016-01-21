SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
--
-- Database: `live-forum`
--
CREATE DATABASE IF NOT EXISTS `live-forum` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `live-forum`;
-- --------------------------------------------------------
--
-- Erase table `comment`
--
DROP TABLE IF EXISTS `comment`;
-- --------------------------------------------------------
--
-- Erase table `topic`
--
DROP TABLE IF EXISTS `topic`;