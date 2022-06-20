import "@styles/bootstrap.css";
import "@styles/main.css";
import "@assets/db.json";

const $container = document.querySelector(".container");
const $fragment = document.createDocumentFragment();

//inicio
getDataPromesas();
getDataAsync();

function getDataPromesas(){
// pratica de conectivida con ajax 🤓  con la api de fetch
  fetch("https://jsonplaceholder.typicode.com/users")  //combertimos la respuesta a texto json
    .then((res) => res.ok? res.json(): Promise.reject(res))
    .then((data)=>{
      data.forEach((elemento) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${elemento.name} -- ${elemento.email} -- ${elemento.phone}`;
        $fragment.appendChild($li);
      });
      $container.appendChild($fragment);
    })
    .catch((err)=>{
      console.log("Estamos en el catch");
      console.error((err));
      let message = err.statusTaxt || "Ocurrió un error";
      $container.innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(()=>{
      console.log("Esto se ejecutará independientemente del resultado de la Promesa Fetch.");
    });
}

async function getDataAsync(){

  const fetchAsync = document.querySelector("#fetch-asyng");
  const fragment = document.createDocumentFragment();
  try{

    let res = await fetch("https://jsonplaceholder.typicode.com/users"),
    json = await res.json();
    console.log(res, json);

    // if(!res.ok)throw new Error("Ocurrio un error al solicitar los datos");
    if(!res.ok) throw { status:res.status, statusText: res.statusText};

    json.forEach((element) =>{
      const li = document.createElement("li");
      li.innerHTML = `${element.name} -- ${element.email} --${element.phone}`;
      fragment.appendChild(li);
    });

    fetchAsync.appendChild(fragment);
  }catch(err){
    console.log("Estoy en el catch", err);
    let message = err.statusText || "Ocurrió un error";
    fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
  }finally{
    console.log("Esto se ejecutará independientemente del resultado de la Promesa Fetch.");
  }

}
