'use strict'

import { TaskConstructor, projektConstructor  } from "./projekt.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const container = document.getElementById("right__content"); 
let savedProjekt =  JSON.parse(localStorage.getItem('savedProjekt'));

export function drawProjektTabelle(filter = 0){ 
    let html = '';
    for (let i=0; i<savedProjekt.length; i++) {
        html +=`<div>
            <table class="projektTable">
                <caption>Projekt name : <strong> ${savedProjekt[i].name} </strong><button class="projektEditBtn" name="${i}" id="${savedProjekt[i].id}">&nbsp;</button></caption>
                <tr>
                    <th></th><th class="taskNameHeader">Task Name</th><th  class="taskDescHeader">Description</th><th>Priority</th><th>DueDate</th><th>Edit</th><th>Delete</th>
                </tr>`;              

        for (let j = 0; j < savedProjekt[i].tasks.length; j++) {

            if (savedProjekt[i].tasks[j].status == 1 )  { 
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
                html += `<td>${savedProjekt[i].tasks[j].date}</td><td><button class="taskEdit" name="${i}" id="${savedProjekt[i].tasks[j].id}">&nbsp;</button></td><td><button class="taskDel" name="${i}" id="${savedProjekt[i].tasks[j].id}"> &nbsp;</button></td></tr>`;
        }
        html += `</table></div>`;
    } 
    container.innerHTML = html;
    flatpickr(".datepicker", {
        enableTime: true,
        dateFormat: "d-m-Y H:i",
        time_24hr: true
    });

    const projektEditButtons = document.querySelectorAll(".projektEditBtn");
    console.log("projektEditButtons"+projektEditButtons.length);
    projektEditButtons.forEach(button => {
        button.addEventListener("click", (event) => projektEditor(event.target))
    })
};  

// редактор проекта
function projektEditor (event) {
    const schowForm = document.getElementById("modal_edit_content");
    schowForm.style.display = "block";

    console.log("индекс проекта в массиве = " + event.name,  " id объекта = " + event.id)
    console.log(savedProjekt[event.name].name)
    const inputProjektName = document.getElementById("projektNameEdit");
    const inputProjektDesc = document.getElementById("projektDescEdit");
    const hiddenKeyProjekt = document.querySelector(".hiddenKeyProjekt");

    inputProjektName.value = savedProjekt[event.name].name;
    inputProjektDesc.value = savedProjekt[event.name].description;
    hiddenKeyProjekt.id = event.name;

    schowForm.querySelector(".close_modal_fenster").addEventListener("click", ()=>{
        schowForm.style.display = "none";
    })
}

function saveProjektChanges() {

    const schowForm2 = document.getElementById("modal_edit_content");
    schowForm2.style.display = "none";  
    const input1 = document.getElementById("projektNameEdit");
    const input2 = document.getElementById("projektDescEdit");
    const projektId = document.querySelector(".hiddenKeyProjekt");
    savedProjekt[projektId.id].name = input1.value;
    savedProjekt[projektId.id].description = input2.value;
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
    drawProjektTabelle()
}

function deleteProjekt() {
    const schowForm2 = document.getElementById("modal_edit_content");
    schowForm2.style.display = "none";  
    const projektId = document.querySelector(".hiddenKeyProjekt");
    console.log("удаляем id =" +projektId.id);
    savedProjekt.splice([projektId.id],1);
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
    drawProjektTabelle()
}

const editProjektBtn = document.getElementById("button__editProjekt");
editProjektBtn.addEventListener("click", ()=>{ saveProjektChanges() } );

const deleteProjektBtn = document.getElementById("button__deleteProjekt");
deleteProjektBtn.addEventListener("click", ()=>{ deleteProjekt() } );


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
    let date = document.getElementById("datepicker");
    

    let newTask = new TaskConstructor (taskId, taskName.value, taskDesc.value, taskProjekt.value, taskPriority, taskStatus, date.value);
  

    const index = savedProjekt.findIndex(projekt => projekt.name === taskProjekt.value);
    savedProjekt[index].tasks.push(newTask);
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));

    drawProjektTabelle()
    taskName.value = '';
    taskDesc.value = '';
    taskProjekt = '';
}

const addProjekt = document.getElementById("addProjekt")
addProjekt.addEventListener("click", ()=> schowProjektAddForm())

const createProjekBtn = document.getElementById("button__addProjekt");
createProjekBtn.addEventListener("click", ()=>{ createProjekt () });

function schowProjektAddForm () {
    const schowForm = document.getElementById("modal_content");
    schowForm.style.display = "block";

    schowForm.querySelector(".close_modal_fenster").addEventListener("click", ()=>{
        schowForm.style.display = "none";
    })
}

function createProjekt () {

    let projektName = document.getElementById("projektName"); 
    let projektDesc= document.getElementById("projektDesc");
    let projektId =  Date.now();
    let projektTasks = [];

    let newProjekt = new projektConstructor (projektId, projektName.value, projektDesc.value, projektTasks);
    savedProjekt.push(newProjekt);
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));

    const schowForm1 = document.querySelector(".modal");
    schowForm1.style.display = "none";  

    projektName.value = '';
    projektDesc.value = ''; 
    drawProjektTabelle();
    drawProjektForm ();
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
 
    let currentProjekt = savedProjekt[projektid].tasks;
    const index = currentProjekt.findIndex(projekt => projekt.id === id);
 
    currentProjekt.splice(index, 1);
    localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
    drawProjektTabelle();
}

function editTask(id, projektId) {
 
    const checkbox = document.getElementById(id);
    const row = checkbox.closest("tr"); 
    const nameCell = row.querySelector("td:nth-child(2)"); 
    const descCell = row.querySelector("td:nth-child(3)");
    const dateCell = row.querySelector("td:nth-child(5)");
    const index = savedProjekt[projektId].tasks.findIndex(projekt => projekt.id === id);

    nameCell.innerHTML = `<input type = "text" class = "test1" id = "test1" name = "test1" value="${savedProjekt[projektId].tasks[index].name}">`;
    descCell.innerHTML = `<input type = "text" class = "test2" id = "test2"  name = "test2" value="${savedProjekt[projektId].tasks[index].description}">`;
    dateCell.innerHTML = `<input type = "text"  class = "test3" id = "test3"  name = "test3" value="${savedProjekt[projektId].tasks[index].date}">`;
    event.target.textContent = "Save";
    event.target.classList.replace("taskEdit", "saveButton"); 
    const btnSave = document.querySelector(".saveButton");
    btnSave.addEventListener("click", () => saveChanges(id, projektId));
}

function saveChanges(id,projektId) {
   
    const input1 = document.getElementById("test1");
    const input2 = document.getElementById("test2");
    const input3 = document.getElementById("test3");
 
    const index = savedProjekt[projektId].tasks.findIndex(projekt => projekt.id === id);
    savedProjekt[projektId].tasks[index].name = input1.value;
    savedProjekt[projektId].tasks[index].description = input2.value;
    savedProjekt[projektId].tasks[index].date = input3.value;
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
    } 
    else {
        nearestTr.classList.remove("completed");  
        currentProjekt[index].status = '0';
        localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
    } 
}


const btnFilterToday = document.getElementById("filter__today"); 
btnFilterToday.addEventListener("click", () => {drawProjektTabelle(1)});


 