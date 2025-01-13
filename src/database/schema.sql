CREATE DATABASE tx_test;
USE tx_test;

CREATE TABLE tx (
    id VARCHAR(255) PRIMARY KEY,
    amount VARCHAR(10) NOT NULL,
    txId VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);


-- INSERT INTO tx (id, amount, txId)
-- VALUES
-- ("ASDASDASD", "1", "ASDASDASD");
