import { createPrewievMarkup, createFormMarkup } from "./markupCreators.js";
import { getBooks, setBooks } from "./utilities.js";
const root = document.querySelector("#root");
// console.log(root);

const firstDiv = document.createElement("div");
firstDiv.classList.add("leftDiv");
const secondDiv = document.createElement("div");
secondDiv.classList.add("rightDiv");
root.append(firstDiv, secondDiv);

const title = document.createElement("h1");
title.textContent = "Library";
const list = document.createElement("ul");
const addButton = document.createElement("button");
addButton.textContent = "Add book";
firstDiv.append(title, list, addButton);

addButton.addEventListener("click", addBook);

function renderList() {
  const books = getBooks();
  const markup = books
    .map(({ id, title }) => {
      return `<li id='${id}'><p class='book-title'>${title}</p><button class='delete'>Delete</button><button class='edit'>Edit</button></li>`;
    })
    .join("");
  // list.innerHTML = ''
  // list.insertAdjacentHTML("afterbegin", markup);
  list.innerHTML = markup;
  // const titles = document.querySelectorAll(".book-title");
  // titles.forEach((title) => title.addEventListener("click", renderPrewiev));
  // const deleteBtns = document.querySelectorAll(".delete");
  // deleteBtns.forEach((btn) => btn.addEventListener("click", deleteBook));
}

list.addEventListener("click", handleClick);

function handleClick({ target }) {
  if (target.nodeName === "P") {
    renderPrewiev(target);
  } else if (target.classList.contains("delete")) {
    deleteBook(target);
  } else if (target.classList.contains("edit")) {
    editBook(target);
  }
}

renderList();

//  рендер розмітки

function renderPrewiev(target) {
  const books = getBooks();
  const bookTitle = target.textContent;
  const book = books.find(({ title }) => title === bookTitle);
  const markup = createPrewievMarkup(book);
  // console.log(markup);
  secondDiv.innerHTML = markup;
}

// створення розмітки

// видалення книжки

function deleteBook(target) {
  const bookId = target.parentNode.id;
  const books = getBooks();
  const updatedBooks = books.filter(({ id }) => bookId !== id);
  setBooks(updatedBooks);

  renderList();
  const bookInfo = document.querySelector(".book-info");
  if (bookInfo && bookInfo.dataset.id === bookId) {
    secondDiv.innerHTML = "";
  }
}

// додавання книжки

function addBook() {
  const books = getBooks();
  const newBook = {
    id: String(Date.now()),
    title: "",
    author: "",
    img: "",
    plot: "",
  };
  secondDiv.innerHTML = createFormMarkup(newBook);

  fillObject(newBook);
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log(newBook);
    books.push(newBook);
    setBooks(books);
    renderList();
    const markup = createPrewievMarkup(newBook);
    secondDiv.innerHTML = markup;
  });
}

//створення розмітки форми

function fillObject(book) {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) =>
    input.addEventListener("change", (event) => {
      book[event.target.name] = event.target.value;
    })
  );
}

function editBook(target) {
  const books = getBooks();
  const bookId = target.parentNode.id;
  const book = books.find(({ id }) => id === bookId);
  console.log(book);
  secondDiv.innerHTML = createFormMarkup(book);
  fillObject(book);

  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(book);
    const index = books.findIndex(({ id }) => id === bookId);
    // console.log(index);
    books[index] = book;
    setBooks(books);
    renderList();
    const markup = createPrewievMarkup(book);
    secondDiv.innerHTML = markup;
  });
}
