import AddTask from "@templates/AddTask.js";
import AddLists from "@templates/AddLists.js";

//import bootstrap
import "@styles/bootstrap.css";
import "@styles/main.css";

const main = null || document.querySelector(".container");

const StartTemplate = async () => {
  AddLists();
  AddTask();
};

export default StartTemplate;
