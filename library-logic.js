function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    /* One way of doing of defining function
    this.info = function() {
        return `${this.title} by ${this.author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`;
    }*/
}

function run() {
    let myLibrary = [];

    let modal = document.querySelector("#myModal");
    let modalBtn = document.querySelector(".add-book button");
    let span = document.querySelector(".close");

    // user clicks modal button, open modal
    modalBtn.addEventListener("click", e => {
        modal.style.display = "block";
    });

    // clicking on span X, close modal
    span.addEventListener("click", e => {
        modal.style.display = "none";
    });

    // clicking anywhere outside modal, close modal
    window.addEventListener("click", e => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

}

run();
