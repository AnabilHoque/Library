let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    /* One way of doing of definining a function for an object, Object Literal
    this.info = function() {
        return `${this.title} by ${this.author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`;
    }*/
}

// Object.getPrototypeOf(myBook) === Book.prototype -> true
// note value of Object Constructor's .prototype property contains prototype object

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
}

Book.prototype.getTitle = function() {
    return this.title;
}

Book.prototype.getAuthor = function() {
    return this.author;
}

Book.prototype.getPages = function() {
    return this.pages;
}

Book.prototype.getRead = function() {
    return this.read;
}

function getTableRecords() {
    const tableBody = document.querySelector("tbody");
    const numRows = tableBody.rows.length;
    const allRows = tableBody.rows;
    for (let i = 0; i < numRows; i++) {
        // access individual row children elements
        const elemsInRow = Array.from(allRows[i].children);
        const [title, author, pages, readText, remove] = elemsInRow.map((elem) => elem.textContent);
        const read = readText === "Read" ? true : false;
        const book = new Book(title, author, pages, read);
        myLibrary.push(book);
    }
}

function updateInformationSection() {
    let numBooks = 0;
    let numBooksRead = 0;
    let numBooksNotRead = 0;
    let totalPagesRead = 0;

    const numBooksSpan = document.querySelector("#num-books");
    const numBooksReadSpan = document.querySelector("#num-books-read");
    const numBooksNotReadSpan = document.querySelector("#num-books-not-read");
    const totalPagesReadSpan = document.querySelector("#total-pages-read");

    for (let i = 0; i < myLibrary.length; i++) {
        numBooks++;
        const currBook = myLibrary[i];
        if (currBook.getRead()) {
            numBooksRead++;
        } else {
            numBooksNotRead++;
        }
        totalPagesRead += (parseInt(currBook.getPages()));
    }

    numBooksSpan.textContent = numBooks;
    numBooksReadSpan.textContent = numBooksRead;
    numBooksNotReadSpan.textContent = numBooksNotRead;
    totalPagesReadSpan.textContent = totalPagesRead;
}

function removeFromMyLibrary(rowIdxInArr) {
    myLibrary.splice(rowIdxInArr, 1);
}

function addRemoveEventListeners() {
    // adds remove event listener for existing books
    const arrRemoveBtns = Array.from(document.querySelectorAll(".remove-button"));
    arrRemoveBtns.forEach(btn => btn.addEventListener("click", e => {
        const tableDataButton = e.target.parentElement;
        const tableDataRowBook = tableDataButton.parentElement;
        const rowIdxInArr = tableDataRowBook.rowIndex-1; // -1, as 1st table row is for the headings which is not in myLibrary
        removeFromMyLibrary(rowIdxInArr);
        tableDataRowBook.remove();
    }));
} 

function run() {

    let modal = document.querySelector("#myModal");
    let modalBtn = document.querySelector(".add-book button");
    let closeSpan = document.querySelector(".close");
    let modalForm = document.querySelector(".modal-content form");

    // user clicks modal button, open modal
    modalBtn.addEventListener("click", e => {
        modal.style.display = "block";
    });

    // clicking on span X, close modal
    closeSpan.addEventListener("click", e => {
        modal.style.display = "none";
    });

    // clicking anywhere outside modal, close modal
    window.addEventListener("click", e => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // submit event
    modalForm.addEventListener("submit", e => {
        e.preventDefault();
        const form = e.target;
        const allFormElems = Array.from(form.elements);
        console.log(allFormElems[0].value);
        form.reset();
    });

    // get existing books
    getTableRecords();
    updateInformationSection();

    // add remove event listeners for existing table rows <=> existing books
    addRemoveEventListeners();

    // add read toggle event listeners for existing table rows <=> existing books
}

run();
