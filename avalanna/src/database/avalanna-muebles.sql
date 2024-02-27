-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: avalanna-muebles
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(50) NOT NULL,
  `province` varchar(100) NOT NULL,
  `number` int NOT NULL,
  `streetName` varchar(200) NOT NULL,
  `postalCode` int NOT NULL,
  `locality` varchar(200) NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'Argentina','Buenos Aires',654,'9 De Julio',3214,'Lanus',1,'2024-02-27 04:12:55','2024-02-27 04:12:55'),(2,'Argentina','Buenos Aires',425,'Corrientes',1824,'Lomas de Zamora',2,'2024-02-27 04:12:55','2024-02-27 04:12:55'),(3,'Argentina','Buenos Aires',856,'Ituzaingo',1245,'Lanus',3,'2024-02-27 04:12:55','2024-02-27 04:12:55'),(4,'Argentina','Buenos Aires',987,'Irigoyen',1822,'Lanus',4,'2024-02-27 04:12:55','2024-02-27 04:12:55'),(5,'Argentina','Buenos Aires',457,'Eva Perón',3214,'Avellaneda',5,'2024-02-27 04:12:55','2024-02-27 04:12:55'),(6,'Argentina','Buenos Aires',532,'Calchaqui',4532,'Florencio Varela',6,'2024-02-27 04:12:55','2024-02-27 04:12:55');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'LIVING','2024-02-27 04:12:54','2024-02-27 04:12:54'),(2,'COCINA','2024-02-27 04:12:54','2024-02-27 04:12:54'),(3,'DORMITORIO','2024-02-27 04:12:54','2024-02-27 04:12:54'),(4,'EXTERIOR','2024-02-27 04:12:54','2024-02-27 04:12:54'),(5,'COMBOS','2024-02-27 04:12:54','2024-02-27 04:12:54'),(6,'NEW IN','2024-02-27 04:12:54','2024-02-27 04:12:54');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(250) NOT NULL,
  `extraDescription` varchar(200) NOT NULL,
  `categoryId` int NOT NULL,
  `discount` int NOT NULL,
  `height` varchar(45) NOT NULL,
  `width` varchar(45) NOT NULL,
  `depth` varchar(45) NOT NULL,
  `image` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Sillon de 3 cuerpos',560000,'Armados con madera maciza, cepillada y estacionada. No madera verde, ni madera de palets. Con terminaciones de primer nivel, con sus esquinas encoladas y bien escuadradas.','Patas:forma piramidal recta macizas en madera de paraiso',1,40,'82cm','220cm','170cm','sillon3cuerpos.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(2,'Ropero Nórdico',680000,'Ropero de madera nórdica, elegante y funcional que puede agregar un toque de estilo a cualquier habitación. Madera de origen sostenible y se selecciona cuidadosamente para garantizar la mejor calidad posible.','Los cajones en su interior cuentan con guias metalicas.',3,10,'230cm','220cm','80cm','roperoNordico.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(3,'Mesa baja',150000,'Hecha de madera de alta calidad y cuenta con un acabado blanco suave que le da un aspecto elegante y sofisticado. La mesa es baja y espaciosa, lo que la hace ideal para colocar en el centro de una sala de estar.','',1,16,'50cm','100cm','','mesaParaTe.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(4,'Rack de TV',110000,'Rack de TV de estilo escandinavo y elegante. De líneas simples, es una declaración al estilo limpio y contemporáneo que celebra la belleza de la madera moderna y minimalista.','Cuenta con 8 patas de madera maciza.',1,10,'50cm','150cm','60cm','rackDeTV.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(5,'Sillon esquinero',125800,'Esquinero de 3 cuerpos,una joya de diseño y comodidad. Fabricado con madera reforzada de alta calidad, garantiza durabilidad y resistencia para perdurar en tu hogar por años. ','Tela antimanchas, chenille antidesgarro',1,5,'210cm','160cm','50cm','sillonRosa.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(6,'Sillon esquinero',124800,'Esquinero de 3 cuerpos, este esquinero no solo ofrece confort, sino también estilo y funcionalidad para complementar tu hogar con un toque de elegancia y sofisticación.','Lino antidesgarro',1,6,'210cm','160cm','50cm','sillonVerdeEsquinero.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(7,'Mesita de luz',68000,'Esta mesita de luz blanca de melamina es un complemento encantador para cualquier dormitorio. Ofrece un espacio práctico para guardar tus objetos personales de manera organizada y accesible','Hecho con melamina de 18mm',3,8,'33cm','44cm','54cm','mesitaDeLuz-1.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(8,'Sillon de 4 cuerpos',657000,'Con camastros incorporados, este esquinero no solo ofrece asientos amplios y cómodos para disfrutar en familia o con amigos, sino que también brinda la opción de convertirse en espacios adicionales para el descanso.','Con tela antidesgarro',1,10,'240cm','160cm','100cm','sillonNegro.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(9,'Respaldo de ecocuero',67000,'Una elección elegante y versátil para tu cama. Este tipo de respaldo ofrece un toque atemporal a tu habitación, complementando una variedad de estilos de decoración.','Material: ecocuero',3,10,'120cm','160cm','20cm','respaldoGris1.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(10,'Ropero con corredera',407000,'Una pieza funcional y estilizada para tu espacio de almacenamiento. Este tipo de ropero ofrece una solución práctica para organizar y guardar tu ropa y accesorios.','Cuenta con frentes laminados',3,10,'200cm','150cm','35cm','placard2.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(11,'Mesa ratona',407000,'Este diseño combina la sofisticación del vidrio con la pureza y luminosidad del blanco, creando un elemento distintivo en tu espacio.','Su vidrio superior es bicelado mientras que su vidrio inferior es emerilado.',1,10,'60cm','100cm','2cm','mesaRatona2.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(12,'Silla de PVC',77000,'Estas sillas están pensadas para resistir las condiciones externas, ofreciendo comodidad y durabilidad. Pueden soportar la exposición al sol, la lluvia y otros elementos sin deteriorarse','Su diseño abierto y aireado permite una ventilación adecuada',4,15,'100cm','60cm','60cm','sillaExterior.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(13,'Organizador',187000,'La melamina blanca no solo brinda un aspecto limpio y moderno, sino que también es fácil de limpiar, lo que hace que este organizador sea una opción higiénica y de bajo mantenimiento para el entorno de la cocina.','Cuenta con 4 estantes en su interior',2,25,'150cm','40cm','30cm','despenseroCocina.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(14,'Alacenas',110000,'Esta alacena blanca de melamina cuenta con puertas de vidrio que le otorgan un toque de sofisticación. Su diseño permite exhibir vajilla o artículos de cocina mientras se mantienen protegidos del polvo.','Cuenta con tecnología a prueba de infantes',2,15,'60cm','100cm','35cm','alacenas.png','2024-02-27 04:12:56','2024-02-27 04:12:56'),(15,'Desayunador',377000,'Este desayunador es una opción práctica y funcional para espacios pequeños. Está diseñado para proporcionar un lugar cómodo para disfrutar de las comidas diarias en un entorno acogedor.','Recubierto en melamina de excelente calidad',2,30,'110cm','130cm','50cm','desayunador.png','2024-02-27 04:12:56','2024-02-27 04:12:56');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `total` int NOT NULL,
  `paymentMethod` varchar(255) DEFAULT NULL,
  `purchaseDate` datetime NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `productId` (`productId`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,1,4,110000,'tarjeta de crédito','2022-12-18 14:22:36',1,'2024-02-27 04:12:56','2024-02-27 04:12:56'),(2,2,7,136000,'mercado pago','2022-11-06 15:00:06',2,'2024-02-27 04:12:56','2024-02-27 04:12:56'),(3,3,7,204000,'efectivo','2022-09-17 18:35:00',3,'2024-02-27 04:12:56','2024-02-27 04:12:56');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'User','2024-02-27 04:12:52','2024-02-27 04:12:52'),(2,'Admin','2024-02-27 04:12:52','2024-02-27 04:12:52');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20240224222756-create-rol.js'),('20240224224747-create-category.js'),('20240224233612-create-user.js'),('20240224235637-create-address.js'),('20240225000247-create-product.js'),('20240225002139-create-purchases.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameAndSurname` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phoneNumber` int NOT NULL,
  `password` varchar(100) NOT NULL,
  `rolId` int NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Martin Baryuk','martin_baryuk@outlook.com',1161232375,'$2a$10$NT29ZdHA5HTFZsvJ0eryT.H1m9TXbQsHgdb2PYigasNmwzPKpuLeC',1,NULL,'martin.png','2024-02-27 04:12:54','2024-02-27 04:12:54'),(2,'Melany Strack','melany.strack@gmail.com',1132884470,'$2a$10$rAFwiD1llyT4dbhxoBE3HeqtCgeH52FC/4US2K2FHCqRNaipCzwZi',1,NULL,'melany.png','2024-02-27 04:12:54','2024-02-27 04:12:54'),(3,'Luana Ampuero','ampueroluana@gmail.com',1122510314,'$2a$10$gzbNUk/3STdf00LxVxJjYeoXZM1z97IhERCkbZdioUs2ex6OTvxIG',2,NULL,'luana.png','2024-02-27 04:12:54','2024-02-27 04:12:54'),(4,'Flavia Fernández','milhouse.mb@gmail.com',1125002595,'$2a$10$zYP5RT8pAGa.SxO7LnbsIulLeCboiE5ELiAULzh1hfesKjvIKz/0y',2,NULL,'flavia.png','2024-02-27 04:12:54','2024-02-27 04:12:54'),(5,'pancho doto','pancho@outlook.com',1234567894,'$2a$10$XNryi3beFAIBRHzmeiOeluGys/jVtFhpLNultlATSo/rdVmDSlHGu',1,NULL,'pancho.png','2024-02-27 04:12:55','2024-02-27 04:12:55'),(6,'patricio estrella','patricio@outlook.com',321654987,'$2a$10$qfAUoxblohh3yUOa8rRTduoq92ivf8qXLCNKmsjnt2j0AozXOflv.',2,NULL,'patricio estrella.png','2024-02-27 04:12:55','2024-02-27 04:12:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27  1:16:53
