-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 18 août 2023 à 07:35
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `itatitra`
--

-- --------------------------------------------------------

--
-- Structure de la table `activites`
--

DROP TABLE IF EXISTS `activites`;
CREATE TABLE IF NOT EXISTS `activites` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nom_activite` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `activites`
--

INSERT INTO `activites` (`id`, `Nom_activite`) VALUES
(1, 'TRAVAUX DE BORNAGES'),
(2, 'TRAVAUX DE PLAN REGULIER ET PROJET DE MORCELLEMENT'),
(3, 'AUTRES TRAVAUX'),
(4, 'TRAVAUX DE REPERAGE'),
(5, 'REPRODUCTION PLAN'),
(6, 'AUTRES REPRODUCTIONS'),
(7, 'SURFACE BORNEES'),
(8, 'DEMATERIALISATION'),
(9, 'ELABORATION PLOF / VALIDATION PLOF'),
(10, 'FOND PLAN DETERIORE ET / OU DEMANDES SPECIALES'),
(11, 'BUDGET GENERALE');

-- --------------------------------------------------------

--
-- Structure de la table `circonscriptions`
--

DROP TABLE IF EXISTS `circonscriptions`;
CREATE TABLE IF NOT EXISTS `circonscriptions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `NomRegion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NomCirconscription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `circonscriptions`
--

INSERT INTO `circonscriptions` (`id`, `NomRegion`, `NomCirconscription`, `created_at`, `updated_at`) VALUES
(1, 'ANALAMANGA', 'AMBODIHATRIMO', NULL, NULL),
(2, 'ANALAMANGA', 'ANDRAMASINA', NULL, NULL),
(3, 'ANALAMANGA', 'ANJOZOROBE\r\n', NULL, NULL),
(4, 'ANALAMANGA', 'ANKAZOBE', NULL, NULL),
(5, 'ANALAMANGA', 'ANTANANARIVO ATSIMONDRANO', NULL, NULL),
(6, 'ANALAMANGA', 'ANTANANARIVO AVARADRANO', NULL, NULL),
(7, 'ANALAMANGA', 'ANTANANARIVO RENIVOHITRA', NULL, NULL),
(8, 'ANALAMANGA', 'MANJAKANDRIANA', NULL, NULL),
(9, 'BONGOLAVA', 'FENOARIVOBE', NULL, NULL),
(10, 'BONGOLAVA', 'TSIROANOMANDIDY', NULL, NULL),
(11, 'ITASY', 'ARIVONIMAMO', NULL, NULL),
(12, 'ITASY', 'MIARINARIVO', NULL, NULL),
(13, 'ITASY', 'SOAVINANDRIANA', NULL, NULL),
(14, 'VAKINANKARATRA', 'AMBATOLAMPY', NULL, NULL),
(15, 'VAKINANKARATRA', 'ANTANIFOTSY', NULL, NULL),
(16, 'VAKINANKARATRA', 'ANTSIRABE I', NULL, NULL),
(17, 'VAKINANKARATRA', 'ANTSIRABE II', NULL, NULL),
(18, 'VAKINANKARATRA', 'BETAFO', NULL, NULL),
(19, 'VAKINANKARATRA', 'FARATSIHO', NULL, NULL),
(20, 'VAKINANKARATRA', 'MANDOTO', NULL, NULL),
(21, 'DIANA', 'AMBANJA', NULL, NULL),
(22, 'DIANA', 'AMBILOBE', NULL, NULL),
(23, 'DIANA', 'ANTSIRANANA I', NULL, NULL),
(24, 'DIANA', 'ANTSIRANANA II', NULL, NULL),
(25, 'DIANA', 'NOSY-BE', NULL, NULL),
(26, 'SAVA', 'ANDAPA', NULL, NULL),
(27, 'SAVA', 'ANTALAHA', NULL, NULL),
(28, 'SAVA', 'SAMBAVA', NULL, NULL),
(29, 'SAVA', 'VOHEMAR', NULL, NULL),
(31, 'AMORON\'I MANIA', 'AMBATOFINANDRAHANA', NULL, NULL),
(32, 'AMORON\'I MANIA', 'AMBOSITRA', NULL, NULL),
(33, 'AMORON\'I MANIA', 'FANDRIANA', NULL, NULL),
(34, 'AMORON\'I MANIA', 'MANANDRIANA', NULL, NULL),
(35, 'ATSIMO-ATSINANANA	', 'BEFOTAKA ATSIMO', NULL, NULL),
(36, 'ATSIMO-ATSINANANA	', 'FARAFANGANA', NULL, NULL),
(37, 'ATSIMO-ATSINANANA	', 'MIDONGY SUD', NULL, NULL),
(38, 'ATSIMO-ATSINANANA	', 'VANGAINDRANO', NULL, NULL),
(39, 'ATSIMO-ATSINANANA	', 'VONDROZO', NULL, NULL),
(40, 'HAUTE MATSIATRA', 'AMBALAVAO', NULL, NULL),
(41, 'HAUTE MATSIATRA', 'AMBOHIMAHASOA', NULL, NULL),
(42, 'HAUTE MATSIATRA', 'FIANARANTSOA', NULL, NULL),
(43, 'HAUTE MATSIATRA', 'ISANDRA', NULL, NULL),
(44, 'HAUTE MATSIATRA', 'IKALAMAVONY', NULL, NULL),
(45, 'HAUTE MATSIATRA', 'VOHIBATO', NULL, NULL),
(46, 'HAUTE MATSIATRA', 'LALANGINA', NULL, NULL),
(47, 'IHOROMBE', 'IAKORA', NULL, NULL),
(48, 'IHOROMBE', 'IHOSY', NULL, NULL),
(49, 'IHOROMBE', 'IVOHIBE', NULL, NULL),
(50, 'VATOVAVY-FITOVINANY', 'VOHIPENO', NULL, NULL),
(51, 'VATOVAVY-FITOVINANY', 'IFANADIANA', NULL, NULL),
(52, 'VATOVAVY-FITOVINANY', 'IKONGO', NULL, NULL),
(53, 'VATOVAVY-FITOVINANY', 'MANAKARA', NULL, NULL),
(54, 'VATOVAVY-FITOVINANY', 'MANANJARY', NULL, NULL),
(55, 'VATOVAVY-FITOVINANY', 'NOSY VARIKA', NULL, NULL),
(56, 'BETSIBOKA', 'KANDREHO', NULL, NULL),
(57, 'BETSIBOKA', 'MAEVATANANA', NULL, NULL),
(58, 'BETSIBOKA', 'TSARATANANA', NULL, NULL),
(59, 'BOENY', 'AMBATO BOENI', NULL, NULL),
(60, 'BOENY', 'MAHAJANGA I', NULL, NULL),
(61, 'BOENY', 'MAHAJANGA II', NULL, NULL),
(62, 'BOENY', 'MAROVOAY', NULL, NULL),
(63, 'BOENY', 'MITSINJO', NULL, NULL),
(64, 'BOENY', 'SOALALA', NULL, NULL),
(65, 'MELAKY', 'AMBATOMAINTY', NULL, NULL),
(66, 'MELAKY', 'ANTSALOVA', NULL, NULL),
(67, 'MELAKY', 'BESALAMPY', NULL, NULL),
(68, 'MELAKY', 'MAINTIRANO', NULL, NULL),
(69, 'MELAKY', 'MORAFENOBE', NULL, NULL),
(70, 'SOFIA', 'ANALALAVA', NULL, NULL),
(71, 'SOFIA', 'ANTSOHIHY', NULL, NULL),
(72, 'SOFIA', 'BEALANANA', NULL, NULL),
(73, 'SOFIA', 'BEFANDRIANA NORD', NULL, NULL),
(74, 'SOFIA', 'MAMPIKONY', NULL, NULL),
(75, 'SOFIA', 'MANDRITSARA', NULL, NULL),
(76, 'SOFIA', 'PORT-BERGE', NULL, NULL),
(77, 'ALAOTRA-MANGORO', 'AMBATONDRAZAKA', NULL, NULL),
(78, 'ALAOTRA-MANGORO', 'AMPARAFARAVOLA', NULL, NULL),
(79, 'ALAOTRA-MANGORO', 'ANDILAMENA', NULL, NULL),
(80, 'ALAOTRA-MANGORO', 'ANOSIBE AN\'ALA', NULL, NULL),
(81, 'ALAOTRA-MANGORO', 'MORAMANGA', NULL, NULL),
(82, 'ANALANJIROFO', 'FENERIVE EST', NULL, NULL),
(83, 'ANALANJIROFO', 'MANANARA-NORD', NULL, NULL),
(84, 'ANALANJIROFO', 'MAROANTSETRA', NULL, NULL),
(85, 'ANALANJIROFO', 'SAINTE MARIE', NULL, NULL),
(86, 'ANALANJIROFO', 'SOANIERANA IVONGO', NULL, NULL),
(87, 'ANALANJIROFO', 'VAVATENINA', NULL, NULL),
(88, 'ATSINANANA', 'ANTANAMBAO MANAMPONTSY', NULL, NULL),
(89, 'ATSINANANA', 'BRICKAVILLE', NULL, NULL),
(90, 'ATSINANANA', 'MAHANORO', NULL, NULL),
(91, 'ATSINANANA', 'MAROLAMBO', NULL, NULL),
(92, 'ATSINANANA', 'TOAMASINA I', NULL, NULL),
(93, 'ATSINANANA', 'TOAMASINA II', NULL, NULL),
(94, 'ATSINANANA', 'VATOMANDRY', NULL, NULL),
(95, 'ANDROY', 'AMBOVOMBE ANDROY', NULL, NULL),
(96, 'ANDROY', 'BEKILY', NULL, NULL),
(97, 'ANDROY', 'BELOHA ANDROY', NULL, NULL),
(98, 'ANDROY', 'TSIHOMBE', NULL, NULL),
(99, 'ANOSY', 'TAOLANARO', NULL, NULL),
(100, 'ANOSY', 'AMBOASARY SUD', NULL, NULL),
(101, 'ANOSY', 'BETROKA', NULL, NULL),
(102, 'ATSIMO-ANDREFANA', 'AMPANIHY OUEST', NULL, NULL),
(103, 'ATSIMO-ANDREFANA', 'ANKAZOABO SUD', NULL, NULL),
(104, 'ATSIMO-ANDREFANA', 'BENENITRA', NULL, NULL),
(105, 'ATSIMO-ANDREFANA', 'BEROROHA', NULL, NULL),
(106, 'ATSIMO-ANDREFANA', 'BETIOKY SUD', NULL, NULL),
(107, 'ATSIMO-ANDREFANA', 'MOROMBE', NULL, NULL),
(108, 'ATSIMO-ANDREFANA', 'SAKARAHA', NULL, NULL),
(109, 'ATSIMO-ANDREFANA', 'TOLIARA I', NULL, NULL),
(110, 'ATSIMO-ANDREFANA', 'TOLIARA II', NULL, NULL),
(111, 'MENABE', 'BELO SUR TSIRIBIHINA', NULL, NULL),
(112, 'MENABE', 'MAHABO', NULL, NULL),
(113, 'MENABE', 'MANJA', NULL, NULL),
(114, 'MENABE', 'MIANDRIVAZO', NULL, NULL),
(115, 'MENABE', 'MORONDAVA', NULL, NULL),
(117, 'ALL', 'ALL', '2023-07-31 21:00:00', '2023-07-31 21:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `enregistrers`
--

DROP TABLE IF EXISTS `enregistrers`;
CREATE TABLE IF NOT EXISTS `enregistrers` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `activite_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `circonscription_id` bigint(20) UNSIGNED NOT NULL,
  `recu_mois` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `execute_mois` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `en_cours_traitement` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paye_non_execute` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remis_mois` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `borne` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaure` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `scane` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vectorise` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valide` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bourrage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `decalage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `autres` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `demande_speciale` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payes` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `enregistrers_activite_id_foreign` (`activite_id`),
  KEY `enregistrers_user_id_foreign` (`user_id`),
  KEY `enregistrers_circonscription_id_foreign` (`circonscription_id`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `enregistrers`
--

INSERT INTO `enregistrers` (`id`, `activite_id`, `user_id`, `circonscription_id`, `recu_mois`, `execute_mois`, `en_cours_traitement`, `paye_non_execute`, `remis_mois`, `borne`, `restaure`, `scane`, `vectorise`, `valide`, `bourrage`, `decalage`, `autres`, `demande_speciale`, `payes`, `created_at`, `updated_at`) VALUES
(10, 1, 23, 17, '2/0/0/0', '0/0/0/0', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 12:01:47', '2023-08-15 12:01:47'),
(9, 1, 23, 17, '2/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 12:01:15', '2023-08-15 12:01:15'),
(8, 1, 25, 7, '2/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-13 20:13:07', '2023-08-13 20:13:07'),
(7, 1, 23, 17, '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-13 20:05:55', '2023-08-13 20:05:55'),
(11, 1, 23, 17, '2/0/1/0', '0/0/0/0', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 12:12:07', '2023-08-15 12:12:07'),
(12, 1, 23, 17, '2/0/1/0', '0/0/0/0', '0/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 12:15:33', '2023-08-15 12:15:33'),
(13, 1, 23, 17, '3/0/1/0', '0/0/0/0', '0/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 12:44:41', '2023-08-15 12:44:41'),
(14, 1, 23, 17, '4/0/1/0', '0/0/0/0', '0/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 17:12:59', '2023-08-15 17:12:59'),
(15, 1, 23, 17, '4/0/1/0', '1/0/0/0', '0/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 17:13:29', '2023-08-15 17:13:29'),
(16, 1, 23, 17, '4/0/1/0', '0/0/0/0', '0/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 17:13:45', '2023-08-15 17:13:45'),
(17, 1, 23, 17, '5/0/1/0', '0/0/0/0', '0/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 17:52:19', '2023-08-15 17:52:19'),
(18, 1, 23, 17, '5/1/1/0', '0/0/0/0', '0/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 17:53:16', '2023-08-15 17:53:16'),
(19, 1, 23, 17, '5/2/1/0', '0/0/0/0', '0/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-15 17:53:28', '2023-08-15 17:53:28'),
(65, 1, 23, 17, '20/4/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:02:41', '2023-08-16 18:02:41'),
(64, 1, 23, 17, '20/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:01:26', '2023-08-16 18:01:26'),
(63, 1, 23, 17, '19/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:01:13', '2023-08-16 18:01:13'),
(62, 1, 23, 17, '18/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:00:34', '2023-08-16 18:00:34'),
(60, 1, 23, 17, '15/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 12:42:00', '2023-08-16 12:42:00'),
(59, 1, 23, 17, '14/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 12:33:29', '2023-08-16 12:33:29'),
(58, 1, 23, 17, '15/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 12:31:19', '2023-08-16 12:31:19'),
(57, 1, 23, 17, '14/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 12:29:04', '2023-08-16 12:29:04'),
(61, 1, 23, 17, '17/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:00:27', '2023-08-16 18:00:27'),
(55, 1, 23, 17, '12/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 12:03:48', '2023-08-16 12:03:48'),
(54, 1, 23, 17, '11/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 12:00:04', '2023-08-16 12:00:04'),
(53, 1, 23, 17, '12/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 11:59:54', '2023-08-16 11:59:54'),
(32, 1, 23, 17, '11/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 05:31:47', '2023-08-16 05:31:47'),
(33, 1, 23, 17, '12/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 06:03:19', '2023-08-16 06:03:19'),
(34, 1, 23, 17, '13/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 06:03:30', '2023-08-16 06:03:30'),
(35, 1, 23, 17, '14/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 07:03:54', '2023-08-16 07:03:54'),
(36, 1, 23, 17, '15/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 08:30:06', '2023-08-16 08:30:06'),
(37, 1, 23, 17, '15/3/1/0', '2/0/0/0', '1/0/0/1', '1/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 08:30:26', '2023-08-16 08:30:26'),
(38, 1, 23, 17, '16/3/1/0', '2/0/0/0', '1/0/0/1', '1/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 08:34:19', '2023-08-16 08:34:19'),
(39, 1, 23, 17, '17/3/1/0', '2/0/0/0', '1/0/0/1', '1/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 08:42:54', '2023-08-16 08:42:54'),
(40, 1, 23, 17, '17/3/1/0', '2/0/0/0', '1/0/0/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 08:47:28', '2023-08-16 08:47:28'),
(41, 1, 23, 17, '17/3/1/0', '2/0/0/0', '0/0/0/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 08:50:08', '2023-08-16 08:50:08'),
(42, 1, 23, 17, '1/3/1/0', '2/0/0/0', '0/0/0/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-07-11 08:50:15', '2023-08-16 08:50:15'),
(43, 1, 23, 17, '15/3/1/0', '2/0/0/0', '0/0/0/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 08:50:30', '2023-08-16 08:50:30'),
(44, 1, 23, 17, '14/3/1/0', '2/0/0/0', '0/0/0/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 08:57:12', '2023-08-16 08:57:12'),
(45, 1, 23, 17, '14/3/1/0', '2/0/0/0', '0/0/0/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 09:11:23', '2023-08-16 09:11:23'),
(46, 1, 23, 17, '14/3/1/0', '2/0/0/0', '0/0/0/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 09:11:33', '2023-08-16 09:11:33'),
(47, 1, 23, 17, '14/3/1/0', '2/0/0/0', '0/0/2/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 09:25:37', '2023-08-16 09:25:37'),
(48, 1, 23, 17, '14/3/1/0', '2/0/0/0', '1/0/2/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 10:24:53', '2023-08-16 10:24:53'),
(49, 1, 23, 17, '15/3/1/0', '2/0/0/0', '1/0/2/1', '2/0/0/1', '1/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 10:25:01', '2023-08-16 10:25:01'),
(50, 1, 23, 17, '11/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 11:55:04', '2023-08-16 11:55:04'),
(51, 1, 23, 17, '12/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 11:55:14', '2023-08-16 11:55:14'),
(52, 1, 23, 17, '11/3/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 11:55:43', '2023-08-16 11:55:43'),
(66, 1, 23, 17, '20/5/1/0', '2/0/0/0', '1/0/0/1', '0/0/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:02:54', '2023-08-16 18:02:54'),
(67, 1, 23, 17, '20/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:03:03', '2023-08-16 18:03:03'),
(68, 1, 23, 17, '21/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:05:04', '2023-08-16 18:05:04'),
(69, 1, 23, 17, '22/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-16 18:06:28', '2023-08-16 18:06:28'),
(73, 1, 23, 17, '23/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 09:00:32', '2023-08-17 09:00:32'),
(74, 1, 23, 17, '22/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 09:20:18', '2023-08-17 09:20:18'),
(75, 1, 23, 17, '23/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 11:59:22', '2023-08-17 11:59:22'),
(76, 1, 23, 17, '24/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 12:21:53', '2023-08-17 12:21:53'),
(77, 1, 23, 17, '25/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 12:22:10', '2023-08-17 12:22:10'),
(78, 1, 23, 17, '26/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 15:14:20', '2023-08-17 15:14:20'),
(79, 1, 23, 17, '27/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 15:37:56', '2023-08-17 15:37:56'),
(80, 1, 23, 17, '28/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 17:28:37', '2023-08-17 17:28:37'),
(81, 1, 23, 17, '29/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 17:50:53', '2023-08-17 17:50:53'),
(82, 1, 23, 17, '28/5/1/0', '2/0/0/0', '1/0/0/1', '0/1/0/1', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 17:53:25', '2023-08-17 17:53:25'),
(83, 1, 25, 7, '3/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 18:03:01', '2023-08-17 18:03:01'),
(84, 1, 25, 7, '4/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '0/0/0/0', '2023-08-17 18:03:07', '2023-08-17 18:03:07');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2023_07_30_091321_create_circonscriptions_table', 1),
(4, '2023_07_31_153332_add_circonscription_id_and_status_and_drop__num_circonscription', 2),
(5, '2023_07_31_204241_add_fonction_user', 3),
(6, '2023_08_12_125342_create_activites_table', 4),
(8, '2023_08_12_125415_create_enregistrers_table', 5);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`(250))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(32, 'App\\Models\\User', 23, 'authToken', '96069c1ed1c7c4814ffbb7fc9b84f3fdb704776d5404b2c432ad8ba0d562c945', '[\"*\"]', '2023-08-17 19:05:54', '2023-08-17 19:03:00', '2023-08-17 19:05:54'),
(31, 'App\\Models\\User', 23, 'authToken', 'e66ad672bd3b0e8f33c519e2f5404cfaffedf464444e747767a4f37e3733aa6d', '[\"*\"]', '2023-08-17 18:57:16', '2023-08-17 18:03:55', '2023-08-17 18:57:16');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Prenom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Telephone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CIN` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `circonscription_id` bigint(20) UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL,
  `fonction` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`) USING HASH,
  KEY `users_circonscription_id_foreign` (`circonscription_id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `Nom`, `Prenom`, `Telephone`, `CIN`, `email`, `password`, `created_at`, `updated_at`, `circonscription_id`, `status`, `fonction`) VALUES
(22, 'RAHERIMIHAMINTSOA', 'Tobias', '75418415415512', '1215445121744', 'tobias@gmail.com', '$2y$10$tVoQ.xGUu1VaUoV4F.HXDuC.h.fOFQnK.wfCilfN/fwVQPqfI5Au2', '2023-08-07 09:15:59', '2023-08-07 09:15:59', 117, 0, 0),
(21, 'RHERIMIHAMINTSOA', 'Lova', '0348764275', '789541359674', 'loic@gmail.com', '$2y$10$8fx4cQ6u7cuKlSGTwH3OZe.V.iQvwsULUvfA4Nvdkjj5p08POGOR.', '2023-08-03 16:52:55', '2023-08-03 16:52:55', 11, 0, 3),
(20, 'RHERIMIHAMINTSOA', 'Lovatiana', '0348764275', '789541359674', 'loizc@gmail.com', '$2y$10$7Jfu8jQX0L9MkLHYCimN4uO9fe.z.NTNdq/k/h1nM7zYTHUGcrEcO', '2023-08-03 16:33:23', '2023-08-03 16:33:23', 11, 0, 3),
(23, 'RAHERIMIHAMINTSOA', 'Daniela', '7894561234', '4781216412348', 'daniela@gmail.com', '$2y$10$MEDKnr/0QtgTiFLjdy9Fo.sGhFOEq.jLrxE/fxUuyou2uLe3COLPK', '2023-08-09 12:41:22', '2023-08-09 12:41:22', 17, 0, 4),
(24, 'ZAAA', 'Zoto', '7894561234', '7842121', 'jojo@gmail.com', '$2y$10$/qPPlqFQFXdUzmzoUwqAuOWzHAb8ApE3a0xvQZ04vpaEeHrzzxMJK', '2023-08-13 12:20:28', '2023-08-13 12:20:28', 117, 0, 2),
(25, 'test', 'loic', '7412547864', '123456789456', 'test@gmail.com', '$2y$10$uTQc19ENk9mVqAZhKKFCl.GzpfG/opoGeVXPy4OLVW3ZIKZ/qdV.y', '2023-08-13 20:12:10', '2023-08-13 20:12:10', 7, 0, 4);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
