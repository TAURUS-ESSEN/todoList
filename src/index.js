'use strict';
 import "./style.css";
import { drawProjektTabelle, drawProjektForm } from "./dom.js";
import flatpickr from "flatpickr";
// import { Test } from "./projekt.js";

let savedProjekt =  JSON.parse(localStorage.getItem('savedProjekt'));
checkLocalStorage()

function checkLocalStorage() {
    console.log(savedProjekt);
    if (savedProjekt === null)  {
        savedProjekt = [ 
        { id: "000001", name: "Default", description: "just default projekt", tasks: [{id: "0000001", name: "einkaufen", description : "some text", status: "0", priority: "1"}, {id: "000003", name: "JS lernen", description : "Todo Projekt", status: "0", priority: "1"} ]}, 
        { id: "000004", name: "JS", description: "TODO projekt", tasks: [{id: "000005", name: "webpack", description : "install", status: "0", priority: "1"}, {id: "000002", name: "DOM function", description : "schreiben code", status: "0", priority: "1"} ]}
        ];
        localStorage.setItem('savedProjekt', JSON.stringify(savedProjekt));
        console.log('данные по умолчанию сохранены!');
    }
}

drawProjektTabelle();
drawProjektForm();

