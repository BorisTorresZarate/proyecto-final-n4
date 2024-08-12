-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-08-2024 a las 19:35:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospedaje-incidencias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `incidenciaId` int(11) DEFAULT NULL,
  `rutaImagen` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `incidenciaId`, `rutaImagen`, `createdAt`, `updatedAt`) VALUES
(18, 13, 'uploads\\1723246511482-WhatsApp Image 2024-02-06 at 10.37.37 PM.jpeg', '2024-08-09 23:35:11', '2024-08-09 23:35:11'),
(19, 15, 'uploads\\1723246833433-triangle.png', '2024-08-09 23:40:33', '2024-08-09 23:40:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `id` int(11) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `estado` enum('pendiente','en proceso','resuelto') DEFAULT 'pendiente',
  `ubicacion` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias`
--

INSERT INTO `incidencias` (`id`, `asunto`, `descripcion`, `tipo`, `estado`, `ubicacion`, `userId`, `createdAt`, `updatedAt`) VALUES
(13, 'tuberias', 'se ha roto la tuberia de mi baño corregir', 'urgencia', 'en proceso', 'habitacion 101 piso 1', 1, '2024-08-09 23:35:11', '2024-08-12 16:47:13'),
(14, 'piso', 'el en piso hay una ceramica rota cheeee', 'prioridad', 'pendiente', 'habitacion 102 piso 1', 3, '2024-08-09 23:37:16', '2024-08-09 23:37:16'),
(15, 'humedad', 'hay humedad en la pared', 'urgencia', 'resuelto', 'habitacion 201 piso 2', 4, '2024-08-09 23:40:33', '2024-08-10 00:00:22'),
(16, 'espejo roto', 'se ha roto el espejo del baño necesito que lo cambien', 'urgencia', 'pendiente', 'habitacion 202 piso 2', 5, '2024-08-12 17:08:31', '2024-08-12 17:08:31'),
(17, 'ventana rota', 'necesito que cambien la ventana de mi cuarto hace mucho frio', 'urgencia', 'pendiente', 'habitacion 301 piso 3', 6, '2024-08-12 17:11:20', '2024-08-12 17:11:20'),
(19, 'chapa de la puerta averiada', 'necesito que reparen la chapa de la puerta principal ya que no cierra y no puedo salir ', 'urgencia', 'pendiente', 'habitacion 302 piso 3', 7, '2024-08-12 17:13:49', '2024-08-12 17:13:49'),
(21, 'duplicado de llave', 'necesito otro duplicado de la llave de mi habitacion porque se me perdio la copia', 'moderado', 'pendiente', 'habitacion 302 piso 3', 7, '2024-08-12 17:27:47', '2024-08-12 17:33:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `tipo` enum('residente','administrador') NOT NULL,
  `apartamento` varchar(255) DEFAULT NULL,
  `notificaciones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`notificaciones`)),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `piso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `contraseña`, `tipo`, `apartamento`, `notificaciones`, `createdAt`, `updatedAt`, `piso`) VALUES
(1, 'Guiomar Zarate', 'bgtz@gmail.com', '$2a$12$4vdVkqrYU1tVtveb1eVwNuuKmiCKZfkEZviUBTrzZorechffm3oBK', 'residente', '101', NULL, '2024-08-09 23:11:32', '2024-08-12 16:42:47', 1),
(2, 'Boris Zarate', 'bogui231297@gmail.com', '$2a$12$FbSejCL8JVNL17YLcDFZQunvnC8BS94HmcuYBrHHaha0IRBENk35O', 'administrador', '100', NULL, '2024-08-09 23:17:40', '2024-08-12 17:03:20', 1),
(3, 'Lionel Messi', 'messi@gmail.com', '$2a$12$tBLRPafW5vjCRYk3QMsbe.sm.deI1Lv6AIb5avsJzPNFhIvRmSf6O', 'residente', '102', NULL, '2024-08-09 23:18:31', '2024-08-12 17:03:32', 1),
(4, 'Jean Lapadula', 'lapadula@gmail.com', '$2a$12$QrnCkwP1G3Uz6xg.oUo9rObYnKVEQE6QV5896e6WzxFk5FYuME9r2', 'residente', '201', NULL, '2024-08-09 23:25:23', '2024-08-12 17:03:40', 2),
(5, 'Cristiano Ronaldo', 'elcapitan@gmail.com', '$2a$12$BUo/Fy5c9YWG5FdiVsH3KOl8/WcVD.jyQKHrs7vHkOVw2wiNPerT.', 'residente', '202', NULL, '2024-08-09 23:26:51', '2024-08-12 17:03:50', 2),
(6, 'Neymar Jr', 'neymar@gmail.com', '$2a$12$c98wheViISQ7fpErPHyF8uTpGLYFV/XKlOkXfq1R/GBD4SXQwmMjK', 'residente', '301', NULL, '2024-08-09 23:28:54', '2024-08-12 17:03:57', 3),
(7, 'Tony Cross', 'cross@gmail.com', '$2a$12$fFTQ4FAQc00C1.PgazAYseJ.yHBguIheJ733/juSAGxeXtv/tg0fG', 'residente', '302', NULL, '2024-08-09 23:30:30', '2024-08-12 17:04:06', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incidenciaId` (`incidenciaId`);

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`incidenciaId`) REFERENCES `incidencias` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
