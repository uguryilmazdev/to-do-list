import './style.css';
import DialogBox from './modules/dialogBox.js';
import MainContainer from './modules/mainContainer.js';
import Note from './modules/note';
import Storage from './modules/storage';
import UI from './modules/ui';

// dilog screen buttons
const dialog = document.querySelector('dialog');
const addButton = document.querySelector('#add-project');
const closeButton = document.querySelector('#exit-btn');
const todoButton = document.querySelector('#todo-btn');
const noteButton = document.querySelector('#note-btn');
const projectButton = document.querySelector('#project-btn');
const createForm = document.querySelector('form');

// --------------------------------------------------------

const dialogBox = new DialogBox();

window.addEventListener(
  'DOMContentLoaded',
  MainContainer.template(),
  Storage.setInitialArrays(),
  UI.sidebarButtonListeners()
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
  const note = new Note(
    document.querySelector('#dialog-title').value,
    document.querySelector('#dialog-text').value
  );

  UI.createNoteCard(note);
  Storage.addItemToNoteArray(note);
  UI.sidebarButtonAction('notes-btn');
});

// ----------------------------- NOTE CONTROL -------------------------
window.addEventListener('click', (e) => {
  if (e.target.className.includes('note-delete-btn')) {
    // child is note card
    const child = e.target.parentElement.parentElement.parentElement;
    // parent is main-container
    const parent = child.parentElement;

    let index = Array.prototype.indexOf.call(parent.children, child);

    const noteArray = Storage.getNoteArrayFromStorage();

    noteArray.splice(index, 1);
    Storage.saveNoteArrayToStorage(noteArray);

    document
      .querySelector('.main-container')
      .removeChild(document.querySelector('.main-container').children[index]);
  }
});
