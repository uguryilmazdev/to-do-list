import MainContainer from './mainContainer';
import Storage from './Storage';
import UI from './UI';
import DialogBox from './DialogBox';
import Todo from './Todo';
import Note from './Note';
import {
  handleAuthPageItemsOnClick,
  handleHeaderAuthItemsOnClick,
} from './handleUserAuth';

export async function loadContent() {
  document.getElementById('loading').style.display = 'flex';
  MainContainer.createContainer(),
    MainContainer.clearContainer(),
    Storage.initializeLocalStorage(),
    toggleSidebar(),
    DialogBox.initialize(),
    Todo.handleTodoCartButtonsOnClick(),
    Note.handleNoteCardControl(),
    handleAuthPageItemsOnClick(),
    handleHeaderAuthItemsOnClick();
  document.getElementById('loading').style.display = 'none';
}

function toggleSidebar() {
  document
    .querySelector('.sidebar-toggle-button')
    .addEventListener('click', () => {
      const sidebar = document.querySelector('.navbar-content');
      sidebar.classList.toggle('active');
    });
}
