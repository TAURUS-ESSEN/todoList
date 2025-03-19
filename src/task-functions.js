'use strict';
import { savedProjekts } from "./dom.js";
import { TaskConstructor } from "./class-constructor.js";
import { drawTasksTable} from "./dom.js";

export function createTask () {
    let taskName = document.getElementById("taskName"); 
    let taskDesc= document.getElementById("taskDesc");
    let taskProjekt= document.getElementById("projektSelector");
    let taskId =  Date.now();
    let taskPriority = "0";
    let taskStatus = "0";
    let date = document.getElementById("datepicker");
    
    let newTask = new TaskConstructor (taskId, taskName.value, taskDesc.value, taskProjekt.value, taskPriority, taskStatus, date.value);

    const index = savedProjekts.findIndex(projekt => projekt.name === taskProjekt.value);
    savedProjekts[index].tasks.push(newTask);
    localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));

    drawTasksTable();
    taskName.value = '';
    taskDesc.value = '';
    taskProjekt = '';
}

export function deleteTask(id, projektid) {
    let currentProjekt = savedProjekts[projektid].tasks;
    const index = currentProjekt.findIndex(projekt => projekt.id === id);
    currentProjekt.splice(index, 1);
    localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
    drawTasksTable();
}

export function editTask(id, projektId) {
    const checkbox = document.getElementById(id);
    const row = checkbox.closest("tr"); 
    const nameCell = row.querySelector("td:nth-child(2)"); 
    const descCell = row.querySelector("td:nth-child(3)");
    const dateCell = row.querySelector("td:nth-child(5)");
    const index = savedProjekts[projektId].tasks.findIndex(projekt => projekt.id === id);

    nameCell.innerHTML = `<input type = "text" class = "test1" id = "test1" name = "test1" value="${savedProjekts[projektId].tasks[index].name}">`;
    descCell.innerHTML = `<input type = "text" class = "test2" id = "test2"  name = "test2" value="${savedProjekts[projektId].tasks[index].description}">`;
    dateCell.innerHTML = `<input type = "text"  class = "test3" id = "test3"  name = "test3" value="${savedProjekts[projektId].tasks[index].date}">`;
    event.target.textContent = "Save";
    event.target.classList.replace("button__taskEdit", "saveButton"); 
    const btnSave = document.querySelector(".saveButton");
    btnSave.addEventListener("click", () => saveChanges(id, projektId));
}

export function saveChanges(id,projektId) {
    const input1 = document.getElementById("test1");
    const input2 = document.getElementById("test2");
    const input3 = document.getElementById("test3");
    const index = savedProjekts[projektId].tasks.findIndex(projekt => projekt.id === id);
    savedProjekts[projektId].tasks[index].name = input1.value;
    savedProjekts[projektId].tasks[index].description = input2.value;
    savedProjekts[projektId].tasks[index].date = input3.value;
    localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
    drawTasksTable()
}

export function editPriorityStatus(id, projektId, priority) {  
    const index = savedProjekts[projektId].tasks.findIndex(projekt => projekt.id === id);
    (priority == 0) ? savedProjekts[projektId].tasks[index].priority = 1 : savedProjekts[projektId].tasks[index].priority = 0;
    localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
    drawTasksTable()
}

export function editTaskStatus(id, projektId) {   
    const checkbox = document.getElementById(id);
    const nearestTr = checkbox.closest("tr"); 
    let currentProjekt = savedProjekts[projektId].tasks;
    const index = currentProjekt.findIndex(projekt => projekt.id === id);

    if (checkbox.checked) { 
        nearestTr.classList.add("completed");
        currentProjekt[index].status = '1';
        localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
    } 
    else {
        nearestTr.classList.remove("completed");  
        currentProjekt[index].status = '0';
        localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
    } 
}