ALTER TABLE `owned_vehicles` 
ADD COLUMN IF NOT EXISTS `name` varchar(255) DEFAULT NULL;
ALTER TABLE `owned_vehicles` 
ADD COLUMN IF NOT EXISTS `fav` char(1) NOT NULL DEFAULT '0';