'use strict';
import "./style.css";
import { drawTasksTable, drawProjektForm } from "./dom.js";

let savedProjekts =  JSON.parse(localStorage.getItem('savedProjekts'));
checkLocalStorage();

function checkLocalStorage() {
    if (savedProjekts === null)  {
        savedProjekts = [ 
        { id: "000001", name: "Default", description: "just default projekt", tasks: [{id: "0000001", name: "einkaufen", description : "some text", status: "0", priority: "0", date: "27-03-2025 12:00"}, {id: "000003", name: "JS lernen", description : "Todo Projekt", status: "0", priority: "1", date: "22-06-2025 09:00"} ]}, 
        { id: "000004", name: "JS", description: "TODO projekt", tasks: [{id: "000005", name: "webpack", description : "install", status: "1", priority: "0", date: "28-11-2025 14:30"}, {id: "000002", name: "DOM function", description : "schreiben code", status: "0", priority: "0", date: "01-05-2025 07:00"} ]}
        ];
        localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
    }
}

drawTasksTable();
drawProjektForm();

