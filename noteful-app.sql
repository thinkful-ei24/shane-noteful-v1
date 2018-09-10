
--SELECT CURRENT_DATE;

DROP TABLE IF EXISTS notes;

CREATE TABLE notes(
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  content text,
  created TIMESTAMP default current_timestamp
);

ALTER SEQUENCE notes_id_seq RESTART WITH 1000;

INSERT INTO notes
  (title, content) VALUES
     ('title', 'content'), ('cat', 'content'), ('car', 'content'), ('cars', 'content'), ('dog', 'content'), ('title', '4x4') RETURNING id, title, content, created;

--exact
select * FROM notes WHERE title LIKE 'cars' LIMIT 3;
--contains
select * FROM notes WHERE title LIKE '%car%' LIMIT 3;


UPDATE notes SET title = 'truck' WHERE content = '4x4';

SELECT * FROM notes LIMIT 5;

DELETE FROM notes WHERE id = 1005;

INSERT INTO notes
  (title, content) VALUES
     ('title', '')RETURNING id, title, content, created;


SELECT * FROM notes LIMIT 5;