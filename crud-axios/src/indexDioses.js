const url2 = "http://localhost:5555/dioses/";

const d2 = document;
const table2 = d2.querySelector(".crud-table-dioses");
const from2 = d2.querySelector(".crud-from-dioses");
const title2 = d2.querySelector(".crud-title-dioses");
const template2 = d2.querySelector("#crud-template-dioses").content;
const fragment2 = d2.createDocumentFragment();

/**
 * Metodo para consultar la data de los santos de Athena, y pintarlos en pantalla
 */
 const getAll2 = async () => {
  try {
    let res = await axios.get(url2);
    let json = await res.data;

    json.forEach((el) => {
      template2.querySelector(".name").textContent = el.nombre;
      template2.querySelector(".constellation").textContent = el.de;
      template2.querySelector(".edit").dataset.id = el.id;
      template2.querySelector(".edit").dataset.name = el.nombre;
      template2.querySelector(".edit").dataset.constellation = el.de;
      template2.querySelector(".delete").dataset.id = el.id;

      let clonetemplate2 = d2.importNode(template2, true);
      fragment2.appendChild(clonetemplate2);
    });

    table2.querySelector("tbody").appendChild(fragment2);
  } catch(err) {
    errorPeticion2(err);
  }
};

/**
 * Metodo para Crear nuevos santos mediarte ajax y el método POST o editar un santo con el método PUT
 * @param {event} event
 */
const addDios = async (event) => {
  if (event.target === from2) {
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
        let res = await axios(url2, options);

        location.reload();
      } catch (err) {
        errorPeticion2(err);
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
        let res = await axios(url2 + event.target.id.value, options);

        location.reload();
      } catch (err) {
        errorPeticion2(err);
      }
    }
  }
}

/**
 * Método para editar un santo Mediante el métood PUT o eliminarlo Mediante el método DELETE
 * @param {event} event
 */
const editDios = async (event) => {
  if (event.target.matches(".edit")) {
    title2.textContent = "Editar santo";
    from2.nombre.value = event.target.dataset.name;
    from2.constelacion.value = event.target.dataset.constellation;
    from2.id.value = event.target.dataset.id;
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
        let res = await axios(url2 + event.target.dataset.id, options);
        
        location.reload();
      } catch (err) {
        errorPeticion2(err);
      }
    }
  }
};

const errorPeticion2 = (err) => {
  let message = err.statusText || "Ocurrió un error";
  table2.insertAdjacentHTML(
    "afterend",
    `<p><b>Error ${err.status}:${message}</b></p>)`
  );
};
/**
 * Captura del evento de actualización de paguina para cagar la data
 */
d2.addEventListener("DOMContentLoaded", getAll2);
/**
 * Captura del event del boton de crear o editar
 */
d2.addEventListener("submit", (event) => addDios(event));
/**
 * Captura del event del boton de editar y eliminar un santo.
 */
d2.addEventListener("click", (event) => editDios(event));
