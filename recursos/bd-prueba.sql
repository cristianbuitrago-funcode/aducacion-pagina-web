-- ============================================================================
-- bd-prueba.sql — Base de datos de PRÁCTICA para la web de Marcos (Proyecto_GE)
--
-- * Estructura: idéntica a la del volcado original (tablas, claves, relaciones).
-- * Datos: 100 % INVENTADOS. No contiene ningún dato real.
-- * Contraseña de todos los usuarios de prueba: prueba123 (guardada con sha1,
--   igual que hace la web).
-- * Uso: phpMyAdmin → crear base gestione_gestionempresarial → Importar este archivo.
-- * NUNCA importar en el servidor real.
-- ============================================================================
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET NAMES utf8mb4;

CREATE TABLE `carrentalservice` (
  `idCarRentalService` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `addressCarRentalExit` varchar(100) NOT NULL,
  `addressCarRentalFinal` varchar(100) NOT NULL,
  `dateCarRental` date NOT NULL,
  `timeCarRentalExit` time NOT NULL,
  `hoursCarRental` int(11) NOT NULL,
  `contactCarRental` varchar(10) NOT NULL,
  `dateServiceTaken` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `deliveryservice` (
  `idDeliveryService` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `addressDeliveryServiceExit` varchar(100) NOT NULL,
  `addressDeliveryServiceFinal` varchar(100) NOT NULL,
  `contactDeliveryService` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `freightservice` (
  `idFreightService` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `addressFreightServiceExit` varchar(100) NOT NULL,
  `addressFreightServiceFinal` varchar(100) NOT NULL,
  `dateFreightService` date NOT NULL,
  `timeFreightServiceExit` time NOT NULL,
  `contactFreightService` varchar(10) NOT NULL,
  `valueFreightService` varchar(20) NOT NULL,
  `descriptionFreightService` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `messagingservice` (
  `idMessagingService` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `addressMessagingExit` varchar(100) NOT NULL,
  `addressMessagingrFinal` varchar(100) NOT NULL,
  `dateMessaging` date NOT NULL,
  `timeMessagingExit` time NOT NULL,
  `valueMessaging` int(11) NOT NULL,
  `contactMessaging` varchar(10) NOT NULL,
  `descriptionMessaging` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `moveservice` (
  `idMoveService` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `addressMoveServiceExit` varchar(100) NOT NULL,
  `addressMoveServiceFinal` varchar(100) NOT NULL,
  `dateMoveService` date NOT NULL,
  `timeMoveServiceExit` time NOT NULL,
  `contactMoveService` varchar(10) NOT NULL,
  `typeOfTruckMoveService` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `passengertransportservice` (
  `idPassengerTransportService` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `addressPassengerTransportExit` varchar(100) NOT NULL,
  `addressPassengerTransportFinal` varchar(100) NOT NULL,
  `datePassengerTransport` date NOT NULL,
  `timePassengerTransportExit` time NOT NULL,
  `contactPassengerTransport` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `userpoints` (
  `idUser` int(11) NOT NULL,
  `idUserPoints` int(11) NOT NULL,
  `serviceTaken` varchar(6) NOT NULL,
  `hoursTaken` varchar(15) NOT NULL,
  `personalPoints` varchar(10) NOT NULL,
  `spentPayPointUser` varchar(15) NOT NULL,
  `totalAccumulatedPoints` varchar(15) NOT NULL,
  `codeUserSponsor` varchar(6) NOT NULL,
  `codeUserFriend` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `users` (
  `idUser` int(11) NOT NULL,
  `rolUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,
  `namesUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,
  `lastNameUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,
  `identificationDocumentUser` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `expeditionUser` date NOT NULL,
  `numberUser` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  `emailUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,
  `passwordUser` varchar(40) CHARACTER SET utf8mb4 NOT NULL,
  `codeUserSponsor` varchar(6) CHARACTER SET utf8mb4 NOT NULL,
  `codeUserFriend` varchar(6) CHARACTER SET utf8mb4 NOT NULL,
  `tokenUser` varchar(50) CHARACTER SET utf8mb4 DEFAULT NULL,
  `registerDate` date NOT NULL,
  `vipUser` varchar(12) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
ALTER TABLE `carrentalservice`
  ADD PRIMARY KEY (`idCarRentalService`),
  ADD KEY `carrentalservice_users` (`idUser`);
ALTER TABLE `deliveryservice`
  ADD PRIMARY KEY (`idDeliveryService`),
  ADD KEY `deliveryservice_users` (`idUser`);
ALTER TABLE `freightservice`
  ADD PRIMARY KEY (`idFreightService`),
  ADD KEY `freightservice_users` (`idUser`);
ALTER TABLE `messagingservice`
  ADD PRIMARY KEY (`idMessagingService`),
  ADD KEY `messagingservice_users` (`idUser`);
ALTER TABLE `moveservice`
  ADD PRIMARY KEY (`idMoveService`),
  ADD KEY `moveservice_users` (`idUser`);
ALTER TABLE `passengertransportservice`
  ADD PRIMARY KEY (`idPassengerTransportService`),
  ADD KEY `passengertransportservice_users` (`idUser`);
ALTER TABLE `userpoints`
  ADD PRIMARY KEY (`idUser`);
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);
ALTER TABLE `carrentalservice`
  MODIFY `idCarRentalService` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `deliveryservice`
  MODIFY `idDeliveryService` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `freightservice`
  MODIFY `idFreightService` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `messagingservice`
  MODIFY `idMessagingService` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `moveservice`
  MODIFY `idMoveService` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `passengertransportservice`
  MODIFY `idPassengerTransportService` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `userpoints`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `carrentalservice`
  ADD CONSTRAINT `carrentalservice_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `deliveryservice`
  ADD CONSTRAINT `deliveryservice_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `freightservice`
  ADD CONSTRAINT `freightservice_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `messagingservice`
  ADD CONSTRAINT `messagingservice_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `moveservice`
  ADD CONSTRAINT `moveservice_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `passengertransportservice`
  ADD CONSTRAINT `passengertransportservice_users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

-- ---------------------------------------------------------------- datos inventados
INSERT INTO users (idUser, rolUser, namesUser, lastNameUser, identificationDocumentUser, expeditionUser, numberUser, emailUser, passwordUser, codeUserSponsor, codeUserFriend, tokenUser, registerDate, vipUser) VALUES
(1, 'admin', 'Admin', 'Prueba', '1000000001', '2015-01-10', '3000000001', 'admin@prueba.test', '93301ada8177f4b7841620847f3d06d41febdd1d', 'ADM001', '', NULL, '2026-10-01', 'Promoted'),
(2, 'Cliente', 'Ana', 'Ejemplo', '1000000002', '2016-02-20', '3000000002', 'ana@prueba.test', '93301ada8177f4b7841620847f3d06d41febdd1d', 'ANA002', 'ADM001', NULL, '2026-10-05', 'Not Promoted'),
(3, 'Arrendatario', 'Beto', 'Ejemplo', '1000000003', '2017-03-30', '3000000003', 'beto@prueba.test', '93301ada8177f4b7841620847f3d06d41febdd1d', 'BET003', 'ANA002', NULL, '2026-10-08', 'Not Promoted');

INSERT INTO userpoints (idUser, idUserPoints, serviceTaken, hoursTaken, personalPoints, spentPayPointUser, totalAccumulatedPoints, codeUserSponsor, codeUserFriend) VALUES
(1, 1, '0', '0', '0', '0', '0', 'ADM001', ''),
(2, 2, '0', '0', '0', '0', '0', 'ANA002', 'ADM001'),
(3, 3, '0', '0', '0', '0', '0', 'BET003', 'ANA002');

INSERT INTO carrentalservice (idCarRentalService, idUser, addressCarRentalExit, addressCarRentalFinal, dateCarRental, timeCarRentalExit, hoursCarRental, contactCarRental, dateServiceTaken) VALUES
(1, 2, 'Calle Falsa 123', 'Avenida Siempre Viva 742', '2026-10-20', '08:00:00', 2, '3000000002', '2026-10-15 10:00:00'),
(2, 3, 'Carrera 1 # 2-3', 'Calle 4 # 5-6', '2026-10-22', '14:30:00', 4, '3000000003', '2026-10-16 09:30:00');
