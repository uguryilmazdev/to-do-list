import MainContainer from '../modules/mainContainer';
import Storage from '../modules/Storage';
import UI from '../modules/UI';
import addPriorityButtons from './addPriorityButtons';
import {
  updateNoteFirestore,
  getNoteFromFirestore,
  updateTodoFirestore,
  getTodoFromFirestore,
} from '../firebase/handleFireStore';
import { isUserSignedIn } from '../firebase/handleAuthWithGoogle';

export async function openEditDialogScreen(id, taskType) {
  // get todo or note based on taskType
  let task = null;
  let title = null;
  let details = null;
  let array = null;

  // ----- note task -----
  if (taskType === 'note') {
    if (isUserSignedIn()) {
      task = await getNoteFromFirestore(id);
      // get title and details of task
      title = task.title;
      details = task.details;
    } else {
      array = Storage.getNoteArrayFromStorage();
      // get title and details of task
      task = array.find((task) => task.key === id);
      title = task.title;
      details = task.details;
    }
  }

  // ----- todo task -----
  if (taskType === 'todo') {
    if (isUserSignedIn()) {
      task = await getTodoFromFirestore(id);
      // get title and details of task
      title = task.title;
      details = task.details;
    } else {
      array = Storage.getTodoArrayFromStorage();
      // get title and details of task
      task = array.find((task) => task.key === id);
      title = task.title;
      details = task.details;
    }
  }

  // ---------- create dialog elements ----------
  const dialog = document.createElement('dialog');
  const header = document.createElement('div');
  const headerText = document.createElement('h4');
  const exitBtn = document.createElement('button');
  const form = document.createElement('form');
  const inputArea = document.createElement('div');
  const submitArea = document.createElement('div');
  const taskTitle = document.createElement('input');
  const taskDetails = document.createElement('textarea');
  const submitBtn = document.createElement('button');

  // attributes
  dialog.id = 'edit-task-dialog';
  form.method = 'dialog';
  headerText.innerHTML = `Edit your ${taskType}`;
  submitBtn.innerHTML = 'Edit';
  submitBtn.type = 'submit';
  // former title and details to show user
  taskTitle.value = title;
  taskDetails.value = details;

  // add classes
  dialog.classList.add('dialog');
  header.classList.add('dialog-header');
  headerText.classList.add('dialog-header-text');
  exitBtn.classList.add('exit-btn');
  inputArea.classList.add('form-text-input-area');
  submitArea.classList.add('form-submit-area');
  taskTitle.classList.add('dialog-title');
  taskDetails.classList.add('dialog-text');
  submitBtn.classList.add('dialog-btn', 'dialog-submit-btn');

  // ----- append children -----
  // add dialog to DOM
  const main = document.querySelector('main');
  main.parentNode.insertBefore(dialog, main.nextSibling);
  // set dialog structure
  dialog.appendChild(header);
  dialog.appendChild(form);
  header.appendChild(headerText);
  header.appendChild(exitBtn);
  form.appendChild(inputArea);
  form.appendChild(submitArea);
  inputArea.appendChild(taskTitle);
  inputArea.appendChild(taskDetails);
  submitArea.appendChild(submitBtn);

  // if task is todo, add priority buttons and date
  if (taskType === 'todo') {
    // ----- add date input -----
    const date = document.createElement('input');
    date.type = 'date';
    date.name = 'dueTo';
    // set current dueTo
    date.value = task.dueTo;
    submitArea.prepend(date);

    // ----- add priority buttons -----
    addPriorityButtons(submitArea);
    // set todo's current priority clicked
    const priority = task.priority;
    const priorityBtn = document.querySelector(`input[value=${priority}]`);
    priorityBtn.click();
  }

  // ---------- handle edit and exit button click ----------
  // handle exit
  exitBtn.addEventListener('click', () => {
    // close dialog then remove it from DOM
    dialog.close();
    dialog.remove();
  });

  // handle edit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // get task and change it's title and details
    task.title = taskTitle.value;
    task.details = taskDetails.value;
    // if task is todo, user might change it's priority
    if (taskType === 'todo') {
      task.dueTo = document.querySelector('input[name="dueTo"]').value;
      task.priority = document.querySelector(
        'input[name="priority"]:checked'
      ).value;
    }

    // save edited task to local storage or firestore
    if (taskType === 'todo') {
      if (isUserSignedIn()) {
        updateTodoFirestore(task);
      } else {
        Storage.saveTodoArrayToStorage(array);
      }
    }

    if (taskType === 'note') {
      if (isUserSignedIn()) {
        updateNoteFirestore(task);
      } else {
        Storage.saveNoteArrayToStorage(array);
      }
    }

    // close dialog then remove it from DOM
    dialog.close();
    dialog.remove();

    // reload page
    MainContainer.clearContainer();
    if (taskType === 'todo') UI.createHomePage();
    if (taskType === 'note') UI.createNotesPage();
  });

  return dialog;
}
