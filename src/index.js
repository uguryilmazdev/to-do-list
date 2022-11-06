import './style.css';
import plusIcon from './plus-circle.png';
import {setDialogAsProject, setDialogAsTodo, setDialogAsNote} from './modules/dialogBox.js';

// dialog screen buttons
const dialog = document.querySelector('dialog');
const addButton = document.querySelector("#add-project");
const closeButton = document.querySelector('#exit-btn');
const todoButton = document.querySelector('#todo-btn');
const noteButton = document.querySelector('#note-btn');
const projectButton = document.querySelector('#project-btn');

// sidebar menu buttons
const homeBtn = document.querySelector('#home-btn');
const todayBtn = document.querySelector('#today-btn');
const weekBtn = document.querySelector('#week-btn');
const notesBtn = document.querySelector('#notes-btn');

// ---------------------------------------------------------

// dialog menu control
addButton.addEventListener('click', () => {
    dialog.showModal();
    setDialogAsTodo();
});

todoButton.addEventListener('click', () => {
    setDialogAsTodo();
});

noteButton.addEventListener('click', () => {
    setDialogAsNote();
});

projectButton.addEventListener('click', () => {
    setDialogAsProject();
});

closeButton.addEventListener('click', () => {
    dialog.close();
})

// sidebar menu action
homeBtn.addEventListener('click', () => {

})

todayBtn.addEventListener('click', () => {
    
})

weekBtn.addEventListener('click', () => {
    
})

notesBtn.addEventListener('click', () => {
    
})