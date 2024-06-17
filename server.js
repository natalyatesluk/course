import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import dotenv from "dotenv";
import connectToDB from "./models/DB_conection.js";
import router from "./routes/router.js";

const app = express();

dotenv.config();

// Розміщення статичних файлів (наприклад, HTML, CSS, JS)
app.use( express.static('public'));

// Підключення роутера
app.use(router);



const startServer = async () => {
    try {
        await connectToDB();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Express server startup error:", error);
    }
};

startServer();

