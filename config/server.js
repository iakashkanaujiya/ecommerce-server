"use strict";
import dotenv from 'dotenv';
dotenv.config();

[
    "HOSTNAME",
    "PORT"
].forEach(val => {
    if (!process.env[val]) {
        throw new Error(`${val} env variable is missing`);
    }
});

const serverConfig = {
    hostname: process.env.HOSTNAME,
    port: process.env.PORT
};

export default serverConfig;