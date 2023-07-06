const taskInput = document.getElementsByClassName("main__form-input")[0]; // короче класс-нейм и -тег нейм это по факту массивы коллекции поэтому нужно указывать че к чему явно особенно при вызове функций к ним или действий иначе фатал эррор или ундифайнд
const addButton = document.getElementsByTagName("button")[0];//first button по идее можно квери селектор ибо оно статично тут
const priorityCheckbox = document.getElementById("urgently"); //Чек бокс из первого инпута, для включения или выключения приоритета (обнулять когда таска создана)
const incompleteTasksHolder = document.getElementById("incomplete_tasks"); //incomplete-tasks незя
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
// поидее из этих перменных нужно достать значения в другую перменную и она будет или из локал стредж или их передавать в циклы внизу
let tasks = [];
if ( localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
const deleteTask = function () {
  console.log("Delete Task...");
  //Remove the parent list item from the ul
  let listItem = this.parentNode;  //мой перент нод епта
  let ul = listItem.parentNode;
  const id = Number(listItem.id); //елемент вытягивается из HTML абсолютно все что есть в HTML = это строка
  console.log(id);
  // ниже по айди ищу индекс таски в массиве. 0-1-2-3-4 и т.д.
  const index = tasks.findIndex(function(task){
    console.log(task);
    if (task.id === id){
      return true
    }
  })
    console.log(index);
// индекс нашел по нему буду удалять 
  tasks.splice(index, 1);  //первое число сам индекс от куда начать, второе - сколько шт вырезать )
  saveToLocalStorage();
  ul.removeChild(listItem);
  }
const editTask = function() {
  console.log('task edit now');
  let listItem = this.parentNode;
  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");
  const id = Number(listItem.id);
  //ищу таску к которой обратился кнопкой. чтоб далее обратиться по ссылке к обьекту и поменять в нем значение)
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
      editInput.value = task.text; //пока не понял как записать значение без действия
  }
  //Toggle .editMode on the parent 
  listItem.classList.toggle("editMode");
  saveToLocalStorage();
}

// Функция для создания элементов списка и настройки их свойств
function createListItem() {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return { listItem, checkBox, label, editInput, editButton, deleteButton };
}

// Функция для обработки существующих задач
function changeTask(task, checkBox, listItem) {
  task.done = checkBox.checked;
  saveToLocalStorage();

  if (checkBox.checked) {
    if (task.isHighpriority === 'priority') {
      completedTasksHolder.prepend(listItem);
    } else {
      completedTasksHolder.appendChild(listItem);
    }
  } else {
    if (task.isHighpriority === 'priority') {
      incompleteTasksHolder.prepend(listItem);
    } else {
      incompleteTasksHolder.appendChild(listItem);
    }
  }
}

tasks.forEach(function(task) {
  let { listItem, checkBox, label, editInput, editButton, deleteButton } = createListItem();

  checkBox.type = "checkbox";
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

  if (task.isHighpriority === 'priority') {
    listItem.classList.add("priority");
    task.isHighpriority = 'priority';
  }

  checkBox.onchange = function() {
    changeTask(task, checkBox, listItem);
  };

  let newTaskDone;
  if (task.done) {
    if (task.isHighpriority === 'priority') {
      newTaskDone = completedTasksHolder.prepend(listItem);
    } else {
      newTaskDone = completedTasksHolder.appendChild(listItem);
    }
  } else {
    if (task.isHighpriority === 'priority') {
      newTaskDone = incompleteTasksHolder.prepend(listItem);
    } else {
      newTaskDone = incompleteTasksHolder.appendChild(listItem);
    }
  }

  console.log("Code executed:", newTaskDone);
});
// Функция для создания новой задачи
let createNewTask = function() {
  let taskText = taskInput.value.trim(); // Удаляем пробелы в начале и конце текста задачи
  if (taskText !== '') { // Проверяем, что текст задачи не пустой
  let { listItem, checkBox, label, editInput, editButton, deleteButton } = createListItem();

  const newTask = {
    id: Date.now(),
    text: taskInput.value,
    done: false,
    isHighpriority: ''
  };

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;

  listItem.id = newTask.id;
  label.innerText = newTask.text;
  checkBox.checked = newTask.done;

  if (priorityCheckbox.checked) {
    listItem.classList.add("priority");
    newTask.isHighpriority = 'priority';
    console.log(priorityCheckbox.type);
  }
  tasks.push(newTask);
  let newTaskDone;
  if (newTask.isHighpriority === 'priority') {
    newTaskDone = incompleteTasksHolder.prepend(listItem);
  } else {
    newTaskDone = incompleteTasksHolder.appendChild(listItem);
  }

  checkBox.onchange = function() {
    changeTask(newTask, checkBox, listItem);
  };
  return listItem;
} else {
  console.log('fatal error - write text!')
  return null; // Если текст задачи пустой, возвращаем null
}
};
let addNewTask = function() {
    console.log(taskInput.value); //рповерил вывод в консоль, вначале не был указан элемент в массиве от className и получал ундефайнд
    let listItem = createNewTask(tasks); //собственно помещаем в переменную ее создание, а аргументом функции передаем таск инпут валуе и он передается в лейбл как иннер текст
    // подсвечиваю задачу если она приоритет
    

    taskInput.value = ""; // очищаем значение инпута после срабатывания события. (обязатльно вконце)
    priorityCheckbox.checked = false;  //обнуляем чекед после сабмита
    saveToLocalStorage();
}
addButton.addEventListener("click", addNewTask); //слушатель на клик для аддБаттон - он работает или по айди. или нужно указывать элемент массива явно. поскольку всякие ClassName & ByTagName - передают коллекцию, то массив не может быть равен функции. но может содержать ее. поэтому нужно явное указание.
function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}