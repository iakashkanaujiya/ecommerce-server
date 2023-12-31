import { Address, User } from "../models/user.js";
import { Order } from "../models/order.js";

// Find the user in the databse and attach the user to the the req object 
export const getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user found in database"
            });
        } else {
            req.profile = user;
            next();
        }
    });
};

// Get the user
export const getUser = (req, res) => {
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

// Update the user
export const updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({ err: "Failed to update the profile" });
            }
            return res.json(user);
        }
    );
};

// Add user Address
export const addUserAddress = (req, res) => {
    const address = new Address(req.body);
    address.save((err, address) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "Unable to save the address" });
        } else {
            return res.json(address);
        }
    });
};

// Get user Address
export const getUserAddress = (req, res) => {
    Address.find({ user: req.profile._id })
        .sort({ "createdAt": -1 })
        .exec((err, address) => {
            if (err) {
                return res.status(400).json({ error: "No address found" });
            } else {
                return res.json(address);
            }
        });
};

// Get Address
export const getAddress = async (req, res) => {
    const { addressId } = req.query;
    Address.findById({ _id: addressId }, (err, address) => {
        if (err) {
            return res.status(400).json({ error: "Failed to load the address" });
        } else {
            address.user = undefined;
            return res.json(address);
        }
    });
};

// Update User Address
export const updateUserAddress = (req, res) => {
    const { addressId } = req.query;
    Address.findByIdAndUpdate(
        { _id: addressId },
        { $set: req.body },
        (err, address) => {
            if (err) {
                return res.status(400).json({ error: "Address updation failed" });
            } else {
                return res.json(address);
            }
        }
    );
};

// Delete user address
export const deleteUserAddress = (req, res) => {
    const { addressId } = req.query;
    Address.findByIdAndDelete({ _id: addressId }, (err, address) => {
        if (err) {
            return res.status(400).json({ error: "Failed to delete the address" });
        } else {
            return res.json(address);
        }
    });
};


// User purchased items list
export const userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id, firstname, lastname")
        .populate({
            path: "items",
            populate: {
                path: "product"
            }
        })
        .sort({ "createdAt": -1 })
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({ error: "No order in this order" });
            }
            return res.json(order);
        });
};

// Push Orders in User Purchase List
export const pushOrderInPurchaseList = (req, res) => {
    let purchases = [];
    purchases.push(req.order._id);

    //store order in the db
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchaseList) => {
            if (err) {
                return res.status(400).json({ error: "Order creation failed!" });
            } else {
                return res.json(req.order);
            }
        }
    );
};


