import MainContainer from '../modules/mainContainer';
import Storage from '../modules/Storage';
import UI from '../modules/UI';
import addPriorityButtons from './addPriorityButtons';

export function openEditTodoDialog(index, taskType) {
  // get the todo to be edited
  const todoArray = Storage.getTodoArrayFromStorage();
  const todoTitle = todoArray[index].title;
  const todoDetails = todoArray[index].details;

  // main template
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
  dialog.id = 'edit-todo-dialog';
  form.method = 'dialog';
  headerText.innerHTML = `Edit your ${taskType}`;
  submitBtn.innerHTML = 'Edit';
  submitBtn.type = 'submit';
  // we need former title and details to show user
  taskTitle.value = todoTitle;
  taskDetails.value = todoDetails;

  // add classes
  dialog.classList.add('dialog');
  header.classList.add('dialog-header');
  headerText.classList.add('dialog-header-text');
  exitBtn.classList.add('exit-btn');
  inputArea.classList.add('form-text-input-area');
  submitArea.classList.add('form-submit-area');
  taskTitle.classList.add('dialog-text');
  taskDetails.classList.add('dialog-text');
  submitBtn.classList.add('dialog-btn');

  // ---------- append children ----------
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
  // add priority buttons to the structure
  addPriorityButtons(submitArea);

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
    // get todo and change it's title, details and priority
    const todo = todoArray[index];
    todo.title = taskTitle.value;
    todo.details = taskDetails.value;
    todo.priority = document.querySelector(
      'input[name="priority"]:checked'
    ).value;
    // save new array to local storage
    Storage.saveTodoArrayToStorage(todoArray);
    // close dialog then remove it from DOM
    dialog.close();
    dialog.remove();
    // reload notes page
    MainContainer.clearContainer();
    UI.createHomePage();
  });

  return dialog;
}
