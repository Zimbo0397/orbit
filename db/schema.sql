CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,
    deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name)
VALUES ('admin');
INSERT INTO roles (name)
VALUES ('head');
INSERT INTO roles (name)
VALUES ('accountant');
INSERT INTO roles (name)
VALUES ('management');
INSERT INTO roles (name)
VALUES ('member');


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    phone2 VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    deleted BOOLEAN  DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE areas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    electricity_meter VARCHAR(255) NOT NULL,
    deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE areas_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    area INT NOT NULL,
    user INT NOT NULL,
    deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (area) REFERENCES areas(id),
    FOREIGN KEY (user) REFERENCES users(id)
);

CREATE TABLE coop_expenses_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coop_expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    expenses_type INT NOT NULL,
    description VARCHAR(255) NULL,
    deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (expenses_type) REFERENCES coop_expenses_types(id)
);

CREATE TABLE payments_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    payment_type_id INT NOT NULL,
    area_id INT NOT NULL,
    FOREIGN KEY (payment_type_id) REFERENCES payments_types(id),
    FOREIGN KEY (area_id) REFERENCES areas(id),
    deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incomes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    payment_type INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    area_id INT NOT NULL,
    deleted BOOLEAN DEFAULT false,
    FOREIGN KEY (area_id) REFERENCES areas(id),
    FOREIGN KEY (payment_type) REFERENCES payments_types(id)
);

INSERT INTO areas (address, electricity_meter)
VALUES ('центральна 8', '0');

INSERT INTO users (description, name, phone, phone2, email, password, role_id)
VALUES ('', 'Віталій', '09373636536', '', 'email@email', '$2b$10$59z.Iy29z6xVLEG0f1HI.O22yVMOYkRecYBQzrV19E2RFjhokQ6.i', 1);


INSERT INTO coop_expenses_types (title)
VALUES ('Розрахунок за світло');

INSERT INTO coop_expenses_types (title)
VALUES ('Оплата за розчистку снігу');

INSERT INTO coop_expenses_types (title)
VALUES ('Ремонт обладнання');

INSERT INTO payments_types (title)
VALUES ('Членські внески');

INSERT INTO payments_types (title)
VALUES ('Оплата за електроенергію');



-- SELECT types.title, expenses.amount FROM `coop_expenses_coop_expenses_types` as relations
-- JOIN coop_expenses_types as types
-- ON relations.expenses_type = types.id
-- JOIN coop_expenses AS expenses
-- ON relations.expense_id = expenses.id
