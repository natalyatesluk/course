import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("MongoDB connection succeeded...");
    } catch (error) {
        console.error("MongoDB database connection error:", error);
    }
};

export default connectToDB;