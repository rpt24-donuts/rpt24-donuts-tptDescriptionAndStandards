DROP DATABASE IF EXISTS SandD;
CREATE DATABASE SandD;
USE SandD;
SET GLOBAL FOREIGN_KEY_CHECKS=0;

CREATE TABLE Product (ID int NOT NULL AUTO_INCREMENT, Descriptions TEXT NOT NULL, Pages int,answer_key varchar(50), teaching_dur varchar(50), PRIMARY KEY (ID));
CREATE TABLE Standards (ID int NOT NULL AUTO_INCREMENT, Standards varchar(255) NOT NULL, Description TEXT, PRIMARY KEY (ID));
CREATE TABLE SandD (ID int NOT NULL AUTO_INCREMENT,Product_id int, FOREIGN KEY (Product_id) REFERENCES Product(ID),Standards_id int, FOREIGN KEY (Standards_id) REFERENCES Standards(ID), PRIMARY KEY (ID));
--  mysql -u root -p  < schema.sql