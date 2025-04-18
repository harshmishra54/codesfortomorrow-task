-- schema.sql

-- Table 1: categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Table 2: services
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Table 3: service_price_options
CREATE TABLE service_price_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT,
    duration VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    type VARCHAR(255),
    FOREIGN KEY (service_id) REFERENCES services(id)
);
