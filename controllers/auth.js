import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import authConfig from "../config/auth.js";

const accountSid = authConfig.twilioSid;
const authToken = authConfig.twilioAuthToken;
import twilio from 'twilio';
const client = twilio(accountSid, authToken);

const sendVerifcationCode = async (randomCode, customerPhone) => {
    return await (
        client.messages.create({
            body: `Your verification code is: ${randomCode}`,
            from: authConfig.twilioNumber,
            to: customerPhone
        })
    );
};

// Signup the user
export const signup = (req, res) => {
    // Get the cuser phone number
    const { phone } = req.body;
    // Create a verification code
    const randomCode = Math.floor(Math.random() * (10000 - 1000) + 1000);
    //Find user if already eixts
    User.findOne({ phone: phone }, (err, docs) => {
        if (err || !docs) {
            // Create new user in database
            const user = new User(req.body);
            user.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "There was an errro to process the request"
                    });
                } else {
                    sendVerifcationCode(randomCode, phone).then(message => {
                        return res.json({
                            message: message, user: user, verificationCode: randomCode
                        });
                    }).catch(err => {
                        console.log(err);
                        return res.status(400).json({
                            error: "Opps! something went wrong, Please try again"
                        });
                    });
                }
            });
        } else {
            sendVerifcationCode(randomCode, phone).then(message => {
                return res.json({
                    message: message, user: docs, verificationCode: randomCode
                });
            }).catch(err => {
                console.log(err);
                return res.status(400).json({
                    error: "Opps! something went wrong"
                });
            });
        }
    });
};

// Generate access token
const generateAccessToken = (userId) => {
    return jwt.sign({ _id: userId }, authConfig.accessTokenSecret, { expiresIn: "10d" });
}

// verify session token
export const verifySessionToken = (req, res) => {
    const { token, userId } = req.body;
    // Check whether token exists
    if (!token || !userId) {
        return res.sendStatus(401);
    }

    jwt.verify(token, authConfig.accessTokenSecret, (err, _id) => {
        if (err || userId == _id) {
            return res.sendStatus(403);
        } else {
            return res.sendStatus(200);
        }
    });
};

// Signin the user
export const signin = (req, res) => {
    // Get the User Id
    const { userId } = req.body;
    // Create token
    const token = generateAccessToken(userId);
    const refreshToken = jwt.sign({ _id: userId }, authConfig.refreshTokenSecret)
    // Save refresh token in database
    User.findByIdAndUpdate(
        { _id: userId },
        { $set: { sessionToken: refreshToken } },
        (err, user) => {
            if (err) {
                return res.status(400).json({ error: "Opps! something went wrong" });
            } else {
                // send response
                return res.json({ token, user });
            }
        }
    );
};

// Signout the user
export const signout = (req, res) => {
    const { userId } = req.prams;
    User.findByIdAndUpdate(
        { _id: userId },
        { $set: { sessionToken: null } },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "There was an error to process the request"
                });
            } else {
                // send the response
                res.json({
                    message: "User signout"
                });
            }
        }
    );
};

// Protected Routes
export const isSignedIn = expressJwt({
    secret: authConfig.accessTokenSecret,
    algorithms: ["HS256"],
    requestProperty: "auth"
});

// Check whether the user is authenticated
export const isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Session expired"
        });
    }
    next();
};