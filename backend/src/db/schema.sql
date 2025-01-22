-- db schema:
CREATE TABLE users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE todos (
    todo_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    todo_category VARCHAR(255) NOT NULL,
    todo_title VARCHAR(255) NOT NULL,
    todo_notes VARCHAR(255),
    todo_deadline TIMESTAMP,
    todo_priority VARCHAR(255),
    todo_completed BOOLEAN NOT NULL,
    user_id INT REFERENCES users (id) 
);

-- Dummy data for first GET test:
INSERT INTO users (username, password)
VALUES ('cascabeanie', 'password');

INSERT INTO todos (todo_category, todo_title, todo_notes, todo_deadline, todo_priority, todo_completed, user_id)
VALUES ('health', 'Gym', 'workout', '2025-02-06T13:00:00.000Z', 'medium', 'FALSE', '1');