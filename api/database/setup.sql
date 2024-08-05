DROP TABLE IF EXISTS submission;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username TEXT,
  password TEXT,
  highscore INT,
  role TEXT,
  PRIMARY KEY(user_id)
);

CREATE TABLE characters (
  character_id INT GENERATED ALWAYS AS IDENTITY,
  character_name TEXT,
  birth_year INT,
  PRIMARY KEY(character_id)
);

CREATE TABLE events (
  event_id INT GENERATED ALWAYS AS IDENTITY,
  character_id INT,
  event_date DATE,
  event_description TEXT,
  PRIMARY KEY(event_id),
  FOREIGN KEY (character_id) REFERENCES characters(character_id)
);

CREATE TABLE answers (
  answer_id INT GENERATED ALWAYS AS IDENTITY,
  answers TEXT,
  question_id INT,
  PRIMARY KEY(answer_id)
);

CREATE TABLE question (
  question_id INT GENERATED ALWAYS AS IDENTITY,
  Question_description TEXT,
  answer_id INT,
  event_id INT,
  score INT,
  PRIMARY KEY(question_id),
  FOREIGN KEY (answer_id) REFERENCES answers(answer_id),
  FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE submission (
  submission_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT,
  question_id INT,
  outcome BOOLEAN,
  PRIMARY KEY(submission_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (question_id) REFERENCES question(question_id)
);

INSERT INTO characters (character_name, birth_year) 
VALUES ('Julius Caesar', -100); 

INSERT INTO events (character_id, event_date, event_description) 
VALUES (1, '0060-01-01', 'In 60 BCE, Rome conflicts with itself as various leaders seek control. Julius Caesar considers forming an alliance with Pompey the Great and Crassus to boost his power.');

INSERT INTO question (Question_description, answer_id, event_id, score) 
VALUES ('It is 60 BCE, Rome conflicts with itself, various leaders looking to seize control for themselves. Caesar comes up with a plan to form an alliance with another leader to boost his own power and control over the empire. Some leaders Caesar considers are Pompey the Great and Crassus. It is your job to advise him on the best course of action: a) Side with Pompey, b) Form an alliance with Crassus, c) Take the chance and form an alliance with both men.', NULL, 1, 10);

INSERT INTO answers (answers, question_id) 
VALUES 
  ('Side with Pompey, that way he gains further military power through his help.', 1),
  ('Form an alliance with Crassus to gain further wealth and influence over the land, allowing him to garner further support later.', 1),
  ('Take the chance in forming an alliance with both men which could be risky.', 1),
  ('Julius Caesar formed a Triumvirate where he was able to garner both military support and wealth through both men thus allowing him more power, dominance, and influence over Rome, eventually securing the governorship over Gaul and advancing his military career.', 1);
