/*import "styles/main.css";
import "styles/vapor.css";
import "assets/db.json";*/

const url1 = "http://localhost:5555/santos/";
const d = document;
const container = d.querySelector(".container");
const table = d.querySelector(".crud-table");
const from = d.querySelector(".crud-from");
const title = d.querySelector(".crud-title");
const template = d.querySelector("#crud-template").content;
const fragment = d.createDocumentFragment();

// pratica de conectivida con ajax 🤓
/**
 * Método generico de ajax para crear peticionens de tipo , GET,POST,PUT, y DELETE.
 * @param {optios} options objeto de js tipo json que contiene la opcione para configorar el ajax
 */
const ajax = (options) => {
  let { url, method, llenarData, error, data } = options;
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", (e) => {
    //para que se ejecute una sola bes y no 4 beses del ciclo de vida
    if (xhr.readyState !== 4) return;

    //berificamos las repuestas correctas.
    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      llenarData(json);
    } else {
      let message = xhr.statusText || "Ocurrió un error";
      error(`Error ${xhr.status}: ${message}`);
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  /*combertimos un objeto Json a una cadena de texto js*/
  xhr.send(JSON.stringify(data));
};

/**
 * Metodo para consultar la data de los santos de Athena, y pintarlos en pantalla
 */
const getAll = () => {
  ajax({
    url: url1,
    method: "GET",
    llenarData: (res) => {
      res.forEach((el) => {
        template.querySelector(".name").textContent = el.nombre;
        template.querySelector(".constellation").textContent = el.constelacion;
        template.querySelector(".edit").dataset.id = el.id;
        template.querySelector(".edit").dataset.name = el.nombre;
        template.querySelector(".edit").dataset.constellation = el.constelacion;
        template.querySelector(".delete").dataset.id = el.id;

        let cloneTemplate = d.importNode(template, true);
        fragment.appendChild(cloneTemplate);
      });

      table.querySelector("tbody").appendChild(fragment);
    },
    error: (err) => {
      console.error("Ocurri un error", err);
      table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    },
    data: null,
  });
};

/**
 * Metodo para Crear nuevos santos mediarte ajax y el método POST o editar un santo con el método PUT
 * @param {event} event 
 */
const addSaint = (event) => {
  if (event.target === from) {
    //prevenimos el comportamiento por defecto e un formulario
    event.preventDefault();

    if (!event.target.id.value) {
      console.log(
        "create santo",
        `nombre: ${event.target.nombre.value}`,
        ` constelacion: ${event.target.constelacion.value}`
      );
      //POST
      ajax({
        url: url1,
        method: "POST",
        llenarData: (res) => location.reload(),
        error: () =>
          from.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
          nombre: event.target.nombre.value,
          constelacion: event.target.constelacion.value,
        },
      });
    } else {
      //PUT
      ajax({
        url: url1 + event.target.id.value,
        method: "PUT",
        llenarData: (res) => location.reload(),
        error: () =>
          from.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
        data: {
          nombre: event.target.nombre.value,
          constelacion: event.target.constelacion.value,
        },
      });
    }
  }
};
/**
 * Método para editar un santo Mediante el métood PUT o eliminarlo Mediante el método DELETE
 * @param {event} event 
 */
const editSaint = (event) => {
  if (event.target.matches(".edit")) {
    title.textContent = "Editar santo";
    from.nombre.value = event.target.dataset.name;
    from.constelacion.value = event.target.dataset.constellation;
    from.id.value = event.target.dataset.id;
  }

  if (event.target.matches(".delete")) {
    let isDelete = confirm(
      `¿Estás seguro de elimenar el id ${event.target.id}?`
    );

    if (isDelete) {
      //DELETE
      ajax({
        url: url1 + event.target.dataset.id,
        method: "DELETE",
        llenarData: (res) => location.reload(),
        error: () => alert(err),
      });
    }
  }
};

/**
 * Captura del evento de actualización de paguina para cagar la data
 */
d.addEventListener("DOMContentLoaded", getAll);
/**
 * Captura del event del boton de crear o editar 
 */
d.addEventListener("submit", (event) => addSaint(event));
/**
 * Captura del event del boton de editar y eliminar un santo.
 */
d.addEventListener("click", (event) => editSaint(event));
