-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 12 2020 г., 17:41
-- Версия сервера: 10.4.11-MariaDB
-- Версия PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `someproject`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `company` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `bookmarks` text COLLATE utf8_bin NOT NULL DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `company`, `email`, `bookmarks`) VALUES
(1, 'Колобов Сергей Яковович', '$2y$10$z.ZK/fCF4cfxu4uIsDCEc.tHbDF8yBSYPym1fP9sKRLgCYAYREeci', 'ООО \"ИНСТА\"', 'test1@gmail.com', '[\"1\"]'),
(2, 'Маслов Аполлон Донатович', '$2y$10$D9mE.4oa4ITaPq3LLrcZVuIkhlcuHdxTDelqr/3H9bwhcACHxxRZC', 'ООО \"Кречет\"', 'test2@gmail.com', '[\"2\",\"1\"]'),
(3, 'Копылов Павел Мартынович', '$2y$10$33A9TlLZ7/ZnQo1OSHymF.IFGYpa4FC0BLxuyUe3S0xBn6a/szbIO', 'ООО \"ИНСТА\"', 'test3@gmail.com', '[]'),
(4, 'Владимиров Роман Евсеевич', '$2y$10$pWKS2xV9C0lRKCLvquhb0O1d71mgaUitczUbap8Bk27VWMG4vCFna', 'ООО \"Технопоинт\"', 'test4@gmail.com', '[]'),
(5, 'Самсонова Беатриса Геннадьевна', '$2y$10$8M0pIPvMaOwkgpFlpdLMR.dzwxJ0S4DRdvS1AlOp5oiAy0NFBP/x2', 'ООО \"Что то там\"', 'test5@gmail.com', '[]'),
(6, 'Игнатьева Любава Оскаровна', '$2y$10$vipUmdydHs4p85r7JupgwOX54SR/i01gB.9oU8YqlwcZIV/eh86mq', 'ООО \"ИНСТА\"', 'test6@gmail.com', '[\"6\",\"1\"]'),
(7, 'Быкова Зоряна Мартыновна', '$2y$10$8vhSIc.wYJBfgR5GODkTO.cLSFyg7Huwdvt6MRTMcP4p4RAUm/gj2', 'ООО \"Заря\"', 'test7@gmail.com', '[]'),
(8, 'Кулагина Аделия Романовна', '$2y$10$p.9PGMNbG625wDOLkkF78e935mHWpt/HFOHzCSfmuDTGTOZmLpoiu', 'АО \"Колхоз\"', 'test8@gmail.com', '[]'),
(9, 'Гусева Софья Петровна', '$2y$10$Nun7po0W6sk.m/vJP9kFXOhisIWfek0NX3HZbhToSUpFCy3E3a2Nm', 'АО \"Колхоз\"', 'test9@gmail.com', '[]'),
(10, 'Горшкова Веселина Васильевна', '$2y$10$Nun7po0W6sk.m/vJP9kFXOhisIWfek0NX3HZbhToSUpFCy3E3a2Nm', 'АО \"Колхоз\"', 'test10@gmail.com', '[]'),
(11, 'Субботина Любава Альвиановна', '$2y$10$8M0pIPvMaOwkgpFlpdLMR.dzwxJ0S4DRdvS1AlOp5oiAy0NFBP/x2', 'ООО \"Что то там\"', 'test11@gmail.com', '[]'),
(12, 'Зимина Сандра Львовна', '$2y$10$D9mE.4oa4ITaPq3LLrcZVuIkhlcuHdxTDelqr/3H9bwhcACHxxRZC', 'ООО \"Кречет\"', 'test12@gmail.com', '[\"2\",\"1\"]'),
(13, 'Фомина Данута Владленовна', '$2y$10$8vhSIc.wYJBfgR5GODkTO.cLSFyg7Huwdvt6MRTMcP4p4RAUm/gj2', 'ООО \"Заря\"', 'test13@gmail.com', '[]'),
(14, 'Третьякова Зоряна Иринеевна', '$2y$10$8vhSIc.wYJBfgR5GODkTO.cLSFyg7Huwdvt6MRTMcP4p4RAUm/gj2', 'ООО \"Заря\"', 'test14@gmail.com', '[]'),
(15, 'Сысоев Родион Викторович', '$2y$10$D9mE.4oa4ITaPq3LLrcZVuIkhlcuHdxTDelqr/3H9bwhcACHxxRZC', 'ООО \"Кречет\"', 'test15@gmail.com', '[\"2\",\"1\"]');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
