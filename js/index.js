let books = [
  {
    id: "3",
    title: `Apple.Computer Evolution`,
    author: "Vladimir Nevrozov",
    img: ``,
    plot: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque molestias veniam, doloribus a accusantium sunt?`,
  },
  {
    id: "2",
    title: `Huawei.Computer Evolution`,
    author: "Vlad Nevrozov",
    img: ``,
    plot: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque molestias veniam, doloribus a accusantium sunt?`,
  },
  {
    id: "1",
    title: `Lenovo.Computer Evolution`,
    author: "Vladimi Nevrozov",
    img: ``,
    plot: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque molestias veniam, doloribus a accusantium sunt?`,
  },
  {
    id: "1",
    title: `Lenovo.Computer Evolution`,
    author: "Vladim Nevrozov",
    img: ``,
    plot: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque molestias veniam, doloribus a accusantium sunt?`,
  },
];

const root = document.querySelector("#root");
console.log(root);

const firstDiv = document.createElement("div");
firstDiv.classList.add("leftDiv");
const secondDiv = document.createElement("div");
secondDiv.classList.add("rightDiv");
root.append(firstDiv, secondDiv);

const title = document.createElement("h1");
title.textContent = "Library";
const list = document.createElement("ul");
firstDiv.append(title, list);

function renderList() {
  const markup = books
    .map(({ id, title }) => {
      return `<li id='${id}'><p>${title}</p></li>`;
    })
    .join("");
  list.insertAdjacentHTML("afterbegin", markup);
}

renderList();
