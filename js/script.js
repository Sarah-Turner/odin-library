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

function createRow(title, author, pages, read) {
    const tableBody = document.querySelector("tbody");
    const tableRow = document.createElement("tr");
    const titleCell = document.createElement("td");
    const authorCell = document.createElement("td");
    const pagesCell = document.createElement("td");
    const readCell = document.createElement("td");
    const toggleReadCell = document.createElement("td");
    const readBtn = document.createElement("button");
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    
    titleCell.textContent = title;
    authorCell.textContent = author;
    pagesCell.textContent = pages;
    readCell.textContent = (read)? "Read" : "Not Read";
    readBtn.textContent = "Toggle Read";
    deleteBtn.textContent = "Delete"

    toggleReadCell.appendChild(readBtn);
    deleteCell.appendChild(deleteBtn);
    tableRow.appendChild(titleCell);
    tableRow.appendChild(authorCell);
    tableRow.appendChild(pagesCell);
    tableRow.appendChild(readCell);
    tableRow.appendChild(toggleReadCell);
    tableRow.appendChild(deleteCell);
    tableBody.appendChild(tableRow);
}

function displayBooks() {
    for (let book of myLibrary) {
        createRow(book.title, book.author, book.pages, book.read);
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