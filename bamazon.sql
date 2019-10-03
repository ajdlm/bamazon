DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INT(10) NOT NULL AUTO_INCREMENT,
    
    product_name VARCHAR(50) NOT NULL,
    
    department_name VARCHAR(50) NOT NULL,
    
    price FLOAT(10,2) NOT NULL,
    
    stock_quantity INT(10) NOT NULL,
    
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chrono Trigger", "Video Games", 39.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dragon Quest VIII", "Video Games", 44.99, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Planescape: Torment", "Video Games", 19.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gravity's Rainbow", "Books", 9.99, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Once and Future King", "Books", 14.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Way of Kings", "Books", 14.99, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Reading in the Dark: A Novel", "Books", 13.49, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blade Runner", "Blu-ray", 8.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lawrence of Arabia", "Blu-ray", 9.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Princess Mononoke", "Blu-ray", 7.99, 18);

SELECT * FROM products;