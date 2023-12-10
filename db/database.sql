CREATE DATABASE IF NOT EXISTS `node`;

use `node`;

CREATE TABLE IF NOT EXISTS `employee` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) DEFAULT NULL,
    `salary` INT(5) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `employee` (`id`, `name`, `salary`) VALUES
(1, 'John', 1000),
(2, 'David', 2000),
(3, 'Mark', 3000),
(4, 'James', 4000),
(5, 'Paul', 5000);

