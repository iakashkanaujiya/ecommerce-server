import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    src: {
        type: String,
        required: true,
    },
    alttext: {
        type: String,
        trim: true
    }
});

export default mongoose.model("Upload", uploadSchema);