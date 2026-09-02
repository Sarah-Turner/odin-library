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

function removeBookFromLibrary(bookId) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookId) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}

function toggleReadStatus(bookId) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookId) {
            myLibrary[i].read = (myLibrary[i].read)? false : true;
            break;
        }
    }
}

function updateReadCell(bookId, readCell) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookId) {
            if (myLibrary[i].read) {
                readCell.textContent = "Read";
            } else {
                readCell.textContent = "Not Read";
            }
            break;
        }
    }
}

function createRow(book) {
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
    
    tableRow.setAttribute("data-book-id", book.id);
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    readCell.textContent = (book.read)? "Read" : "Not Read";
    readBtn.textContent = "Toggle Read";
    readBtn.classList.add("read-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

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

function clearTable() {
    const tableBody = document.querySelector("tbody");
    while (tableBody.firstChild)
    tableBody.removeChild(tableBody.firstChild);
}

function displayBooks() {
    clearTable();
    for (let book of myLibrary) {
        createRow(book);
    }
}

document.addEventListener("click", (event) => {
    let target = event.target;
    let tableRow;
    let bookId;
    switch(target.className) {
        case "delete-btn":
            tableRow = target.parentElement.parentElement;
            bookId = tableRow.dataset.bookId;
            removeBookFromLibrary(bookId);
            tableRow.remove();
            break;
        case "read-btn":
            tableRow = target.parentElement.parentElement;
            bookId = tableRow.dataset.bookId;
            toggleReadStatus(bookId);
            updateReadCell(bookId, tableRow.children[3]);
            break;
    }
});

const formSubmit = document.querySelector("button.form-submit-btn");
formSubmit.addEventListener("click", (event) => {
    let title = document.querySelector("input[name='title']");
    let author = document.querySelector("input[name='author']");
    let pages = document.querySelector("input[name='pages']");
    let read = document.querySelector("input[name='read']:checked");
    if (title === null || author === null || pages === null || read === null) {
        return;
    }
    addBookToLibrary(title.value, author.value, pages.value, read.value);
    displayBooks();
});

const dialogBtn = document.querySelector("button.dialog-btn");
dialogBtn.addEventListener("click", () => {
    document.querySelector("form").reset(); // clear form for next book
});

/* pre-existing test data
let book1 = new Book("Limited Wish", "Mark Lawrence", 222, true);
let book2 = new Book("The Light of All That Falls", "James Islington", 864, true);
let book3 = new Book("All Systems Red", "Martha Wells", 144, false);
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);

displayBooks();
displayBooks();
*/