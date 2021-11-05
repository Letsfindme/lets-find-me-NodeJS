
CREATE DATABASE app

USE `app` ;


CREATE TABLE `users` (
  `id` CHAR(36) NOT NULL,
  `firstname` VARCHAR(255),
  `lastname` VARCHAR(255),
  `username` VARCHAR(255),
  `country` VARCHAR(255),
  `password` VARCHAR(255),
  `email` VARCHAR(255),
  `firstConnection` DATETIME,
  `lastConnection` DATETIME,
  `avatar` TINYINT(1),
  `createdDate` DATETIME,
  `birthday` DATETIME,
  `age` INT(11),
  `status` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `posts` (
  `id` CHAR(36),
  `title` VARCHAR(255),
  `starCount` DOUBLE,
  `category` VARCHAR(255),
  `creationDate` DATETIME,
  `imageUrl` VARCHAR(255),
  `content` VARCHAR(255),
  `author` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `userId` CHAR(36),
  PRIMARY KEY (`id`),
  CONSTRAINT `Fk_posts`
    FOREIGN KEY (`userId`)
    REFERENCES `letsfind`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `Images` (
  `id` CHAR(36),
  `imageRef` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `postId` CHAR(36),
  PRIMARY KEY (`id`),
  INDEX `postId` (`postId` ASC) VISIBLE,
  CONSTRAINT `Fk_images`
    FOREIGN KEY (`postId`)
    REFERENCES `posts` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);


CREATE TABLE `addresses` (
  `id` CHAR(36),
  `street` VARCHAR(255),
  `city` VARCHAR(255),
  `country` VARCHAR(255),
  `postcode` INT(11),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `userId` CHAR(36),
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `Fk_addresses`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE);


CREATE TABLE `carts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `userId` CHAR(36),
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `carts_fk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255),
  `price` DOUBLE NOT NULL,
  `imageUrl` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `cartItems` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantity` INT(11),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `cartId` INT(11),
  `productId` INT(11),
  PRIMARY KEY (`id`),
  CONSTRAINT `cartitems_fk_1`
    FOREIGN KEY (`cartId`)
    REFERENCES `carts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `cartitems_fk_2`
    FOREIGN KEY (`productId`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `userId` CHAR(36),
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `orders_fk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


CREATE TABLE `orderItems` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantity` INT(11),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `orderId` INT(11),
  `productId` INT(11),
  PRIMARY KEY (`id`),
  CONSTRAINT `orderitems_ibfk_1`
    FOREIGN KEY (`orderId`)
    REFERENCES `orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `orderitems_fk_2`
    FOREIGN KEY (`productId`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);



CREATE TABLE `postContents` (
  `id` CHAR(36),
  `title` VARCHAR(255),
  `text` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `postRates` (
  `id` CHAR(36),
  `rate` INT(11),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `postId` CHAR(36),
  `userId` CHAR(36),
  PRIMARY KEY (`id`),
  CONSTRAINT `postrates_fk_1`
    FOREIGN KEY (`postId`)
    REFERENCES `posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `postrates_fk_2`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
