CREATE TABLE users (
    id VARCHAR(36) NOT NULL PRIMARY KEY ,
    fullName VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    activeStatus INT NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE customers (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    activeStatus INT NOT NULL DEFAULT 1,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    createdBy VARCHAR(50) NOT NULL,
    updatedBy VARCHAR(50) NOT NULL
);

CREATE TABLE merchants (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    userId VARCHAR(50) NOT NULL,
    activeStatus INT NOT NULL DEFAULT 1,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    createdBy VARCHAR(50) NOT NULL,
    updatedBy VARCHAR(50) NOT NULL
);


CREATE TABLE roles (
    id VARCHAR(36) NOT NULL PRIMARY KEY DEFAULT (uuid()),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL UNIQUE,
    activeStatus INT NOT NULL DEFAULT 1,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);

CREATE TABLE user_role (
    id VARCHAR(50) NOT NULL PRIMARY KEY ,
    userId VARCHAR(255) NOT NULL,
    roleId VARCHAR(255) NOT NULL,
    status INT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (roleId) REFERENCES roles(id),
);

CREATE TABLE orders (
    id VARCHAR(50) NOT NULL PRIMARY KEY ,
    createdBy VARCHAR(50) NOT NULL,
    customerId VARCHAR(50) NOT NULL,
    updatedBy VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    merchantId VARCHAR(50) NOT NULL,
    status INT NOT NULL,
    orderDate TIMESTAMP NOT NULL
);

CREATE TABLE products (
    id VARCHAR(50) NOT NULL PRIMARY KEY ,
    createdBy VARCHAR(50) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    updatedBy VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    status INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    unit VARCHAR(20),
    merchantId VARCHAR(50) NOT NULL
);

CREATE TABLE order_product (
    id VARCHAR(50) NOT NULL PRIMARY KEY ,
    orderId VARCHAR(50) NOT NULL,
    productId VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(20)
);

CREATE TABLE storage (
    id VARCHAR(50) NOT NULL PRIMARY KEY ,
    productId VARCHAR(50) NOT NULL,
    total INT NOT NULL,
    remaining INT NOT NULL
);

CREATE TABLE storage_history (
    id VARCHAR(50) NOT NULL PRIMARY KEY,
    productId VARCHAR(50) NOT NULL,
    status INT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    hisType VARCHAR(20) NOT NULL,
    createdBy VARCHAR(50) NOT NULL,
    hisDate TIMESTAMP NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(20),
    updatedBy VARCHAR(50) NOT NULL
);


asdasdasd
