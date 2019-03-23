CREATE DATABASE  IF NOT EXISTS `persona_tabletop_compendium` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `persona_tabletop_compendium`;
-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: persona_tabletop_compendium
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `recipe` (
  `result` int(10) unsigned NOT NULL,
  `sources1` int(10) unsigned DEFAULT NULL,
  `sources2` int(10) unsigned DEFAULT NULL,
  `sources3` int(10) unsigned DEFAULT NULL,
  `sources4` int(10) unsigned DEFAULT NULL,
  `sources5` int(10) unsigned DEFAULT NULL,
  `sources6` int(10) unsigned DEFAULT NULL,
  `sources7` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`result`),
  KEY `source1Persona_idx` (`sources1`),
  KEY `source2Persona_idx` (`sources2`),
  KEY `source3Persona_idx` (`sources3`),
  KEY `source4Persona_idx` (`sources4`),
  KEY `source5Persona_idx` (`sources5`),
  KEY `source6Persona_idx` (`sources6`),
  KEY `source7Persona_idx` (`sources7`),
  CONSTRAINT `resultPersona` FOREIGN KEY (`result`) REFERENCES `persona` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `source1Persona` FOREIGN KEY (`sources1`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `source2Persona` FOREIGN KEY (`sources2`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `source3Persona` FOREIGN KEY (`sources3`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `source4Persona` FOREIGN KEY (`sources4`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `source5Persona` FOREIGN KEY (`sources5`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `source6Persona` FOREIGN KEY (`sources6`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `source7Persona` FOREIGN KEY (`sources7`) REFERENCES `persona` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-23 13:31:28
