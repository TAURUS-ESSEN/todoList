'use strict';
import { savedProjekts, filters, saveInLocalStorage } from "./index.js";
import { TaskConstructor } from "./class-constructor.js";

function projektIndexFinder(projektId) {
    let result = savedProjekts.findIndex(projekt => projekt.id === projektId);
    return result;
}

function taskIndexFinder(taskId, projektIndex) {
    let result = savedProjekts[projektIndex].tasks.findIndex(taskid => taskid.id === taskId);
    return result;
}

export function createTask() {
    let taskName = document.getElementById("taskName"); 
    let taskDesc= document.getElementById("taskDesc");
    let taskProjekt= document.getElementById("projektSelector");
    let date = document.getElementById("datepicker");
    let taskId =  Date.now();
    let taskPriority = "0";
    let taskStatus = "0";
    if (taskName.value == '') { return alert('empty task name!')} 
    let newTask = new TaskConstructor (taskId, taskName.value, taskDesc.value,  taskPriority, taskStatus, date.value);

    const projektIndex = projektIndexFinder(taskProjekt.value);

    savedProjekts[projektIndex].tasks.push(newTask);
    saveInLocalStorage(savedProjekts);

    filters();
    taskName.value = '';
    taskDesc.value = '';
    taskProjekt = '';
}

export function deleteTask(taskid, projektid) {
    const projektIndex = savedProjekts.findIndex(projekt => projekt.id === projektid);
    let currentProjekt = savedProjekts[projektIndex].tasks;
    const taskindex = currentProjekt.findIndex(task => task.id === taskid);
    currentProjekt.splice(taskindex, 1);
    saveInLocalStorage (savedProjekts);
    filters();
}

export function editTask(taskId, projektId) {
    const checkbox = document.getElementById(taskId);
    const row = checkbox.closest("tr"); 
    const nameCell = row.querySelector("td:nth-child(2)"); 
    const descCell = row.querySelector("td:nth-child(3)");
    const dateCell = row.querySelector("td:nth-child(5)");   
    const projektIndex = projektIndexFinder(projektId);
    const taskIndex = taskIndexFinder(taskId, projektIndex);
    let currentProjektTask = savedProjekts[projektIndex].tasks[taskIndex];

    nameCell.innerHTML = `<input type = "text" id = "taskEditNameInput" value="${currentProjektTask.name}">`;
    descCell.innerHTML = `<input type = "text" id = "taskEditNameDescription" value="${currentProjektTask.description}">`;
    dateCell.innerHTML = `<input type = "text" id = "taskEditNameDate" value="${currentProjektTask.date}">`;
    event.target.textContent = "Save";
    event.target.classList.replace("button__taskEdit", "saveButton"); 
    document.querySelector(".saveButton").addEventListener("click", () => saveChanges(taskId, projektIndex));
}

export function saveChanges(taskId, projektIndex) {
    const input1 = document.getElementById("taskEditNameInput");
    const input2 = document.getElementById("taskEditNameDescription");
    const input3 = document.getElementById("taskEditNameDate");
    if (input1.value == '') { return alert('empty task name!')} 
    const taskIndex = taskIndexFinder(taskId, projektIndex);
    let currentProjektTask =  savedProjekts[projektIndex].tasks[taskIndex];
    currentProjektTask.name = input1.value;
    currentProjektTask.description = input2.value;
    currentProjektTask.date = input3.value;
    saveInLocalStorage (savedProjekts);
    filters();
}

export function editPriorityStatus(taskId, projektId, priority) {  
    const projektIndex = projektIndexFinder(projektId);
    const taskIndex = taskIndexFinder(taskId, projektIndex);
    let currentProjektTask = savedProjekts[projektIndex].tasks[taskIndex];
    (priority == 0) ? currentProjektTask.priority = 1 : currentProjektTask.priority = 0;
    saveInLocalStorage (savedProjekts);
    filters();
}

export function editTaskStatus(taskId, projektId) { 
    const checkbox = document.getElementById(taskId);
    const nearestTr = checkbox.closest("tr"); 
    let projektIndex = projektIndexFinder(projektId);

    let currentProjekt = savedProjekts[projektIndex].tasks;
    const taskIndex = taskIndexFinder(taskId, projektIndex);

    if (checkbox.checked) { 
        nearestTr.classList.add("completed");
        currentProjekt[taskIndex].status = '1';
        saveInLocalStorage (savedProjekts);
    } 
    else {
        nearestTr.classList.remove("completed");  
        currentProjekt[taskIndex].status = '0';
        saveInLocalStorage (savedProjekts);
    } 
}