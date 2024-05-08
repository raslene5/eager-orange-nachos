CREATE DATABASE orange;
USE orange;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role ENUM('projectmanager', 'it', 'member') NOT NULL
);

CREATE INDEX idx_email ON users(email);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  project_manager_id INT NOT NULL,
  member_email VARCHAR(50) NOT NULL,
  FOREIGN KEY (project_manager_id) REFERENCES users(id),
  CONSTRAINT fk_projects_users FOREIGN KEY (member_email) REFERENCES users(email)
);

CREATE TABLE meeting_rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE shared_desk_areas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE private_offices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  room_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  chairs_needed INT NOT NULL,
  tables_needed INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

/*users insertion*/
insert into users values (1,'admin@orange.tn', '123', 'it');
insert into users values (2,'projectmanager@orange.tn', '123', 'projectmanager');
insert into users values (3,'member1@orange.tn', '123', 'member');
insert into users values (4,'member2@orange.tn', '123', 'member');
insert into users values (5,'member3@orange.tn', '123', 'member');

/*projects insertion*/
insert into projects values(1,'project1', 2, 'member1@orange.tn');
insert into projects values(2,'project2', 2, 'member1@orange.tn');
insert into projects values(5,'project55', 2, 'member2@orange.tn');

/*rooms insertion*/
INSERT INTO meeting_rooms (name, capacity) VALUES
('Meeting Room 1', 6),
('Meeting Room 2', 8);

/*shared_desk_areas insertion*/
INSERT INTO shared_desk_areas (name, capacity) VALUES
('Shared Desk Area 1', 10),
('Shared Desk Area 2', 12);

/*sprivate_offices insertion*/
INSERT INTO private_offices (name, capacity) VALUES
('Private Office 1', 4),
('Private Office 2', 6);

select * from bookings;
select * from meeting_rooms;
select * from projects;
select * from users;
select * from shared_desk_areas;
select * from sprivate_offices;