DROP DATABASE IF EXISTS `traitsDB`;
CREATE DATABASE `traitsDB`;

USE `traitsDB`;

CREATE TABLE `traits` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `trait` VARCHAR(35) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `traits_products` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `product_id` INTEGER NULL DEFAULT NULL,
  `trait_id` INTEGER NULL DEFAULT NULL,

  PRIMARY KEY (`id`)
);

CREATE TABLE `products` (
  `product_id` INTEGER NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`product_id`)
);


-- FOREIGN KEYS


ALTER TABLE `traits_products` ADD FOREIGN KEY (trait_id) REFERENCES `traits` (`id`);
ALTER TABLE `traits_products` ADD FOREIGN KEY (product_id) REFERENCES `products` (`product_id`);


/* create database by running the following in terminal (from the repo root directory) :
mysql -u 'root' < database-sql/Schema.sql     --------*/