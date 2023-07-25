import mongoose from "mongoose";
import dbConfig from "../../config/database.js";

const connectDB = async () => {
    // Database connection
    try {
        const conn = await mongoose.connect(dbConfig.dbURL, {
            dbName: "justpantry",
            user: "admin-akash",
            pass: dbConfig.dbPass,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;