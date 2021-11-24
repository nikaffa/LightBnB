INSERT INTO users
VALUES (1, 'Armand Hilll', 'lera_hahn@dickens.org', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Stephanie Wolff', 'darius.homenick@tod.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Stan Miller', 'mcdermott.maxie@schoen.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties
VALUES (1, 1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', true),
(2, 2, 'Black corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 880, 2, 3, 4, 'Canada', '5 Highway One', 'Sotboske', 'Quebec', '28100', false),
(3, 3, 'Bear corner', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 46058, 0, 5, 6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', '44583', true);

INSERT INTO reservations 
VALUES (1, 1, 1, '2018-09-11', '2018-09-26'),
(2, 2, 2, '2018-09-11', '2018-09-26'),
(3, 3, 3, '2019-01-04', '2019-02-01');

INSERT INTO property_reviews
VALUES (1, 1, 1, 1, 5, 'message'),
(2, 2, 2, 2, 3, 'message'),
(3, 3, 3, 3, 4, 'message');