import Admin from "../models/admin.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

export const adminSignup = (req, res) => {
    const admin = new Admin(req.body);
    admin.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Signup failed, please try again"
            });
        } else {
            return res.json(user);
        }
    });
};

const generateAccessToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
};

export const adminSignin = (req, res) => {
    const { email, password } = req.body;

    Admin.findOne({ email }, (err, user) => {
        if (err || !user) return res.status(400).json({
            error: "No user account exists"
        });

        if (!user.authenticate(password)) return res.status(403).json({
            error: "Email or Password don't match"
        });

        const token = generateAccessToken(user._id);
        res.cookie("token", token, { maxAge: 25 * 60 * 60 * 1000 });
        const { _id, firstname, lastname, email, role } = user;
        return res.json({ user: { _id, firstname, lastname, email, role }, token: token });
    });
};

export const adminSignout = (req, res) => {
    res.clearCookie("token");
    return res.json({message: "User Sign Out"});
}

export const isAdminSignedIn = expressJwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth"
});

export const isAdminAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "Session expired"
        });
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({error: "You're not allowed, please contact admin"});
    }
    next();
};