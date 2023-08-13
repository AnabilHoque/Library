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

Book.prototype.setPages = function(newPages) {
    this.pages = newPages;
}

Book.prototype.setRead = function(newRead) {
    this.read = newRead;
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

function toggleStatusFromMyLibrary(rowIdxInArr) {
    const newRead = !myLibrary[rowIdxInArr].getRead();
    myLibrary[rowIdxInArr].setRead(newRead);
}

function addRemoveEventListenersToExistingBooks() {
    // adds remove event listeners for existing books
    const arrRemoveBtns = Array.from(document.querySelectorAll(".remove-button"));
    arrRemoveBtns.forEach(btn => btn.addEventListener("click", addRemoveEventListener));
}

function addReadToggleEventListenersToExistingBooks() {
    // adds read toggle event listeners for existing books
    const arrStatusBtns = Array.from(document.querySelectorAll(".read-toggle"));
    arrStatusBtns.forEach(btn => btn.addEventListener("click", addReadToggleEventListener));
}

function isBookInLibrary(book) {
    // checks if a book object is already in the library, in which case returns its index, else returns -1
    for (let i = 0; i < myLibrary.length; i++) {
        if (book.getTitle() === myLibrary[i].getTitle() && book.getAuthor() === myLibrary[i].getAuthor()) {
            return i;
        }
    }
    return -1;
}

function addRemoveEventListener(e) {
    const tableDataButton = e.target.parentElement;
    const tableDataRowBook = tableDataButton.parentElement;
    const rowIdxInArr = tableDataRowBook.rowIndex-1; // -1, as 1st table row is for the headings which is not in myLibrary
    removeFromMyLibrary(rowIdxInArr); // removes from myLibrary
    tableDataRowBook.remove(); // removes from table
    updateInformationSection();
}

function addReadToggleEventListener(e) {
    const statusBtn = e.target;
    const tableDataButton = e.target.parentElement;
    const tableDataRowBook = tableDataButton.parentElement;
    const rowIdxInArr = tableDataRowBook.rowIndex-1; // -1, as 1st table row is for the headings which is not in myLibrary
    toggleStatusFromMyLibrary(rowIdxInArr);
    // change status read -> not read and not read -> read
    if (statusBtn.classList.contains("read-true")) {
        statusBtn.classList.remove("read-true");
        statusBtn.classList.add("read-false");
        statusBtn.textContent = "Not Read";
    } else {
        statusBtn.classList.remove("read-false");
        statusBtn.classList.add("read-true");
        statusBtn.textContent = "Read";
    }
    updateInformationSection();
}

function addBookToTable(book) {
    const tableBody = document.querySelector("tbody");
    let row = tableBody.insertRow();
    let titleCell = row.insertCell();
    let authorCell = row.insertCell();
    let pagesCell = row.insertCell();
    let statusCell = row.insertCell();
    let removeCell = row.insertCell();

    titleCell.textContent = book.getTitle();
    authorCell.textContent = book.getAuthor();
    pagesCell.textContent = book.getPages();
    statusCell.innerHTML = book.getRead() ? '<button type="button" class="read-toggle read-true">Read</button>' : '<button type="button" class="read-toggle read-false">Not Read</button>';
    removeCell.innerHTML = '<button type="button" class="remove-button">Remove</button>';

    // add read toggle event listener to the status read/not read button in the status cell
    statusBtn = statusCell.children[0];
    statusBtn.addEventListener("click", addReadToggleEventListener);

    // add remove event listener to the remove button in the remove cell
    removeBtn = removeCell.children[0];
    removeBtn.addEventListener("click", addRemoveEventListener);
}

function updateBookInTable(book, idx) {
    const tableBody = document.querySelector("tbody");
    const tableBodyRows = tableBody.children;
    const rowToChange = tableBodyRows[idx];
    const rowToChangeCells = rowToChange.children;
    let pagesCell = rowToChangeCells[2];
    let statusCell = rowToChangeCells[3];
    pagesCell.textContent = book.getPages();
    statusCell.innerHTML = book.getRead() ? '<button type="button" class="read-toggle read-true">Read</button>' : '<button type="button" class="read-toggle read-false">Not Read</button>';

    // add read toggle event listener to the status read/not read button in the status cell
    statusBtn = statusCell.children[0];
    statusBtn.addEventListener("click", addReadToggleEventListener);
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
        modalForm.reset();
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
        const allFormElems = Array.from(form.elements); // accesses all form elements
        const title = allFormElems[0].value;
        const author = allFormElems[1].value;
        const pages = allFormElems[2].value;
        const read = allFormElems[3].checked;

        const book = new Book(title, author, pages, read);

        // check if the book already exists in myLibrary
        const bookInLibraryAlready = isBookInLibrary(book);
        if (bookInLibraryAlready === -1) {
            // not in myLibrary already, so add
            myLibrary.push(book);
            addBookToTable(book);
        } else {
            // book is in myLibrary
            // update existing status and number of pages read
            myLibrary[bookInLibraryAlready].setPages(book.getPages());
            myLibrary[bookInLibraryAlready].setRead(book.getRead());
            updateBookInTable(book, bookInLibraryAlready);   
        }

        updateInformationSection();
        form.reset();
        modal.style.display = "none";
    });

    // get existing books
    getTableRecords();

    // add remove event listeners for existing table rows <=> existing books
    addRemoveEventListenersToExistingBooks();

    // add read toggle event listeners for existing table rows <=> existing books
    addReadToggleEventListenersToExistingBooks();

    updateInformationSection();
}

run();
