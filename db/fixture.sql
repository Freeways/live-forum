SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
--
-- Database: `live-forum`
--
USE `live-forum`;
--
-- Dumping data for table `topic`
--
INSERT INTO `topic` (`id`, `subject`, `preamble`) VALUES
(1, 'Dogs vs Cats', 'Cat vs Dog comparison. Cats and dogs are the most popular pets in the world. Cats are more independent and are generally cheaper and less demanding pets.'),
(2, 'Free software', 'Free software, software libre, or libre software is computer software that gives users the freedom to run the software for any purpose as well as to study, change, and distribute the software and the adapted versions. The right to study and modify free software gives full access to its source code. For computer programs which are covered by copyright law this is achieved with a software license where the author grants users the aforementioned freedoms. Software which is not covered by copyright law, such as software in the public domain is free if the source code is in the public domain (or otherwise available without restrictions).'),
(3, 'Nodejs', 'Node.js is a JavaScript runtime built on Chrome''s V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js'' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.');
--
-- Dumping data for table `comment`
--
INSERT INTO `comment` (`id`, `topic_id`, `body`, `user_token`) VALUES
(1, 1, 'Cats', 'FF12'),
(2, 1, 'Cats', 'FF13'),
(3, 1, 'Dogs', 'FF14'),
(4, 1, 'Cats', 'FF15'),
(5, 1, 'Dogs', 'FF16'),
(6, 1, 'Cats', 'FF17'),
(7, 1, 'Dogs', 'FF18'),
(8, 1, 'Dogs', 'FF19'),
(9, 1, 'Cats', 'FF1A'),
(10, 1, 'Dogs', 'FF1B'),
(11, 2, 'The computer industry is the only industry that is more fashion-driven than women''s fashion.', 'A2A2'),
(12, 2, 'If programmers deserve to be rewarded for creating innovative programs, by the same token they deserve to be punished if they restrict the use of these programs.', 'A2A3'),
(13, 2, 'Also, because schools must teach the spirit of goodwill, the habit of helping others around you, every class should have this rule: students, if you bring software to class you may not keep it for yourself.', 'A2A4'),
(14, 2, 'Android is very different from the GNU/Linux operating system because it contains very little of GNU. Indeed, just about the only component in common between Android and GNU/Linux is Linux, the kernel.', 'A2A5'),
(15, 2, 'The interesting thing about cloud computing is that we''ve redefined cloud computing to include everything that we already do.', 'A2A6'),
(16, 3, 'I/O-bound programs are constrained by data access. These are programs where adding more processing power or RAM often makes little difference.', '12DF'),
(17, 3, 'A backwardism is a concept that’s so bizarre that at first it seems completely backwards.', '12E0');