const addTodoBtn = document.getElementById("addTodo");
const btnText = addTodoBtn.innerText;
const todoInputField = document.getElementById("todoInput");
const recordsDisplay = document.getElementById("records");
//creating an empty array to store todos or input or data
let todoArray = [];
let edit_id = null;

// To get the data form the internal storage it will be in form of object
let objstr = localStorage.getItem("todos");

// The data we get through local storage get item is in form of string to convert it into object we use
if (objstr != null) {
  todoArray = JSON.parse(objstr);
}

displayInfo();

addTodoBtn.onclick = () => {
  // storing the value recieved from input of todo input field in a constant name todo
  const todo = todoInputField.value;

  //storing the inputs in array in form of objects i.e is key value pair. push add value at the last position
  if (todo) {
    if (edit_id != null) {
      //edit action
      userArray.splice(edit_id, 1, {
         'name': todo
      });
      edit_id = null;
   } else {
      //insert action
      userArray.push({
         'name': todo
      });
   }
    // todoArray.push({ name: todo });
  } else {
    alert("Please enter the Todo");
  }
  saveInfo(todoArray);
  displayInfo();
  todoInputField.value = "";
  addTodoBtn.innerText = btnText;
};

//To store, display, edit and delete the todo we create the 4 functions

function saveInfo(array) {
  // 2.) conversion of objects in string built in js method
  let str = JSON.stringify(todoArray);

  //1.)localStorage doest not accept objects it only accept string. It is used to store data in local storage
  localStorage.setItem("todos", str);
  displayInfo();

}
function displayInfo() {
  let statement = "";
  todoArray.forEach((todos, index) => {
    console.log(todos, index);

    statement += `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${todos.name}</td>
        <td>
          <i class="btn btn-info text-white fa fa-edit mx-2  " onclick = 'editInfo(${index})'></i>
          <i class="btn btn-danger text-white fa fa-trash" onclick = 'deleteInfo(${index})'></i>
        </td>
      </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}
function editInfo(id) {
  edit_id = id;
  todoInputField.value = todoArray[id].name;
  addTodoBtn.innerText = "Save changes";
}
function deleteInfo(id) {
  todoArray.splice(id, 1);
  saveInfo(todoArray);

}
