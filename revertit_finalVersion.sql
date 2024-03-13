-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 06. Jul 2021 um 11:52
-- Server-Version: 10.4.16-MariaDB
-- PHP-Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `revertit`
--
CREATE DATABASE IF NOT EXISTS `revertit` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `revertit`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `buchung`
--

CREATE TABLE `buchung` (
  `Id_Buchung` int(11) NOT NULL,
  `Id_Warenkorb` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rolle`
--

CREATE TABLE `rolle` (
  `Id_Rolle` int(11) NOT NULL,
  `Beschreibung` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `rolle`
--

INSERT INTO `rolle` (`Id_Rolle`, `Beschreibung`) VALUES
(1, 'Das ist die Rolle eines Consumers'),
(2, 'Das ist die Rolle eines Producers');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `termin`
--

CREATE TABLE `termin` (
  `Id_Termin` int(11) NOT NULL,
  `Straße` varchar(50) DEFAULT NULL,
  `Hausnummer` varchar(50) DEFAULT NULL,
  `PLZ` varchar(50) DEFAULT NULL,
  `Startzeit` datetime NOT NULL,
  `URL` varchar(255) DEFAULT NULL,
  `Id_Workshop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tu_zuweisung`
--

CREATE TABLE `tu_zuweisung` (
  `Id_Termin` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `Email` varchar(50) NOT NULL,
  `Geschlecht` varchar(11) NOT NULL,
  `Vorname` varchar(50) NOT NULL,
  `Nachname` varchar(50) NOT NULL,
  `Bio` varchar(255) DEFAULT NULL,
  `Straße` varchar(50) DEFAULT NULL,
  `Hausnummer` varchar(50) DEFAULT NULL,
  `PLZ` varchar(50) DEFAULT NULL,
  `Rezension` varchar(255) DEFAULT NULL,
  `Passwort` varchar(20) NOT NULL,
  `Id_Rolle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`Email`, `Geschlecht`, `Vorname`, `Nachname`, `Bio`, `Straße`, `Hausnummer`, `PLZ`, `Rezension`, `Passwort`, `Id_Rolle`) VALUES
('a@a', 'weiblich', 'a', 'a', NULL, NULL, NULL, NULL, NULL, 'a', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `warenkorb`
--

CREATE TABLE `warenkorb` (
  `Id_Warenkorb` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `workshop`
--

CREATE TABLE `workshop` (
  `Id_Workshop` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Titel` varchar(50) NOT NULL,
  `Beschreibung` varchar(255) NOT NULL,
  `Ort` varchar(255) NOT NULL,
  `Workshop_Dauer` varchar(50) NOT NULL,
  `Bewertung` varchar(50) DEFAULT NULL,
  `Preis` varchar(255) NOT NULL,
  `Art` varchar(255) NOT NULL,
  `Termin` varchar(255) NOT NULL,
  `UberCreator` varchar(255) NOT NULL,
  `Geeignet` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `workshop`
--

INSERT INTO `workshop` (`Id_Workshop`, `Email`, `Titel`, `Beschreibung`, `Ort`, `Workshop_Dauer`, `Bewertung`, `Preis`, `Art`, `Termin`, `UberCreator`, `Geeignet`) VALUES
(11, 'a@a', 'aaaaaa', 'aaaaa', 'aaa', 'aaaa', NULL, '1111', 'aaaaa', 'aaaaa', 'aaaa', 'aaaa');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ww_zuweisung`
--

CREATE TABLE `ww_zuweisung` (
  `Id_Warenkorb` int(11) NOT NULL,
  `Id_Workshop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `buchung`
--
ALTER TABLE `buchung`
  ADD PRIMARY KEY (`Id_Buchung`),
  ADD KEY `Id_Warenkorb` (`Id_Warenkorb`);

--
-- Indizes für die Tabelle `rolle`
--
ALTER TABLE `rolle`
  ADD PRIMARY KEY (`Id_Rolle`);

--
-- Indizes für die Tabelle `termin`
--
ALTER TABLE `termin`
  ADD PRIMARY KEY (`Id_Termin`),
  ADD KEY `Id_Workshop` (`Id_Workshop`);

--
-- Indizes für die Tabelle `tu_zuweisung`
--
ALTER TABLE `tu_zuweisung`
  ADD KEY `Email` (`Email`),
  ADD KEY `Id_Termin` (`Id_Termin`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Email`),
  ADD KEY `Id_Rolle` (`Id_Rolle`);

--
-- Indizes für die Tabelle `warenkorb`
--
ALTER TABLE `warenkorb`
  ADD PRIMARY KEY (`Id_Warenkorb`),
  ADD KEY `Email` (`Email`);

--
-- Indizes für die Tabelle `workshop`
--
ALTER TABLE `workshop`
  ADD PRIMARY KEY (`Id_Workshop`),
  ADD KEY `Email` (`Email`);

--
-- Indizes für die Tabelle `ww_zuweisung`
--
ALTER TABLE `ww_zuweisung`
  ADD KEY `Id_Warenkorb` (`Id_Warenkorb`),
  ADD KEY `Id_Workshop` (`Id_Workshop`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `buchung`
--
ALTER TABLE `buchung`
  MODIFY `Id_Buchung` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `rolle`
--
ALTER TABLE `rolle`
  MODIFY `Id_Rolle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `termin`
--
ALTER TABLE `termin`
  MODIFY `Id_Termin` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `warenkorb`
--
ALTER TABLE `warenkorb`
  MODIFY `Id_Warenkorb` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `workshop`
--
ALTER TABLE `workshop`
  MODIFY `Id_Workshop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `buchung`
--
ALTER TABLE `buchung`
  ADD CONSTRAINT `buchung_ibfk_1` FOREIGN KEY (`Id_Warenkorb`) REFERENCES `warenkorb` (`Id_Warenkorb`);

--
-- Constraints der Tabelle `termin`
--
ALTER TABLE `termin`
  ADD CONSTRAINT `termin_ibfk_1` FOREIGN KEY (`Id_Workshop`) REFERENCES `workshop` (`Id_Workshop`);

--
-- Constraints der Tabelle `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`Id_Rolle`) REFERENCES `rolle` (`Id_Rolle`);

--
-- Constraints der Tabelle `warenkorb`
--
ALTER TABLE `warenkorb`
  ADD CONSTRAINT `warenkorb_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`);

--
-- Constraints der Tabelle `workshop`
--
ALTER TABLE `workshop`
  ADD CONSTRAINT `workshop_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `user` (`Email`);

--
-- Constraints der Tabelle `ww_zuweisung`
--
ALTER TABLE `ww_zuweisung`
  ADD CONSTRAINT `ww_zuweisung_ibfk_1` FOREIGN KEY (`Id_Warenkorb`) REFERENCES `warenkorb` (`Id_Warenkorb`),
  ADD CONSTRAINT `ww_zuweisung_ibfk_2` FOREIGN KEY (`Id_Workshop`) REFERENCES `workshop` (`Id_Workshop`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
