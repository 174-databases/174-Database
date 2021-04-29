CREATE TABLE CUSTOMER (
    ID          int     NOT NULL,
    firstName   varchar(50),
    lastName    varchar(50),
    email       varchar(255),
    password    varchar(150),
    PRIMARY KEY (ID)
)   CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_unicode_520_ci';

CREATE TABLE ITEM (
    SKU         int     NOT NULL, 
    price       DEC(10,2),
    quantity    int,
    details     varchar(255),
    stockCount  int,
    PRIMARY KEY (SKU)
)   CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_unicode_520_ci';

CREATE TABLE BUYS (
    ID        int       NOT NULL,  
    SKU       int       NOT NULL,
    PRIMARY KEY (ID, SKU),
    FOREIGN KEY (ID) REFERENCES CUSTOMER(ID),
    FOREIGN KEY (SKU) REFERENCES ITEM(SKU)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)   CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_unicode_520_ci';

CREATE TABLE FOOD (
    SKU         int     NOT NULL, 
    orderNum    int,   
    PRIMARY KEY (SKU),
    FOREIGN KEY (SKU) REFERENCES ITEM(SKU)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)   CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_unicode_520_ci';

CREATE TABLE PIZZA (
    SKU         int     NOT NULL,
    type        varchar(50),
    PRIMARY KEY (SKU),
    FOREIGN KEY (SKU) REFERENCES FOOD(SKU)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)   CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_unicode_520_ci';

CREATE TABLE CLOTHING (
    SKU     int     NOT NULL,  
    size    varchar(1),
    PRIMARY KEY (SKU),
    FOREIGN KEY (SKU) REFERENCES ITEM(SKU)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)   CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_unicode_520_ci';

CREATE TABLE SHIRT (
    SKU     int     NOT NULL,  
    color   varchar(50),
    PRIMARY KEY (SKU),
    FOREIGN KEY (SKU) REFERENCES CLOTHING(SKU)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)   CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_unicode_520_ci';

CREATE TABLE COMPUTER (
    SKU        int     NOT NULL,  
    brand      varchar(255),
    isLaptop   boolean,
    PRIMARY KEY (SKU),
    FOREIGN KEY (SKU) REFERENCES ITEM(SKU)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
)   CHARACTER SET 'utf8mb4'
    COLLATE 'utf8mb4_unicode_520_ci';


-- Insert
INSERT INTO CUSTOMER('id', 'firstName', 'lastName', 'email', 'password') VALUES('100', 'John', 'Smith', 'jsmith@gmail.com', 'P@ssW0rD');