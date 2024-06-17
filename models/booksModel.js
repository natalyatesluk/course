import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        genre: {
            type: String,
        },
        format: {
            type: String,
        },
        price: {
            type: Number,
        },
        bookAbstract: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
