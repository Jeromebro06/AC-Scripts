CREATE TABLE IF NOT EXISTS `clotheshop_savings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `data` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `identifier` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;