const taskInput = document.getElementsByClassName("main__form-input")[0]; // короче класс-нейм и -тег нейм это по факту массивы коллекции поэтому нужно указывать че к чему явно особенно при вызове функций к ним или действий иначе фатал эррор или ундифайнд
const addButton = document.getElementsByTagName("button")[0];//first button по идее можно квери селектор ибо оно статично тут
const prioritetCheckbox = document.getElementById("urgently"); //Чек бокс из первого инпута, для включения или выключения приоритета (обнулять когда таска создана)
const incompleteTasksHolder = document.getElementById("incomplete_tasks"); //incomplete-tasks незя
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks
// поидее из этих перменных нужно достать значения в другую перменную и она будет или из локал стредж или их передавать в циклы внизу

let data = {
  incomplete:[{
    label:"Pay Bills",
    isHighPriority:true,
    local:true,
  },
  {
    label:"Go shopping",
    isHighPriority:false,
  },
],
  complete:[

  ],
};


if(getData() === null){     // если значения не существует то выполняем код
  setData(data.incomplete, data.complete); // передаем данные из переменной

  console.log(getData(data.incomplete, data.complete));
}

function getData () {
  return JSON.parse(localStorage.getItem('incompleteTasks'));  //получаем данные из хранилища
}

function setData (taskList) {
  localStorage.setItem('incompleteTasks', JSON.stringify(taskList));  //помещаем данные в хранилище 
}

let addNewTask = function() {
  console.log(taskInput.value); //рповерил вывод в консоль, вначале не был указан элемент в массиве от className и получал ундефайнд
  let newTask = ({label:taskInput.value, isHighPriority:true}); //собственно помещаем в переменную ее создание, а аргументом функции передаем таск инпут валуе и он передается в лейбл как иннер текст
  prioritetCheckbox.checked = false;
  let data =  getData();
  
  createNewTask(newTask);
  data = [newTask];

  setData(newTask);
  
  // saveHTMLtoLS ();
  // saveHTMLtoLSc();
}

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
        
        label.innerText = myNewTask.label;  //по факту аргумент функции при ее вызове мы туда помещаем таск инпут валуе. который становится выше и присваивается тут перед реторном
        
        // каждый элемент помещаем вконце лист итема 
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
        checkBox.onchange = function()
        {
          if(checkBox.checked)
          {
           data = getData(data.incomplete);
            
            // data.incomplete.removeChild(myNewTask);
            // data.complete.push(newTask);
            setData(data);

            completedTasksHolder.appendChild(listItem);
          }
          else
          {
             data = getData(data.complete);
            // data.incomplete.push(newTask);
            // data.complete.removeChild(myNewTask);
            setData(data.incomplete);

            incompleteTasksHolder.appendChild(listItem);
          }
        }
    
        //taskEventsLi(listItem, taskCompleted);
        // подсвечиваю задачу если она приоритет
        if (myNewTask.isHighPriority) {
            incompleteTasksHolder.prepend(listItem); // добавляем абзац в начало списка если приоритет чекед НЕ ПОНЯЛ ПОЧЕМУ не prependChild
            listItem.classList.add("prioritet");
        } else {
            incompleteTasksHolder.appendChild(listItem); //присваеваем абзацу с невыполненными тасками методом Вконец списка аргумент значение лист итема именно эта строчка делает магию и значение из переменной выводится в браузере.  
        }
    
        taskInput.value = ""; // очищаем значение инпута после срабатывания события. (обязатльно вконце)
        //обнуляем чекед после сабмита


            return listItem;
}

addButton.addEventListener("click", addNewTask); //слушатель на клик для аддБаттон - он работает или по айди. или нужно указывать элемент массива явно. поскольку всякие ClassName & ByTagName - передают коллекцию, то массив не может быть равен функции. но может содержать ее. поэтому нужно явное указание.
const deleteTask = function () {
    console.log("Delete Task...");
    //Remove the parent list item from the ul
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);

    // saveHTMLtoLS ();

    }
const editTask = function() {
    console.log('task edit now');
    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    let containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        //Switch from .editMode
        //label text become the input's value
        label.innerText = editInput.value;
    } else {
        //Switch to .editMode
        //input value becomes the labels text
           editInput.value = label.innerText;
    }
    //Toggle .editMode on the parent 
    listItem.classList.toggle("editMode");
    // saveHTMLtoLS ();
    // saveHTMLtoLSc();

}
const taskCompleted = function() {
        console.log("Task Complete...");
       //When the Checkbox is checked 
       //Append the task list item to the #completed-tasks ul
        let listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        // taskEventsLi(listItem, taskIncomplete, );
        //поскольку каждый лист живет отдельно мне нужно локал сторедж джлдя каждого

     }
     //отметить задачу incomplete
const taskIncomplete = function() {
       console.log("Task Incomplete...");
          //When the checkbox is unchecked appendTo #incomplete-tasks
       let listItem = this.parentNode;
       incompleteTasksHolder.appendChild(listItem); //двебанорот
      //  taskEventsLi(listItem, taskCompleted, );
        //поскольку каждый лист живет отдельно мне нужно локал сторедж джлдя каждого

    }


// const taskEventsLi = function(taskListItem,checkBoxEventHandler) {
//     console.log("bind elements in list item");
//     let checkBox = taskListItem.querySelector('input[type="checkbox"]');
//     let deleteButton = taskListItem.querySelector("button.delete");
//     let editButton = taskListItem.querySelector("button.edit");

//       //что делают кнопки обьявленные выше
//     editButton.onclick = editTask;
//     deleteButton.onclick = deleteTask;
//     checkBox.onchange = checkBoxEventHandler;
    
    // saveHTMLtoLS ();
    // saveHTMLtoLSc();
// }
getData().forEach(createNewTask);


// for (let i = 0; i < incompleteTasksHolder.children.length; i ++) {
//     //bind events to list item's children (taskCompleted)	так же мы получаем элеметы в таск ивент
//     taskEventsLi(incompleteTasksHolder.children[i], taskCompleted);
//   }
  
//   //cycle over completedTaskHolder ul list items
//   for (let i = 0; i < completedTasksHolder.children.length; i ++) {
//     //bind events to list item's children (taskCompleted)	так же мы получаем элеметы в таск ивент
//     taskEventsLi(completedTasksHolder.children[i], taskIncomplete);
//   }


  // function saveHTMLtoLS() {
  //   localStorage.setItem('incompleteTasksHolder', incompleteTasksHolder.innerHTML);
  // }
  // function saveHTMLtoLSc() {
  //   localStorage.setItem('completedTasksHolder', completedTasksHolder.innerHTML);
  // }
 
// if (localStorage.getItem('incompleteTasksHolder')){
//   incompleteTasksHolder.innerHTML = localStorage.getItem('incompleteTasksHolder');
// }
// if (localStorage.getItem('completedTasksHolder')){
//   completedTasksHolder.innerHTML = localStorage.getItem('completedTasksHolder');
// }
