import './style.css';
import plusIcon from './plus-circle.png';
import DialogBox from './modules/dialogBox.js';
import MainContainer from './modules/mainContainer.js';
import NoteCreator from './modules/createTask';
import Storage from './modules/storage';

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
const storage = new Storage();

window.addEventListener(
  'DOMContentLoaded',
  mainContainer.mainContainerTemplate()
);

// ---------------------------- DIALOG -----------------------------------
// open defaul dialog menu
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

// ----------------------------- NOTE CONTROL -------------------------
window.addEventListener('click', (e) => {
  if (e.target.className.includes('note-delete-btn')) {
    // child is note card
    const child = e.target.parentElement.parentElement.parentElement;
    // parent is main-container
    const parent = child.parentElement;

    let index = Array.prototype.indexOf.call(parent.children, child);

    storage.getNoteListArray().splice(index, 1);
    storage.saveNoteList(storage.getNoteListArray());

    document
      .querySelector('.main-container')
      .removeChild(document.querySelector('.main-container').children[index]);
  }
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
