import { openModal, closeModal } from "./modal.js";

function validateForm() {
    // A simple example, you might want more sophisticated validation
    let name = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;

    if (!name || !author || isNaN(price)) {
        alert("Please enter valid book details.");
        return false;
    }

    closeModal();

    return true;
}

// Save data to the database
function saveDataToBD(book) {
    fetch("book/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),

    })
        .then((response) => response.json())
        .then((book) => {
            console.log(book);
        })
        .then(() => getAndShowAllBooks())
        .catch((error) => {
            console.error("Error sending data:", error);
        });
}

function getAndShowAllBooks() {
    const dataContainer = document.querySelector(".data-container");
    dataContainer.innerHTML = "";

    fetch("book/all")
        .then((response) => response.json())
        .then((dataArr) => {
            dataArr.forEach((book) => {
                const bookBox = document.createElement("div");
                bookBox.classList.add("book-box");
                bookBox.innerHTML = `
                <div class="book-name">${book.name}</div>
                <div class="book-author">Author:${book.author}</div>
                <div class="book-genre">Genre:${book.genre}</div>
                <div class="book-format">Format:${book.format}</div>
                <div class="book-abstract">${book.bookAbstract}</div>
                <div class="book-price">${book.price}  &#x20b4 </div>
                <div class="book-buttons">
                    <button class="book-edit" id="edit${book._id}">Edit</button>
                    <button class="book-delete" id="delete${book._id}">Delete</button>
                </div>
                `;
                dataContainer.appendChild(bookBox);

                const editBtn = document.getElementById(`edit${book._id}`);
                editBtn.addEventListener("click", () => {
                    editBook(book._id);
                });
                const deleteBtn = document.getElementById(`delete${book._id}`);
                deleteBtn.addEventListener("click", () => {
                    deleteBook(book._id);
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

async function editBook(id) {
    // Fetch book details
    fetch(`/book/${id}`)
        .then((res) => res.json())
        .then((book) => {
            // Fill the form with the book details
            document.getElementById("bookID").value = book._id;
            document.getElementById("name").value = book.name;
            document.getElementById("author").value = book.author;
            document.getElementById("genre").value = book.genre;
            document.getElementById("format").value = book.format;
            document.getElementById("price").value = book.price;
            document.getElementById("bookAbstract").value = book.bookAbstract;
            openModal();
        })
        .catch((error) => {
            console.error("Error finding data:", error);
        });
}

async function deleteBook(id) {
    if (confirm(`Do you really want to delete this book?`)) {
        await fetch(`/book/${id}`, { method: "DELETE" })
            .catch((error) => {
                console.error("Error deleting data:", error);
            });
        getAndShowAllBooks();
    }
}

getAndShowAllBooks();

// Form submission handler
const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bookID = document.getElementById("bookID").value;
    const name = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const format = document.getElementById("format").value;
    const price = document.getElementById("price").value;
    const bookAbstract = document.getElementById("bookAbstract").value;

    console.log(`Book Abstract: ${bookAbstract}`);
    
    console.log(bookAbstract);
    const book = {
        _id: bookID,
        name: name,
        author: author,
        genre: genre,
        format: format,
        price: price,
        bookAbstract: bookAbstract,
    };
    console.log(book);
    // Send data to the server via fetch
    if (validateForm()) {
        saveDataToBD(book);
        bookForm.reset();
        document.getElementById("bookID").removeAttribute("value");
    }
});
