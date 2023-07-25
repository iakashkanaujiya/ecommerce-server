"use strict";
import dotenv from 'dotenv';
dotenv.config();

[
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_NUMBER",
    "PAYTM_MID",
    "PAYTM_MKEY"
].forEach(val => {
    if(!process.env[val]){
        throw new Error(`${val} env variable is missing`);
    }
});

const authConfig = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    twilioSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioNumber: process.env.TWILIO_NUMBER,
    paytmMid: process.env.PAYTM_MID,
    paytmMKey: process.env.PAYTM_MKEY,
};

export default authConfig;