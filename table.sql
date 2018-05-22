CREATE TABLE `message_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client` varchar(45) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;
