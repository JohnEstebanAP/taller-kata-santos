import "@styles/main.css";
import "@styles/vapor.css";
import "@assets/db.json";

const  d = document;
const container = d.querySelector(".container");
const table = d.querySelector(".crud-table");
const from = d.querySelector(".crud-from");
const title = d.querySelector(".crud-title"); 
const template = d.querySelector("#crud-template").content;

const fragment = d.createDocumentFragment();
const xhr = new XMLHttpRequest("xhr");
var $xhr = d.querySelector(".container");

// pratica de conectivida con ajax 🤓
(() => {

  xhr.addEventListener("readystatechange", (e) => {
    //para que se ejecute una sola bes y no 4 beses del ciclo de vida
    if (xhr.readyState !== 4) return;

    //berificamos las repuestas correctas.
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      llenarData(json);
    } else {
      let message = xhr.statusText || "Ocurrió un error";
      console.log(`Error ${xhr.status}: ${message}`);
      $xhr.innerHTML =  `Error ${xhr.status}: ${message}`;
    }
  });

  const url = "http://jsonplaceholder.typicode.com/users";
  // const url = "assets/db.json";
  const method = "GET";
  xhr.open(method || "GET", url);
  xhr.send();
})();

const llenarData = (res) => {
  console.log(res);

  res.forEach((el) => {
    const li = d.createElement("li");
    li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
    container.appendChild(li);
  });
  // $xhr.appendChild(container);
  // container.querySelector("tbody").appendChild(fragment);
};
