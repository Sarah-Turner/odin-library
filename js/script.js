const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the new operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    if (read) {
        return `${title} by ${author}, ${pages} pages, read`
    } else {
        return `${title} by ${author}, ${pages} pages, not read yet`
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    for (let book of myLibrary) {
        const tableBody = document.querySelector("tbody");
        const tableRow = document.createElement("tr");
        const title = document.createElement("td");
        const author = document.createElement("td");
        const pages = document.createElement("td");
        const read = document.createElement("td");
        const toggleReadCell = document.createElement("td");
        const readBtn = document.createElement("button");
        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;
        readBtn.textContent = "Toggle Read";
        deleteBtn.textContent = "Delete"

        toggleReadCell.appendChild(readBtn);
        deleteCell.appendChild(deleteBtn);
        tableRow.appendChild(title);
        tableRow.appendChild(author);
        tableRow.appendChild(pages);
        tableRow.appendChild(read);
        tableRow.appendChild(toggleReadCell);
        tableRow.appendChild(deleteCell);
        tableBody.appendChild(tableRow);
    }
}

// pre-existing data
let book1 = new Book("Limited Wish", "Mark Lawrence", 222, true);
let book2 = new Book("The Light of All That Falls", "James Islington", 864, true);
let book3 = new Book("All Systems Red", "Martha Wells", 144, false);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

displayBooks();