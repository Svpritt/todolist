const taskInput = document.getElementsByClassName("main__form-input")[0]; // in short, the class-name and -tag name are in fact collection arrays, so you need to specify what to do explicitly, especially when calling functions for them or actions, otherwise fatal error or unfind
const addButton = document.getElementsByTagName("button")[0];//first button, in theory, you can use the selector because it is static here
const prioritetCheckbox = document.getElementById("urgently"); //Checkbox from the first input, to enable or disable the priority (reset to zero when the task is created)
const incompleteTasksHolder = document.getElementById("incomplete_tasks"); //incomplete-tasks none
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
// in theory, from these variables you need to get the values \u200b\u200binto another variable and it will either be from the local strand or pass them to the cycles below
let tasks = [];
if ( localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
const deleteTask = function () {
  console.log("Delete Task...");
  //Remove the parent list item from the ul
  let listItem = this.parentNode;  
  let ul = listItem.parentNode;
  const id = Number(listItem.id); // element is pulled from HTML absolutely everything in HTML = this is a string
  console.log(id);
// below by id I'm looking for the task index in the array. 0-1-2-3-4 etc.
  const index = tasks.findIndex(function(task){
    console.log(task);
    if (task.id === id){
      return true
    }
  })
    console.log(index);
  tasks.splice(index, 1); // the first number is the index itself from where to start, the second - how many pieces to cut)
  saveToLocalStorage();
  ul.removeChild(listItem);
  }
const editTask = function() {
  console.log('task edit now');
  let listItem = this.parentNode;
  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");
  const id = Number(listItem.id);
//I'm looking for a task that I accessed with the button. to further refer to the object by reference and change the value in it)
  const task = tasks.find(function(task){
    console.log(task);
    if (task.id === id){
      return true
    }});
    
  let containsClass = listItem.classList.contains("editMode");
  if (containsClass) {
      label.innerText = editInput.value;
      task.text = label.innerText;
  } else {
      editInput.value = label.innerText;
      editInput.value = task.text; //not yet figured out how to write a value without action
  }
  //Toggle .editMode on the parent 
  listItem.classList.toggle("editMode");
  saveToLocalStorage();
}

tasks.forEach(function(task) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  checkBox.type = "checkBox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  listItem.id = task.id;
  label.innerText = task.text;
  checkBox.checked = task.done;

  if (task.isHighpriority === 'prioritet') {
    listItem.classList.add("prioritet");
    task.isHighpriority = 'prioritet';
    incompleteTasksHolder.prepend(listItem);
  } else {
    incompleteTasksHolder.appendChild(listItem);
  }

  checkBox.onchange = function changeTask() {
    if (checkBox.checked) {
      task.done = true;
      saveToLocalStorage();
      if (task.isHighpriority === 'prioritet') {
        completedTasksHolder.prepend(listItem);
      } else {
        completedTasksHolder.appendChild(listItem);
      }
    } else {
      task.done = false;
      saveToLocalStorage();
      if (task.isHighpriority === 'prioritet') {
        incompleteTasksHolder.prepend(listItem);
      } else {
        incompleteTasksHolder.appendChild(listItem);
      }
    }
  };

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
});
let createNewTask = function() {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
      checkBox.type = "checkBox";
      editInput.type = "text";    
      editButton.innerText = "Edit";
      editButton.className = "edit";
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";
      
      
      const newTask = {
        id: Date.now(),
        text:taskInput.value,
        done: false,
        isHighpriority: '',
      }
      editButton.onclick = editTask;
      deleteButton.onclick = deleteTask;
      listItem.id = newTask.id;
      label.innerText = newTask.text;  //in fact, the argument of the function when it is called, we put the task input value there. which gets higher and is assigned here before the retort
      checkBox.checked = newTask.done;
      if (priorityCheckbox.checked) {
       listItem.classList.add("prioritet");
       newTask.isHighpriority = 'prioritet';
       console.log(priorityCheckbox.type)
       
   }
      tasks.push(newTask);
      // saveToLocalStorage();
      let newTaskDone = newTask.done ? completedTasksHolder.prepend(listItem) : incompleteTasksHolder.prepend(listItem);
      console.log("Code executed:", newTaskDone);

      checkBox.onchange = function changeTask(){
        if (checkBox.checked) {
          newTask.done = true;
          saveToLocalStorage();
          if (newTask.isHighpriority === 'prioritet') {
            completedTasksHolder.prepend(listItem);
          } else {
            completedTasksHolder.appendChild(listItem);
            console.log('HUITA')
          }
        } else {
          newTask.done = false;
          saveToLocalStorage();
          if (newTask.isHighpriority === 'prioritet') {
            incompleteTasksHolder.prepend(listItem);
          } else {
            incompleteTasksHolder.appendChild(listItem);
                        console.log('HUITA')

          }
        }};
      
      listItem.appendChild(checkBox);
      listItem.appendChild(label);
      listItem.appendChild(editInput);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);    
      
          return listItem, newTaskDone;        
}

let addNewTask = function() {
  console.log(taskInput.value); //checked the output to the console, at first the element in the array from className was not specified and received undefined
  let listItem = createNewTask(tasks); //we actually put its creation into the variable, and pass the task input value as the function argument and it is passed to the label as an inner text
  // highlight the task if it is a priority
    

  taskInput.value = ""; // clear the value of the input after the event fires. (required at the end)
  priorityCheckbox.checked = false; // reset checked after submit
    saveToLocalStorage();
}

addButton.addEventListener("click", addNewTask); //click listener for addButton - it works or by id. or you need to specify the array element explicitly. since any ClassName & ByTagName - pass a collection, the array cannot be equal to the function. but may contain it. so an explicit indication is needed.


function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}