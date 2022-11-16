import './style.css';
import plusIcon from './plus-circle.png';
import DialogBox from './modules/dialogBox.js';
import MainContainer from './modules/mainContainer.js';
import NoteCreator from './modules/createTask';

// dilog screen buttons
const dialog = document.querySelector('dialog');
const addButton = document.querySelector('#add-project');
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

window.addEventListener(
  'DOMContentLoaded',
  mainContainer.mainContainerTemplate()
);

// ---------------------------- DIALOG -----------------------------------
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
});
//create
createForm.addEventListener('submit', () => {
  const title = document.querySelector('#dialog-title').value;
  const details = document.querySelector('#dialog-text').value;
  const note = new NoteCreator(title, details);
});

// ------------------------------ SIDEBAR -----------------------------
// sidebar menu action
homeBtn.addEventListener('click', () => {
  mainContainer.mainContainerTemplate();
});

todayBtn.addEventListener('click', () => {
  mainContainer.mainContainerTemplate();
});

weekBtn.addEventListener('click', () => {
  mainContainer.mainContainerTemplate();
});

notesBtn.addEventListener('click', () => {
  mainContainer.mainContainerTemplate();
});
