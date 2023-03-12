import './style.css';
import MainContainer from './modules/mainContainer.js';
import Storage from './modules/Storage';
import UI from './modules/UI';
import DialogBox from './modules/DialogBox';
import Note from './modules/Note';

// --------------------------------------------------------
window.addEventListener(
  'DOMContentLoaded',
  MainContainer.createContainer(),
  Storage.initializeLocalStorage(),
  UI.loadUI(),
  DialogBox.initialize(),
  Note.handleNoteCardControl()
);

window.addEventListener('storage', () => {
  UI.loadUI();
});

// --------------------------- TODO CONTROL --------------------
window.addEventListener('click', (e) => {
  if (e.target.className.includes('delete-todo-btn')) {
    //child is todo card
    const child = e.target.parentElement.parentElement;
    // parent is main-container
    const parent = child.parentElement;

    let index = Array.prototype.indexOf.call(parent.children, child);

    const todoArray = Storage.getTodoArrayFromStorage();

    todoArray.splice(index, 1);
    Storage.saveTodoArrayToStorage(todoArray);

    document
      .querySelector('.main-container-todo')
      .removeChild(
        document.querySelector('.main-container-todo').children[index]
      );

    // todo count
    UI.setTodoCount();
  }
});
