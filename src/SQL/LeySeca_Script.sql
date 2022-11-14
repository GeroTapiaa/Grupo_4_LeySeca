CREATE DATABASE  IF NOT EXISTS `db_leyseca` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_leyseca`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: db_leyseca
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `orderId` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Cerveza','2022-11-03 12:18:03',NULL,NULL),(2,'Indumentaria','2022-11-03 12:18:03',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `stateId` int DEFAULT NULL,
  `paymentId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `stateId` (`stateId`),
  KEY `paymentId` (`paymentId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`stateId`) REFERENCES `states` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `sizeId` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `sizeId` (`sizeId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Cerveza Colonia Suiza','Cerveza rubia de gran cuerpo y complejidad en boca enriquecida gracias al carácter especiado y el perfil espirituoso de las bayas de enebro silvestre.','Cerveza-colonia.png',1,NULL,350,NULL,'2022-11-03 12:18:03',NULL,NULL),(2,'COMBO BLONDE: 2 Porrones de nuestras Cervezas Rubias','2 Porrones de Golden Ale + 2 Porrones de Colonia Suiza','Cerveza-combo_colonia-golden.png',1,NULL,999,10,'2022-11-03 12:18:03',NULL,NULL),(3,'COMBO IPA + COLONIA SUIZA','1 Porron de Ipa Patagonica + 1 Porron de Colonia Suiza ','Cerveza-combo_colonia-IPA.png',1,NULL,599,5,'2022-11-03 12:18:03',NULL,NULL),(4,'COMBO OLD ALE + COLONIA SUIZA','1 Porron de Old Ale + 1 Porron de Colonia Suiza ','Cerveza-combo_colonia-old.png',1,NULL,599,15,'2022-11-03 12:18:03',NULL,NULL),(5,'COMBO RAÍCES DE VICTORIA GINGER PALE ALE + COLONIA SUIZA','1 Porron de RAÍCES DE VICTORIA GINGER PALE ALE + 1 Porron de Colonia Suiza ','Cerveza-Combo_colonia-raices.png',1,NULL,599,NULL,'2022-11-03 12:18:03',NULL,NULL),(6,'COMBO COLONIA SUIZA + SUREÑA AMBER ALE','1 PORRON DE COLONIA SUIZA +1 PORRON DE SUREÑA AMBER ALE ','Cerveza-combo_colonia-sureña.png',1,NULL,599,NULL,'2022-11-03 12:18:03',NULL,NULL),(7,'COMBO IPA PATAGONICA + SUREÑA AMBER ALE','1 PORRON DE IPA PATAGONICA + 1 PORRON DE SUREÑA AMBER ALE ','Cerveza-Combo_Ipa-sureña.png',1,NULL,599,NULL,'2022-11-03 12:18:03',NULL,NULL),(8,'COMBO RAÍCES DE VICTORIA GINGER PALE ALE + SUREÑA AMBER ALE','1 Porron de Raíces de Victoria Ginger Pale Ale + 1 Porron de Sureña Amber Ale ','Cerveza-combo_sureña-raices.png',1,NULL,599,NULL,'2022-11-03 12:18:03',NULL,NULL),(9,'CERVEZA IPA PATAGONICA','Predominan las maltas caramelizadas, que le aportan su color rubí. Carácter intenso debido a la cantidad de lúpulo que la compone.','Cerveza-Ipa.png',1,NULL,350,15,'2022-11-03 12:18:03',NULL,NULL),(10,'CERVEZA OLD ALE','Cerveza de color granate. Gran cuerpo y espíritu aportado por un blend de 6 maltas caramelizadas. Su perfil maltoso, alicorado y dulzón con notas de vainilla y un reposo en madurador por 60 días le dan robustez y redondo bouquet. La cerveza mas premiada de la casa.','Cerveza-Old.png',1,NULL,350,NULL,'2022-11-03 12:18:03',NULL,NULL),(11,'CERVEZA RAÍCES DE VICTORIA GINGER PALE ALE','Una Pale Ale estilo americano con lúpulo 100% Victoria cosechado en El Bolsón, que le aporta notas de Maracuyá y Mandarina, con adición de ralladura de Jengibre.','Cerveza-Raices.png',1,NULL,355,NULL,'2022-11-03 12:18:03',NULL,NULL),(12,'CERVEZA SUREÑA AMBER ALE','Una cerveza a base de maltas caramelizadas que le otorgan un profundo pero cristalino tono ámbar con reflejos rojizos que evocan las puestas de sol en las montañas de la Patagonia Argentina.','Cerveza-Sureña.png',1,NULL,330,5,'2022-11-03 12:18:03',NULL,NULL),(13,'COMBITO DÚO: 2 Porrones','Incluye 2 Porrones + 1 IPA PATAGÓNICA +  1 GOLDEN ALE ','Cervezas-combo_golden-Ipa.png',1,NULL,650,NULL,'2022-11-03 12:18:03',NULL,NULL),(14,'COMBITO DÚO: 2 Porrones','Incluye 2 Porrones + 1 GOLDEN ALE + 1 SUREÑA AMBER ALE ','Cervezas-combo_golden-sureña.png',1,NULL,650,NULL,'2022-11-03 12:18:03',NULL,NULL),(15,'COMBITO DÚO: 2 Porrones','Incluye 2 Porrones + 1 IPA PATAGONICA + 1 RAÍCES DE VICTORIA ','Cervezas-combo_Ipa-raices.png',1,NULL,650,NULL,'2022-11-03 12:18:03',NULL,NULL),(16,'COMBITO DÚO: 2 Porrones','Incluye 2 porrones + 1 GOLDEN ALE + 1 RAÍCES DE VICTORIA ','Cervezas-Combo-golden-raices.png',1,NULL,650,NULL,'2022-11-03 12:18:03',NULL,NULL),(17,'COMBO ESPECIAL SALSAS: 8 Porrones + 2 Salsas Berlina','Incluye + 4 Porrones Golden Ale + 4 Porrones IPA +  2 Salsas Berlina ','cervezasx8-salsas.jpg',1,NULL,3599,15,'2022-11-03 12:18:03',NULL,NULL),(18,'SALSAS LEY SECA: 4 KETCHUP IPA','Incluye + 4 Salsas Ketchup IPA de 295 g ','Ketchup-Ipa.jpg',1,NULL,2900,5,'2022-11-03 12:18:03',NULL,NULL),(19,'SALSAS LEY SECA: 4 BBQ STOUT','Incluye + 4 Salsas BBQ Stout de 295 g ','salsas-bbq.jpg',1,NULL,2900,10,'2022-11-03 12:18:03',NULL,NULL),(20,'VICUÑA SACRAMENTO ANDINO 750ml','Esta cerveza ha reposado y madurado a bajas temperaturas `por más de dos años para luego ser envasada a mano, botella por botella. El resultado es una cerveza irrepetible de edición limitada.','vicuna.png',1,NULL,3500,20,'2022-11-03 12:18:03',NULL,NULL),(21,'Gorra de lana gris Ley Seca','Colores disponibles: Verde militar , Negro','gorra-lana-gris.png',2,7,3000,10,'2022-11-03 12:18:03',NULL,NULL),(22,'Remera abducción',' Talle S al XXL ','remera-hombre-alien.png',2,1,2900,5,'2022-11-03 12:18:03',NULL,NULL),(23,'Remera amor por la birra','Talle S al XXL','remera-hombre-electro.png',2,3,2600,15,'2022-11-03 12:18:03',NULL,NULL),(24,'Remera Drinking team','Talle S al XXL','remera-hombre-espalda.png',2,3,2800,NULL,'2022-11-03 12:18:03',NULL,NULL),(25,'Remera Birra eco','Talle S al XXL ','remera-hombre-logo.png',2,3,2600,NULL,'2022-11-03 12:18:03',NULL,NULL),(26,'Remera azul premium','Talle S al XXL','remera-hombre-logo2.png',2,3,3100,NULL,'2022-11-03 12:18:03',NULL,NULL),(27,'Remera negra premium','Talle S al XXL','remera-hombre-logo3.png',2,3,3100,NULL,'2022-11-03 12:18:03',NULL,NULL),(28,'Remera San Patricio','Talle S al XXL','remera-hombre-patricio.png',2,3,3100,NULL,'2022-11-03 12:18:03',NULL,NULL),(29,'Remera gris claro Be Er',' Talle S al XXL','remera-mujer-grisclaro.png',2,3,2700,NULL,'2022-11-03 12:18:03',NULL,NULL),(30,'Remera gris topo Be Er','Talle S al XXL ','remera-mujer-grisoscuro.png',2,3,2700,NULL,'2022-11-03 12:18:03',NULL,NULL),(31,'Remera abducción','Talle S al XXL','remera-mujer-logo-alien.png',2,3,2900,NULL,'2022-11-03 12:18:03',NULL,NULL),(32,'Remera Chop','Talle S al XXL','remera-mujer-logo.png',2,3,2500,NULL,'2022-11-03 12:18:03',NULL,NULL),(33,'Remera Malta','Talle S al XXL','remera-mujer-logo2.png',2,3,2700,NULL,'2022-11-03 12:18:03',NULL,NULL),(34,'Remera Beer','Talle S al XXL','remera-mujer-logo3.png',2,3,2900,NULL,'2022-11-03 12:18:03',NULL,NULL),(35,'Remera This Girl','Talle S al XXL','remera-mujer-lover.png',2,3,2800,NULL,'2022-11-03 12:18:03',NULL,NULL),(36,'Remera Princesa Leia','Talle S al XXL','remera-mujer-princesa.png',2,3,2800,NULL,'2022-11-03 12:18:03',NULL,NULL),(37,'Gorra trucker','Colores disponibles: Rojo , Azul','trucker-gorra.png',2,7,2900,10,'2022-11-03 12:18:03',NULL,NULL),(38,'Vicera Cheers','Colores disponibles: Verde militar , Blanco, gris.','vicera-chers.png',2,7,2100,NULL,'2022-11-03 12:18:03',NULL,NULL),(39,'Vicera Drinking team','Colores disponibles: Verde militar , Blanco, Negro.','vicera-gris-alas.png',2,7,2200,NULL,'2022-11-03 12:18:03',NULL,NULL),(40,'Vicera Gris Ley seca','Colores disponibles: Verde militar , Blanco, Negro.','vicera-gris.png',2,7,2100,5,'2022-11-03 12:18:03',NULL,NULL),(41,'Vicera Beers','Colores disponibles: Rojo , Blanco, gris.','vicera-negra-logo.png',2,7,2000,NULL,'2022-11-03 12:18:03',NULL,NULL),(42,'Vicera negra Ley Seca','Colores disponibles: Rojo , Blanco, gris.','vicera-negra.png',2,7,2000,NULL,'2022-11-03 12:18:03',NULL,NULL),(43,'Vicera vede I love Beer','Colores disponibles: Negro , Blanco, gris.','vicera-verde.png',2,7,2000,5,'2022-11-03 12:18:03',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productstatuses`
--

DROP TABLE IF EXISTS `productstatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productstatuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productstatuses`
--

LOCK TABLES `productstatuses` WRITE;
/*!40000 ALTER TABLE `productstatuses` DISABLE KEYS */;
INSERT INTO `productstatuses` VALUES (1,'off','2022-11-03 12:18:03',NULL,NULL),(2,'Recommended','2022-11-03 12:18:03',NULL,NULL);
/*!40000 ALTER TABLE `productstatuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'admin','2022-11-03 12:18:04',NULL,NULL),(2,'user','2022-11-03 12:18:04',NULL,NULL);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20221026165235-create-Category.js'),('20221026171619-create-size.js'),('20221026172347-create-product-status.js'),('20221026172536-create-product.js'),('20221026182747-create-rol.js'),('20221026183709-create-user.js'),('20221026191210-create-state.js'),('20221026191321-create-payment.js'),('20221026191705-create-order.js'),('20221026191922-create-cart.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'S','2022-11-03 12:18:03',NULL,NULL),(2,'M','2022-11-03 12:18:03',NULL,NULL),(3,'L','2022-11-03 12:18:03',NULL,NULL),(4,'XL','2022-11-03 12:18:03',NULL,NULL),(5,'XXL','2022-11-03 12:18:03',NULL,NULL),(6,'XXXL','2022-11-03 12:18:03',NULL,NULL),(7,'Talle único','2022-11-03 12:18:03',NULL,NULL);
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `state` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `address` text,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `rolId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Florrre','Maldonado','nadia15000','2000-12-31 00:00:00','Calle 165 N 1414                                                                    ','nadiamaldonado3011@gmail.com','$2a$10$W7E8jtE3pyX/W4PgvUKm2OpyN4EwxU8..sdJYlJc/nearZPLaehjG','avatar-1663114126575.jpg',1,'2022-11-03 12:18:04',NULL,NULL),(2,'Nadia Florencia','Maldonado','nadia1501','2000-12-30 00:00:00','Calle 165 N 1818','nadiam@gmail.com','$2a$10$cQH0zb.m7XjnPWiL30qjneoiQ.IxBP2ygOnuxesUvGNTd5gGDWW4W','avatar-1663127704355.jpg',2,'2022-11-03 12:18:04',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_leyseca'
--

--
-- Dumping routines for database 'db_leyseca'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-03  9:20:34
