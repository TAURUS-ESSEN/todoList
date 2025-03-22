import { filters, savedProjekts, saveInLocalStorage } from "./index.js";
import { projektConstructor } from "./class-constructor.js";
import { drawProjektForm } from "./dom.js";

export function schowProjektAddForm() {
    const schowForm = document.getElementById("modal_content");
    schowForm.style.display = "block";
    schowForm.querySelector(".close_modal_fenster").addEventListener("click", ()=>{
        schowForm.style.display = "none";
    })
}

export function createProjekt() {
    let projektName = document.getElementById("projektName"); 
    let projektDesc= document.getElementById("projektDesc");
    let projektId =  Date.now();
    let projektTasks = [];
    if (projektName.value == '') { return alert("Projekt name field is empty");}

    let newProjekt = new projektConstructor (projektId, projektName.value, projektDesc.value, projektTasks);
    savedProjekts.push(newProjekt);
    saveInLocalStorage(savedProjekts);

    const schowForm1 = document.querySelector(".modal");
    schowForm1.style.display = "none";  

    projektName.value = '';
    projektDesc.value = ''; 
    filters();
    drawProjektForm ();
}

export function projektEditor(event) {
    const schowForm = document.getElementById("modal_edit_content");
    schowForm.style.display = "block";

    let projektIndex = savedProjekts.findIndex(projekt => projekt.id === event.id);

    const inputProjektName = document.getElementById("projektNameEdit"); 
    const inputProjektDesc = document.getElementById("projektDescriptionEdit"); 
    const saveProjektButton = document.getElementById("button__saveProjektChanges");
    const deleteProjektButton = document.getElementById("button__deleteProjekt");
    saveProjektButton.dataset.currentprojekt = projektIndex;
    deleteProjektButton.dataset.currentprojekt = projektIndex;

    inputProjektName.value = savedProjekts[projektIndex].name;
    inputProjektDesc.value = savedProjekts[projektIndex].description; 
   
    schowForm.querySelector(".close_modal_fenster").addEventListener("click", ()=>{
        schowForm.style.display = "none";
    })
}

export function saveProjektChanges(projektIndex) {
    const inputProjektName = document.getElementById("projektNameEdit");
    const inputProjektDescriptionEdit = document.getElementById("projektDescriptionEdit");  
    if (inputProjektName.value == '') { return alert("Projekt name field is empty");}  
    const schowForm2 = document.getElementById("modal_edit_content");
    schowForm2.style.display = "none";  
    savedProjekts[projektIndex].name = inputProjektName.value;
    savedProjekts[projektIndex].description = inputProjektDescriptionEdit.value;
    saveInLocalStorage(savedProjekts);
    filters();
}

export function deleteProjekt(projektIndex) {
    const schowForm2 = document.getElementById("modal_edit_content");
    schowForm2.style.display = "none";  

    savedProjekts.splice(projektIndex,1);
    saveInLocalStorage(savedProjekts);
    filters();
    drawProjektForm ();
}

