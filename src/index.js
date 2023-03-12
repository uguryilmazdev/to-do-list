import './style.css';
import MainContainer from './modules/mainContainer.js';
import Storage from './modules/Storage';
import UI from './modules/UI';
import DialogBox from './modules/DialogBox';
import Note from './modules/Note';
import Todo from './modules/Todo';

// --------------------------------------------------------
window.addEventListener(
  'DOMContentLoaded',
  MainContainer.createContainer(),
  Storage.initializeLocalStorage(),
  UI.loadUI(),
  DialogBox.initialize(),
  Todo.handleTodoCartControl(),
  Note.handleNoteCardControl()
);

window.addEventListener('storage', () => {
  UI.loadUI();
});
