import { savedProjekts } from "./dom.js";
import { projektConstructor } from "./class-constructor.js";
import { drawTasksTable, drawProjektForm } from "./dom.js";

export function schowProjektAddForm () {
    const schowForm = document.getElementById("modal_content");
    schowForm.style.display = "block";
    schowForm.querySelector(".close_modal_fenster").addEventListener("click", ()=>{
        schowForm.style.display = "none";
    })
}

export function createProjekt () {

    let projektName = document.getElementById("projektName"); 
    let projektDesc= document.getElementById("projektDesc");
    let projektId =  Date.now();
    let projektTasks = [];

    let newProjekt = new projektConstructor (projektId, projektName.value, projektDesc.value, projektTasks);
    savedProjekts.push(newProjekt);
    localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));

    const schowForm1 = document.querySelector(".modal");
    schowForm1.style.display = "none";  

    projektName.value = '';
    projektDesc.value = ''; 
    drawTasksTable();
    drawProjektForm ();
}

export function projektEditor (event) {
    const schowForm = document.getElementById("modal_edit_content");
    schowForm.style.display = "block";

    const inputProjektName = document.getElementById("projektNameEdit");
    const inputProjektDesc = document.getElementById("projektDescEdit");
    const hiddenKeyProjekt = document.querySelector(".hiddenKeyProjekt");

    inputProjektName.value = savedProjekts[event.dataset.projektindex].name;
    inputProjektDesc.value = savedProjekts[event.dataset.projektindex].description;
    hiddenKeyProjekt.id = event.dataset.projektindex;

    schowForm.querySelector(".close_modal_fenster").addEventListener("click", ()=>{
        schowForm.style.display = "none";
    })
}

export function saveProjektChanges() {
    const schowForm2 = document.getElementById("modal_edit_content");
    schowForm2.style.display = "none";  
    const input1 = document.getElementById("projektNameEdit");
    const input2 = document.getElementById("projektDescEdit");
    const projektId = document.querySelector(".hiddenKeyProjekt");
    savedProjekts[projektId.id].name = input1.value;
    savedProjekts[projektId.id].description = input2.value;
    localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
    drawTasksTable()
}

export function deleteProjekt() {
    const schowForm2 = document.getElementById("modal_edit_content");
    schowForm2.style.display = "none";  
    const projektId = document.querySelector(".hiddenKeyProjekt");
    console.log("удаляем id =" +projektId.id);
    savedProjekts.splice([projektId.id],1);
    localStorage.setItem('savedProjekts', JSON.stringify(savedProjekts));
    drawTasksTable();
    drawProjektForm ();
}

