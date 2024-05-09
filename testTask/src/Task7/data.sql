-- Creating the table sesInfoArr
CREATE TABLE IF NOT EXISTS sesInfoArr (
                                          sessionId VARCHAR(255) PRIMARY KEY,
                                          channelId VARCHAR(255) NOT NULL,
                                          companyId VARCHAR(255) NOT NULL,
                                          ekbId VARCHAR(255) NOT NULL
);

-- Creating the table callBotsArr
CREATE TABLE IF NOT EXISTS callBotsArr (
                                           sessionId VARCHAR(255),
                                           botName VARCHAR(255),
                                           time INT,
                                           numderBot INT,
                                           PRIMARY KEY (sessionId, botName),
                                           FOREIGN KEY (sessionId) REFERENCES sesInfoArr(sessionId) ON DELETE CASCADE
);

-- Inserting data into sesInfoArr
INSERT INTO sesInfoArr (sessionId, channelId, companyId, ekbId) VALUES
                                                                    ('74e40bf0-0fbd-11eb-8dcc-39ce21e9ded5', 'd79ad580-8432-11e8-8ccb-47a5457db1b2', 'i14778026796', '111111'),
                                                                    ('eeae0530-1067-11eb-a1ba-333704aff6af', '70fff320-42d9-11ea-ac8e-33aee523fe76', 'i14778026796', '222222'),
                                                                    ('f4465250-1066-11eb-a1ba-333704aff6af', '543ea1f0-81d8-11e8-99e2-75a22f922020', 'i14778026796', '333333');

-- Inserting data into callBotsArr
INSERT INTO callBotsArr (sessionId, botName, time, numderBot) VALUES
                                                                  ('f4465250-1066-11eb-a1ba-333704aff6af', 'moneybox', 1602677158, 1),
                                                                  ('74e40bf0-0fbd-11eb-8dcc-39ce21e9ded5', 'changecrlim', 1602933008, 2),
                                                                  ('74e40bf0-0fbd-11eb-8dcc-39ce21e9ded5', 'changecrlim', 1602930478, 3),
                                                                  ('eeae0530-1067-11eb-a1ba-333704aff6af', 'mainformcurr', 1602835558, 4),
                                                                  ('eeae0530-1067-11eb-a1ba-333704aff6af', 'formcurr', 1602835258, 5)
ON DUPLICATE KEY UPDATE
                     time = VALUES(time),
                     numderBot = VALUES(numderBot);

-- Query to select from callBotsArr where numderBot > 3 ordered by numderBot
SELECT *
FROM callBotsArr
WHERE numderBot > 3
ORDER BY numderBot ASC;
