import './style.css';
import plusIcon from './plus-circle.png';
import DialogBox from './modules/dialogBox.js';
import MainContainer from './modules/mainContainer.js';


// dilog screen buttons
const dialog = document.querySelector('dialog');
const addButton = document.querySelector("#add-project");
const closeButton = document.querySelector('#exit-btn');
const todoButton = document.querySelector('#todo-btn');
const noteButton = document.querySelector('#note-btn');
const projectButton = document.querySelector('#project-btn');
const createForm = document.querySelector('form');

// sidebar menu buttons
const homeBtn = document.querySelector('#home-btn');
const todayBtn = document.querySelector('#today-btn');
const weekBtn = document.querySelector('#week-btn');
const notesBtn = document.querySelector('#notes-btn');

// --------------------------------------------------------

const dialogBox = new DialogBox();
const mainContainer = new MainContainer();

// dialog menu control - open
addButton.addEventListener('click', () => {
    dialog.showModal();
    dialogBox.setDialogAsTodo();
});
// todo
todoButton.addEventListener('click', () => {
    dialogBox.setDialogAsTodo();
});
// note
noteButton.addEventListener('click', () => {
    dialogBox.setDialogAsNote();
});
// project
projectButton.addEventListener('click', () => {
    dialogBox.setDialogAsProject();
});
// close
closeButton.addEventListener('click', () => {
    dialog.close();
})
//create
createForm.addEventListener('submit', () => {
    const todoCreator = new TodoCreator('thisTitle','thisDetails','thispriority');
    todoCreator.createContainer();
})

// sidebar menu action
homeBtn.addEventListener('click', () => {
    mainContainer.mainContainerTemplate();
})

todayBtn.addEventListener('click', () => {
    mainContainer.mainContainerTemplate();
})

weekBtn.addEventListener('click', () => {
    mainContainer.mainContainerTemplate();
})

notesBtn.addEventListener('click', () => {
    mainContainer.mainContainerTemplate();
})