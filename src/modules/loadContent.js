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
  MainContainer.createContainer(),
    MainContainer.clearContainer(),
    Storage.initializeLocalStorage(),
    /* await UI.loadUI(), */
    DialogBox.initialize(),
    Todo.handleTodoCartButtonsOnClick(),
    Note.handleNoteCardControl(),
    handleAuthPageItemsOnClick(),
    handleHeaderAuthItemsOnClick();
}
