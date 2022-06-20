import "@styles/bootstrap.css";
import "@styles/main.css";
import "@assets/db.json";

//inicio
getDataAxios();
getDataAxiosAsync();

function getDataAxios(){

  const containerAxios = document.querySelector("#axios");
  const fragment = document.createDocumentFragment();


  axios.get("https://jsonplaceholder.typicode.com/users")
  .then((res)=>{
    console.log(res);
    let json = res.data;

    json.forEach((data) =>{
      const li = document.createElement("li");
      li.innerHTML =  `${data.name} -- ${data.email} -- ${data.phone}`;
      fragment.appendChild(li);
    })

    containerAxios.appendChild(fragment);
  })
  .catch( err => {
    console.log("Estamo en el catch", err.response);
    let message = err.response.status || "Ocurrio un Error";
    containerAxios.innerHTML = `Error ${err.response.status} : ${message}`;

  })
  .finally(() =>{
    console.log("Esto se ejecutará independientemente del resultado Axios");
  })
}

async function getDataAxiosAsync(){

  const containerAxios = document.querySelector("#axios-async");
  const fragment = document.createDocumentFragment();

  try {
    let res = await axios.get("https://jsonplaceholder.typicode.com/users");
    let json = await res.data;
    json.forEach((data) =>{
    const li = document.createElement("li");
    li.innerHTML =  `${data.name} -- ${data.email} -- ${data.phone}`;
    fragment.appendChild(li);
    })
    containerAxios.appendChild(fragment);
  } catch(err) {
    console.log("Estamo en el catch", err.response);
    let message = err.response.status || "Ocurrio un Error";
    containerAxios.innerHTML = `Error ${err.response.status}:${message}`;
  }finally{
    console.log("Esto se ejecutará independientemente del try... catch");
  }
}
