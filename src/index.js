'use strict';
import "./style.css";
import { drawTasksTable, drawProjektForm } from "./dom.js";

export let savedProjekts =  JSON.parse(localStorage.getItem('savedProjekts'));
checkLocalStorage();

function checkLocalStorage() {
    if (savedProjekts === null)  {  
        savedProjekts = [ 
        { id: "000001", name: "Default", description: "just default projekt", tasks: [{id: "0000001", name: "einkaufen", description : "some text", status: "0", priority: "0", date: "27-03-2025 12:00"}, {id: "000003", name: "JS lernen", description : "Todo Projekt", status: "0", priority: "1", date: "22-06-2025 09:00"} ]}, 
        { id: "000004", name: "JS", description: "TODO projekt", tasks: [{id: "000005", name: "webpack", description : "install", status: "1", priority: "0", date: "28-11-2025 14:30"}, {id: "000002", name: "DOM function", description : "schreiben code", status: "0", priority: "0", date: "01-05-2025 07:00"} ]}
        ];
        saveInLocalStorage(savedProjekts);
    }
}

export function saveInLocalStorage(savedProjekts) {
    localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
}

/* FILTERS */  
export function filters(filter = 0) {
    const prevActive = document.querySelector(".filter__active");
    if (prevActive) {
        prevActive.classList.remove("filter__active");
    }

    if (filter === 0) { 
        document.getElementById("filterAll").classList.add("filter__active");
        savedProjekts =  JSON.parse(localStorage.getItem('savedProjekts'));
        drawTasksTable(savedProjekts);
    }
    if (filter === 2) {      
        document.getElementById("filterCompleted").classList.add("filter__active");
        let filteredSavedProjekts = savedProjekts
        .map(projekt => ({
            ...projekt,
            tasks: projekt.tasks.filter(task => task.status === "1")
        }))
        .filter(projekt => projekt.tasks.length > 0);
        drawTasksTable(filteredSavedProjekts); 
    }
    if (filter === 1) {
        document.getElementById("filter__today").classList.add("filter__active");
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate);

        let filteredSavedProjekts = savedProjekts
        .map(projekt => ({
            ...projekt,
            tasks: projekt.tasks.filter(task => task.date.slice(0,10) == formattedDate)
        }))
        .filter(projekt => projekt.tasks.length > 0);
        drawTasksTable(filteredSavedProjekts);
    }
}

filters();
drawProjektForm();