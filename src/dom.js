'use strict'

import { TaskConstructor  } from "./projekt.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const container = document.getElementById("right__content"); 
let savedProjekt =  JSON.parse(localStorage.getItem('savedProjekt'));

export function drawProjektTabelle(){ 
    //let savedProjekt =  JSON.parse(localStorage.getItem('savedProjekt'));

    let html = '';
    
    for (let i=0; i<savedProjekt.length; i++) {
       // html +=`<input type=text class="datepicker">`
        html +=`<div>
            <table class="projektTable">
                <caption>Projekt name : ${savedProjekt[i].name}</caption>
                <tr>
                    <th></th><th class="taskNameHeader">Task Name</th><th  class="taskDescHeader">Description</th><th>Priority</th><th>DueDate</th><th>Edit</th><th>Delete</th>
                </tr>`;              

        for (let j = 0; j < savedProjekt[i].tasks.length; j++) {
          
            if (savedProjekt[i].tasks[j].status == 1 )  { 
                console.log("completed chexbox  id="+savedProjekt[i].tasks[j].id);
                html += `<tr class="completed"><td><input class="taskCheckbox" name="${i}" id="${savedProjekt[i].tasks[j].id}" type="checkbox" checked>`;

            }
            else {
                html += `<tr><td><input name="${i}" class="taskCheckbox" id="${savedProjekt[i].tasks[j].id}" type=checkbox>`; 
            }
           
            html += `</td><td>${savedProjekt[i].tasks[j].name}</td><td>${savedProjekt[i].tasks[j].description}</td>`;

            if (savedProjekt[i].tasks[j].priority == 1 )  { 
                html += `<td><button class="taskPriority wichtig" name="${i}"  data-priority="${savedProjekt[i].tasks[j].priority}" id="${savedProjekt[i].tasks[j].id}"> &nbsp;</button></td> `;
            }
            
             else {
                html += `<td><button class="taskPriority" name="${i}" data-priority="${savedProjekt[i].tasks[j].priority}" id="${savedProjekt[i].tasks[j].id}"> &nbsp;</button></td>`; 
            }
                html += `<td>xxxx</td><td><button class="taskEdit" name="${i}" id="${savedProjekt[i].tasks[j].id}">&nbsp;</button></td><td><button class="taskDel" name="${i}" id="${savedProjekt[i].tasks[j].id}"> &nbsp;</button></td></tr>`;
          
        }
        html += `</table></div>`;
    } 
    container.innerHTML = html;
    flatpickr(".datepicker", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    
    });
};  


export function  drawProjektForm (){
    let html = '';
    const  projektSelector= document.getElementById("projektSelector");
        for (let i=0; i<savedProjekt.length; i++) { 
            html +=` <option value=${savedProjekt[i].name}> ${savedProjekt[i].name}</option>`
        }
    projektSelector.innerHTML =  html;
}

const btnAddTask = document.getElementById("button__addTask"); 
btnAddTask.addEventListener("click", createTask);

function createTask () {
    let taskName = document.getElementById("taskName"); 
    let taskDesc= document.getElementById("taskDesc");
    let taskProjekt= document.getElementById("projektSelector");
    let taskId =  Date.now();
    let taskPriority = "0";
    let taskStatus = "0";

    let newTask = new TaskConstructor (taskId, taskName.value, taskDesc.value, taskProjekt.value, taskPriority, taskStatus);
    console.log (newTask);

    const index = savedProjekt.findIndex(projekt => projekt.name === taskProjekt.value);
    savedProjekt[index].tasks.push(newTask);
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));

    drawProjektTabelle()
    taskName.value = '';
    taskDesc.value = '';
    taskProjekt = '';
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("taskDel")) {
            const taskId = event.target.id;  
            const projektName = event.target.name;  
            deleteTask(taskId, projektName);  
    }
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("taskEdit")) {
        const taskId = event.target.id; // Получаем ID кнопки
        const projektId = event.target.name;  
        editTask(taskId, projektId); // Вызываем функцию редактирования
    }
});

document.addEventListener("change", (event) => {
    if (event.target.classList.contains("taskCheckbox")) {
        const taskId = event.target.id; 
        const projektId = event.target.name;  
        editTaskStatus(taskId, projektId);  
    }
});


document.addEventListener("click", (event) => {
    if (event.target.classList.contains("taskPriority")) {
        const taskId = event.target.id; 
        const projektId = event.target.name;
        const priority = event.target.dataset.priority;   
        editPriorityStatus(taskId, projektId, priority);  
    }
});


function deleteTask(id, projektid) {
    console.log("del id="+id, "projektid="+projektid);
    let currentProjekt = savedProjekt[projektid].tasks;
    const index = currentProjekt.findIndex(projekt => projekt.id === id);
  
    console.log("index удаляемой хуйни="+ index);
    console.log("сама хуйня"+currentProjekt[index].name);
    console.log(currentProjekt);
    currentProjekt.splice(index, 1);
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
    drawProjektTabelle();
}

function editTask(id, projektId) {
    console.log("edit id="+id, "projektid="+projektId);
    const checkbox = document.getElementById(id);
    const row = checkbox.closest("tr"); 
    const nameCell = row.querySelector("td:nth-child(2)"); 
    const descCell = row.querySelector("td:nth-child(3)");
    const index = savedProjekt[projektId].tasks.findIndex(projekt => projekt.id === id);

    nameCell.innerHTML = `<input type = "text" class = "test1" id = "test1" name = "test1" value="${savedProjekt[projektId].tasks[index].name}">`;
    descCell.innerHTML = `<input type = "text" class = "test2" id = "test2"  name = "test2" value="${savedProjekt[projektId].tasks[index].description}">`;
    event.target.textContent = "Save";
    event.target.classList.replace("taskEdit", "saveButton"); 
    const btnSave = document.querySelector(".saveButton");
    btnSave.addEventListener("click", () => saveChanges(id, projektId));
}

function saveChanges(id,projektId) {
    console.log("edit id="+id, "projektid="+projektId);
    const input1 = document.getElementById("test1");
    const input2 = document.getElementById("test2");
    console.log("input1="+input1.value, "input2="+input2.value, )
    const index = savedProjekt[projektId].tasks.findIndex(projekt => projekt.id === id);
    savedProjekt[projektId].tasks[index].name = input1.value;
    savedProjekt[projektId].tasks[index].description = input2.value;
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
    drawProjektTabelle()
}

function editPriorityStatus(id, projektId, priority) {  
    const index = savedProjekt[projektId].tasks.findIndex(projekt => projekt.id === id);
    (priority == 0) ? savedProjekt[projektId].tasks[index].priority = 1 : savedProjekt[projektId].tasks[index].priority = 0;
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
    drawProjektTabelle()
}


function editTaskStatus(id, projektId) {   
    const checkbox = document.getElementById(id);
    const nearestTr = checkbox.closest("tr"); 
    let currentProjekt = savedProjekt[projektId].tasks;
    const index = currentProjekt.findIndex(projekt => projekt.id === id);
 
    if (checkbox.checked) { 
        nearestTr.classList.add("completed");
        currentProjekt[index].status = '1';
        localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
        
    } else {
        nearestTr.classList.remove("completed");  
        currentProjekt[index].status = '0';
        localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
    } 
}