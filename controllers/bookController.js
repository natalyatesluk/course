import Book from "../models/booksModel.js";

export const saveBook = async (req, res) => {
    try {
        const {
            _id,
            name,
            author,
            genre,
            format,
            price,
            bookAbstract
        } = req.body;
        console.log(`Received bookAbstract: ${req.body.bookAbstract}`); 
        // Check if _id is provided, if not, create a new book
        if (!_id) {
            const newBook = new Book({
                name,
            author,
            genre,
            format,
            price,
            bookAbstract
            });

            newBook
                .save()
                .then(() => {
                    console.log("Data saved to database:", newBook);
                    res.json(newBook);
                })
                .catch((err) => {
                    console.error("Error saving data to database:", err);
                    res.status(500).json({
                        success: false,
                        error: err.message,
                    });
                });
        } else { // Otherwise, update the existing book
            const book = {
                name,
                author,
                genre,
                format,
                price,
                bookAbstract
            };

            Book.findByIdAndUpdate(_id, book, { new: true })
                .then((updatedBook) => {
                    if (!updatedBook) {
                        return res.status(404).json({
                            success: false,
                            message: "Book not found",
                        });
                    }
                    console.log("Book updated successfully:", updatedBook);
                    res.json({ success: true, book: updatedBook });
                })
                .catch((error) => {
                    console.error("Error updating book:", error);
                    res.status(500).json({
                        success: false,
                        error: "Internal server error",
                    });
                });
        }

    } catch (error) {
        console.log(error);
    }
};

export const getAllBooks = async (req, res) => {
    Book.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error("Error finding in database:", err);
            res.status(500).json({ success: false, error: err.message });
        });
};

export const getBookById = async (req, res) => {
    const id = req.params.id;
    Book.findById(id)
        .then((result) => res.json(result))
        .catch((err) => {
            console.error("Error finding in database:", err);
            res.status(500).json({ success: false, error: err.message });
        });
};

export const deleteBookById = async (req, res) => {
    const id = req.params.id;
    Book.findByIdAndDelete(id)
        .then((result) => res.json(result))
        .catch((err) => {
            console.error("Error deleting in database:", err);
            res.status(500).json({ success: false, error: err.message });
        });
};
