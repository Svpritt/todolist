const taskInput = document.getElementsByClassName("main__form-input")[0]; // короче класс-нейм и -тег нейм это по факту массивы коллекции поэтому нужно указывать че к чему явно особенно при вызове функций к ним или действий иначе фатал эррор или ундифайнд
const addButton = document.getElementsByTagName("button")[0];//first button по идее можно квери селектор ибо оно статично тут
const prioritetCheckbox = document.getElementById("urgently"); //Чек бокс из первого инпута, для включения или выключения приоритета (обнулять когда таска создана)
const incompleteTasksHolder = document.getElementById("incomplete_tasks"); //incomplete-tasks незя
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
// поидее из этих перменных нужно достать значения в другую перменную и она будет или из локал стредж или их передавать в циклы внизу
let tasks = [];
if ( localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach 

//СОБСтвенно последний шрих форич без понятия как реализовать его в такой когале




let addNewTask = function() {
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
        }
        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        listItem.id = newTask.id;
        label.innerText = newTask.text;  //по факту аргумент функции при ее вызове мы туда помещаем таск инпут валуе. который становится выше и присваивается тут перед реторном
        checkBox.checked = newTask.done;
        tasks.push(newTask);
        saveToLocalStorage();
        let newTaskDone = newTask.done ? completedTasksHolder.appendChild(listItem) : incompleteTasksHolder.appendChild(listItem);
        checkBox.onchange = function changeTask(){
          if(checkBox.checked){
            newTask.done = true;
            saveToLocalStorage();
            completedTasksHolder.appendChild(listItem); } else {
            newTask.done = false;
            saveToLocalStorage();
            incompleteTasksHolder.appendChild(listItem); }}
        // каждый элемент помещаем вконце лист итема 
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);    
            return listItem, newTaskDone;        
}

    console.log(taskInput.value); //рповерил вывод в консоль, вначале не был указан элемент в массиве от className и получал ундефайнд
    let listItem = createNewTask(tasks); //собственно помещаем в переменную ее создание, а аргументом функции передаем таск инпут валуе и он передается в лейбл как иннер текст
    // подсвечиваю задачу если она приоритет
    if (prioritetCheckbox.checked) {
         // добавляем абзац в начало списка если приоритет чекед НЕ ПОНЯЛ ПОЧЕМУ не prependChild
        listItem.classList.add("prioritet");
        console.log(prioritetCheckbox.type)
    }
    taskInput.value = ""; // очищаем значение инпута после срабатывания события. (обязатльно вконце)
    prioritetCheckbox.checked = false;  //обнуляем чекед после сабмита
    saveToLocalStorage();
}

addButton.addEventListener("click", addNewTask); //слушатель на клик для аддБаттон - он работает или по айди. или нужно указывать элемент массива явно. поскольку всякие ClassName & ByTagName - передают коллекцию, то массив не может быть равен функции. но может содержать ее. поэтому нужно явное указание.

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

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
