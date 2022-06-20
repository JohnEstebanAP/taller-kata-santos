const listModel = (list, tasks) => {
  const lista = `
              <li>
                <div id="${list.id}" class="modal">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">${list.name}</h5>
                        <button
                          id="${list.id}"
                          value = "${list.id}"
                          type="button"
                          class="btn-delete-list btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <button type="button" class="boton-agregar">
                          Agregar una tarea
                        </button>
                        <ul class="lista-tareas">
                          ${tasks}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
`;

  return lista;
};

export default listModel;



































                      // <div class="modal-footer">
                      //   <button
                      //     type="button"
                      //     class="boton-limpiar btn btn-primary"
                      //   >
                      //     Limpiar todo
                      //   </button>
                      // </div>
