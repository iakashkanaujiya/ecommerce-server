import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    image: {
        type: Object,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
