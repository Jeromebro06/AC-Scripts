CREATE TABLE IF NOT EXISTS `player_moneywash_processes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(60) NOT NULL,
  `amount` int(11) NOT NULL,
  `clean_amount` int(11) NOT NULL,
  `fee_amount` int(11) NOT NULL,
  `fee_percentage` int(11) NOT NULL,
  `needed_time` int(11) NOT NULL,
  `processed_time` int(11) NOT NULL DEFAULT 0,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `identifier` (`identifier`),
  KEY `completed` (`completed`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;