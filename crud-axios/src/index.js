const url1 = "http://localhost:5555/santos/";
const d = document;
const container = d.querySelector(".container");
const table = d.querySelector(".crud-table");
const from = d.querySelector(".crud-from");
const title = d.querySelector(".crud-title");
const template = d.querySelector("#crud-template").content;
const fragment = d.createDocumentFragment();

/**
 * Metodo para consultar la data de los santos de Athena, y pintarlos en pantalla
 */
 const getAll = async () => {
  try {
    let res = await axios.get(url1);
    let json = await res.data;

    json.forEach((el) => {
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
  } catch(err) {
    errorPeticion(err);
  }
};

/**
 * Metodo para Crear nuevos santos mediarte ajax y el método POST o editar un santo con el método PUT
 * @param {event} event
 */
const addSaint = async (event) => {
  if (event.target === from) {
    //prevenimos el comportamiento por defecto e un formulario
    event.preventDefault();

    if (!event.target.id.value) {
      //POST
      try {
        let options = {
          method: "POST",
          headers: {
            "Content-type": "application/json;charset=utf-8",
          },
          data: JSON.stringify({
            nombre: event.target.nombre.value,
            constelacion: event.target.constelacion.value,
          })
        }
        let res = await axios(url1, options);

        location.reload();
      } catch (err) {
        errorPeticion(err);
      }
    } else {
      //PUT
      try {
        let options = {
          method: "PUT",
          headers: {
            "Content-type": "application/json;charset=utf-8",
          },
          data: JSON.stringify({
            nombre: event.target.nombre.value,
            constelacion: event.target.constelacion.value,
          })
        }
        let res = await axios(url1 + event.target.id.value, options);

        location.reload();
      } catch (err) {
        errorPeticion(err);
      }
    }
  }
}

/**
 * Método para editar un santo Mediante el métood PUT o eliminarlo Mediante el método DELETE
 * @param {event} event
 */
const editSaint = async (event) => {
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
      try {
        let options = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json;charset=utf-8",
          }
        };
        let res = await axios(url1 + event.target.dataset.id, options);
        
        location.reload();
      } catch (err) {
        errorPeticion(err);
      }
    }
  }
};

const errorPeticion = (err) => {
  let message = err.statusText || "Ocurrió un error";
  table.insertAdjacentHTML(
    "afterend",
    `<p><b>Error ${err.status}:${message}</b></p>)`
  );
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
