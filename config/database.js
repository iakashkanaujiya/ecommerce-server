"use strict";
import dotenv from 'dotenv';
dotenv.config();

[
    "DB_URL",
    "DB_PASS",
].forEach(val => {
    if (!process.env[val]) {
        throw new Error(`${val} env variable is missing`);
    }
});

const dbConfig = {
    dbURL: process.env.DB_URL,
    dbPass: process.env.DB_PASS
};

export default dbConfig;