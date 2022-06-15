//import Template from '@templates/Template.js';
import '@styles/main.css';
//import '@styles/vars.styl';

const botonAgregar = document.querySelector('.boton-agregar');
const listaTarea = document.querySelector('.lista-tareas');
const botonLimpiar = document.querySelector('.boton-limpiar');

botonAgregar.addEventListener('click', () =>{
  //método para agregar una tarea
  agregarTarea("");
});

botonLimpiar.addEventListener('click', ()=>{
  //método Limpiar
  limpiarTodo();
});

listaTarea.addEventListener('click', (event)=>{
  //método para eliminar una tarea
  if(event.path[0].type == 'submit'){
    eliminarTarea(event.path[1].id);
  }
});

listaTarea.addEventListener('keypress', (event)=>{
  //método editar
  if(event.keyCode == 13){
    editarTarea(event.path[1].id, event.path[0].value);

  }
});


//Local Starage
var arregloTareas = [];
var contador = 0;

const getContador = ()=>{
  return localStorage.getItem("contador");
}

const setContador = ()=>{
  localStorage.setItem("contador",contador);
}

const getArregloTareas = ()=>{
  return JSON.parse(localStorage.getItem("arregloTareas"));
}

const setArregloTareas = ()=>{
  setContador();
  localStorage.setItem("arregloTareas", JSON.stringify(arregloTareas));
  listarTareas()
}

const inicializarContador = ()=> {
  if(getContador() != null){
   contador = getContador();
  }
}

const agregarTarea = (description)=>{
  contador++;
  let objetoTarea = {
    id: contador,
    descripcion:  description
  }
  if(getArregloTareas() !=  null){
  arregloTareas = getArregloTareas();
  }

  arregloTareas.push(objetoTarea);
  setArregloTareas();
}

const eliminarTarea=(idTarea) =>{
  let datos = getArregloTareas();
  let newArreglo = [];
  if(datos != null){

    for(const tarea of datos){
      if(tarea.id != idTarea){
        newArreglo.push(tarea);
      }
    }
  }
  arregloTareas = newArreglo;
  setArregloTareas();
}

const listarTareas = () =>{
  listaTarea.innerHTML = '';
  let datos = getArregloTareas().reverse();
  for(const tarea of datos){
    listaTarea.innerHTML += `
      <li id="${tarea.id}">
        <input type="text" class="input-tarea" value ="${tarea.descripcion}">
        <button class="boton-eliminar">X</button>
      </li>
    `
  }
}

const editarTarea = (idTarea, description) => {
  let newTarea = {
    id: idTarea,
    descripcion: description
  }
  let datos = getArregloTareas();
  let newArreglo = [];
  if(datos != null){

    for(const tarea of datos){
      if(tarea.id == idTarea){
        newArreglo.push(newTarea);
      }else{
        newArreglo.push(tarea);
      }

    }
  }
  arregloTareas = newArreglo;
  setArregloTareas();
}

//Método para limpior todas las tareas
const limpiarTodo = () =>{
 arregloTareas = [];
  contador = 0;
  setArregloTareas();
  setContador();
}

//inicio
inicializarContador();
listarTareas()

//(async function App() {
  //const main = null || document.querySelector(".container");
  //main.innerHTML = await Template();
//})();
