'use strict'

import { schowProjektAddForm, projektEditor,  createProjekt, saveProjektChanges, deleteProjekt } from "./projekt-functions.js"
import { createTask, deleteTask, editTask, editPriorityStatus,  editTaskStatus } from "./task-functions.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const container = document.getElementById("right__content"); 
export const savedProjekts =  JSON.parse(localStorage.getItem('savedProjekts'));

/*          BUTTONS AREA                */
document.addEventListener("click", (event) => {
    const { id } = event.target;

    if (id === "button__createProjekt") createProjekt();
    else if (id === "button__saveProjektChanges") saveProjektChanges();
    else if (id === "button__deleteProjekt") deleteProjekt();
    else if (id === "button__addTask") createTask();
    else if (id === "button__showCreateProjektForm") schowProjektAddForm();

    if (event.target.classList.contains("button__taskDelete")) {  //delete Task buttons
        deleteTask(event.target.id, event.target.name); 
    }
    if (event.target.classList.contains("button__projektEdit")) {  //edit Projekt buttons
        projektEditor(event.target); 
    }
    if (event.target.classList.contains("button__taskEdit")) { //edit Task buttons
        editTask(event.target.id, event.target.name); 
    }
    if (event.target.classList.contains("button__taskPriority")) {
        editPriorityStatus(event.target.id, event.target.name, event.target.dataset.priority);  
    }
});

document.addEventListener("change", (event) => {
    if (event.target.classList.contains("taskCheckbox")) {
        editTaskStatus(event.target.id, event.target.name);  
    }
});

/////////////////////////////////////////
export function drawTasksTable(filter = 0) { 
    console.log("Какой фильтр стоит?="+filter);
    let html = '';
    
    for (let i=0; i<savedProjekts.length; i++) {
        html +=`
        <div>
            <table class="projektTable">
                <caption> 
                    <div class="projektTable__header">
                        <span> Projekt name : <strong> ${savedProjekts[i].name} </strong> </span>
                        <button class="button__projektEdit" data-projektindex="${i}" id="${savedProjekts[i].id}">&nbsp;</button>
                    </div>
                </caption> 
                <tr>
                    <th></th>
                    <th class="taskNameHeader">Task Name</th>
                    <th  class="taskDescHeader">Description</th>
                    <th>Priority</th>
                    <th>DueDate</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>`;              

        for (let j = 0; j < savedProjekts[i].tasks.length; j++) {

            if (savedProjekts[i].tasks[j].status == 1 )  { 
                html += `<tr class="completed"><td><input class="taskCheckbox" name="${i}" id="${savedProjekts[i].tasks[j].id}" type="checkbox" checked>`;
            }
            else {
                html += `<tr><td><input name="${i}" class="taskCheckbox" id="${savedProjekts[i].tasks[j].id}" type=checkbox>`; 
            }
            
            html += `</td><td>${savedProjekts[i].tasks[j].name}</td><td>${savedProjekts[i].tasks[j].description}</td>`;

            if (savedProjekts[i].tasks[j].priority == 1 )  { 
                html += `<td><button class="button__taskPriority wichtig" name="${i}"  data-priority="${savedProjekts[i].tasks[j].priority}" id="${savedProjekts[i].tasks[j].id}"> &nbsp;</button></td> `;
            }    
            else {
                html += `<td><button class="button__taskPriority" name="${i}" data-priority="${savedProjekts[i].tasks[j].priority}" id="${savedProjekts[i].tasks[j].id}"> &nbsp;</button></td>`; 
            }
                html += `<td>${savedProjekts[i].tasks[j].date}</td><td><button class="button__taskEdit" name="${i}" id="${savedProjekts[i].tasks[j].id}">&nbsp;</button></td><td><button class="button__taskDelete" name="${i}" id="${savedProjekts[i].tasks[j].id}"> &nbsp;</button></td></tr>`;
        }
        html += `</table></div>`;
    } 
    container.innerHTML = html;
    flatpickr(".datepicker", {
        enableTime: true,
        dateFormat: "d-m-Y H:i",
        time_24hr: true
    });
    // document.querySelectorAll(".schowCreateProjektForm").forEach(button => {
    //     button.addEventListener("click", (event) => projektEditor(event.target))
    // }) это старый способ отслеживания кнопок
/////////////////////////////////////////
};  

export function  drawProjektForm (){
    let html = '';
    const  projektSelector= document.getElementById("projektSelector");
        for (let i=0; i<savedProjekts.length; i++) { 
            html +=` <option value=${savedProjekts[i].name}> ${savedProjekts[i].name}</option>`
        }
    projektSelector.innerHTML =  html;
}

/* FILTERS */


const btnFilterToday = document.getElementById("filter__today"); 
btnFilterToday.addEventListener("click", () => {drawTasksTable(1)});

const btnFilterCompleted = document.getElementById("filterCompleted");
btnFilterCompleted.addEventListener("click", ()=> {drawTasksTable(btnFilterCompleted.value)})