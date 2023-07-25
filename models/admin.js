import mongoose from "mongoose";
import { createHmac } from "crypto";
import { v1 as uuidv1 } from "uuid";

// Admin userSchema
const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    encry_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

adminSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

adminSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },
    securePassword: function (plainPassword) {
        if (!plainPassword) return "";
        try {
            return createHmac("sha256", this.salt)
                .update(plainPassword)
                .digest("hex");
        } catch (error) {
            return "";
        }
    }
};

export default mongoose.model("Admin", adminSchema);