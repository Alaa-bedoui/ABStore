-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema store
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema store
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `store` DEFAULT CHARACTER SET utf8mb3 ;
USE `store` ;

-- -----------------------------------------------------
-- Table `store`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store`.`admin` (
  `idadmin` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idadmin`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `store`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `token` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 56
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `store`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store`.`item` (
  `iditem` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` INT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `quantity` INT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`iditem`),
  INDEX `fk_item_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_item_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `store`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `store`.`favourites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `store`.`favourites` (
  `idfavourites` INT NOT NULL,
  `users_id` INT NOT NULL,
  `item_iditem` INT NOT NULL,
  PRIMARY KEY (`idfavourites`),
  INDEX `fk_favourites_users_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_favourites_item1_idx` (`item_iditem` ASC) VISIBLE,
  CONSTRAINT `fk_favourites_item1`
    FOREIGN KEY (`item_iditem`)
    REFERENCES `store`.`item` (`iditem`),
  CONSTRAINT `fk_favourites_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `store`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
