import './style.css';
import MainContainer from './modules/mainContainer.js';
import Storage from './modules/storage';
import UI from './modules/ui';
import DialogBox from './modules/dialogBox';

// --------------------------------------------------------
window.addEventListener(
  'DOMContentLoaded',
  MainContainer.template(),
  Storage.setInitialArrays(),
  UI.sidebarButtonListeners(),
  DialogBox.dialogBoxButtonListeners()
);

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
