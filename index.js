const taskInput = document.getElementsByClassName("main__form-input")[0]; // короче класс-нейм и -тег нейм это по факту массивы коллекции поэтому нужно указывать че к чему явно особенно при вызове функций к ним или действий иначе фатал эррор или ундифайнд
const addButton = document.getElementsByTagName("button")[0];//first button по идее можно квери селектор ибо оно статично тут
const incompleteTasksHolder = document.getElementById("incomplete_tasks"); //incomplete-tasks незя
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks 

let createNewTask = function(myNewTask) {
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
        
        label.innerText = myNewTask;  //по факту аргумент функции при ее вызове мы туда помещаем таск инпут валуе. который становится выше и присваивается тут перед реторном
        
        // каждый элемент помещаем вконце лист итема 
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

            return listItem;
}
let addNewTask = function() {
    console.log(taskInput.value); //рповерил вывод в консоль, вначале не был указан элемент в массиве от className и получал ундефайнд
    let listItem = createNewTask(taskInput.value); //собственно помещаем в переменную ее создание, а аргументом функции передаем таск инпут валуе и он передается в лейбл как иннер текст
    incompleteTasksHolder.appendChild(listItem); //присваеваем абзацу с невыполненными тасками методом Вконец списка аргумент значение лист итема именно эта строчка делает магию и значение из переменной выводится в браузере.
    deleteTaskEvents(listItem, taskIncomplete);
    taskInput.value = ""; // очищаем значение инпута после срабатывания события. (обязатльно вконце)

}
addButton.addEventListener("click", addNewTask); //слушатель на клик для аддБаттон - он работает или по айди. или нужно указывать элемент массива явно. поскольку всякие ClassName & ByTagName - передают коллекцию, то массив не может быть равен функции. но может содержать ее. поэтому нужно явное указание.

let deleteTaskEvents = function(taskListItem) {
    console.log("bind elements in list item");

    let deleteButton = taskListItem.querySelector("button.delete");

      //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
}

let deleteTask = function () {
    console.log("Delete Task...");
    //Remove the parent list item from the ul
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
      
    ul.removeChild(listItem);
    }

  let taskIncomplete = function() {
        console.log("Task Incomplete...");
           //When the checkbox is unchecked appendTo #incomplete-tasks
        let listItem = this.parentNode;
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
      }
