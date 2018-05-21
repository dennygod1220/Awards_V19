-- phpMyAdmin SQL Dump
-- version 4.4.15.9
-- https://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生時間： 2018-05-21 02:23:50
-- 伺服器版本: 5.6.37
-- PHP 版本： 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `Adonis_invoice`
--

-- --------------------------------------------------------

--
-- 資料表結構 `tokens`
--

CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `token` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `tokens`
--

INSERT INTO `tokens` (`id`, `user_id`, `token`, `type`, `is_revoked`, `created_at`, `updated_at`) VALUES
(2, 1, '211456e1-4136-438a-9d09-c47c9fad8bb5', 'remember_token', 0, '2018-05-20 15:13:05', '2018-05-20 15:13:05'),
(3, 1, 'f2695fba-7369-4fb5-938c-2c4d393a027e', 'remember_token', 0, '2018-05-20 15:13:55', '2018-05-20 15:13:55'),
(4, 1, 'b062ea55-9a6c-45ac-aab6-77849e416d05', 'remember_token', 0, '2018-05-20 15:14:21', '2018-05-20 15:14:21'),
(22, 2, '4fa48e1a-3584-4478-a998-b112790d0111', 'remember_token', 0, '2018-05-21 10:04:39', '2018-05-21 10:04:39');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tokens_token_unique` (`token`),
  ADD KEY `tokens_user_id_foreign` (`user_id`),
  ADD KEY `tokens_token_index` (`token`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
