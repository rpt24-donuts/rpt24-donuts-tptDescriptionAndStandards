DROP DATABASE IF EXISTS standards_and_descriptions;
CREATE DATABASE standards_and_descriptions;

CREATE TABLE products(
  id SERIAL,
  description TEXT NOT NULL,
  page_length int,
  answer_key_included BOOLEAN,
  teaching_duration varchar(50),
  PRIMARY KEY (id)
);

CREATE TABLE standards(
  id SERIAL,
  standard varchar(255) NOT NULL,
  description TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE  standards_to_products(
  id SERIAL,
  product_id int, FOREIGN KEY (product_id) REFERENCES products(id),
  standards_id int, FOREIGN KEY (standards_id) REFERENCES standards(id),
  PRIMARY KEY (id)
);
