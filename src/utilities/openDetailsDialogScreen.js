import { isUserSignedIn } from '../firebase/handleAuthWithGoogle';
import {
  getProjectFromFirestore,
  getTodoFromFirestore,
} from '../firebase/handleFireStore';
import Storage from '../modules/Storage';

export async function openDetailsDialogScreen(id) {
  let title = null;
  let details = null;
  let projectID = null;

  // ---------- get selected todo ----------
  if (isUserSignedIn()) {
    const todo = await getTodoFromFirestore(id);
    // get title, details, and project
    title = todo.title;
    details = todo.details;
    projectID = todo.project;
  } else {
    const array = Storage.getTodoArrayFromStorage();
    // get title, details, and project
    array.map((todo) => {
      if (todo.key === id) {
        title = todo.title;
        details = todo.details;
        projectID = todo.project; //
      }
    });
  }

  // get project name of todo
  let projectName = '';
  if (isUserSignedIn()) {
    if (projectID !== 'todoHasNoProject') {
      const project = await getProjectFromFirestore(projectID);
      projectName = project.title;
    }
  } else {
    const projects = Storage.getProjectArrayFromStorage();
    projects.map((project) => {
      if (project.key === projectID) {
        projectName = project.title;
      }
    });
  }

  // ---------- main elements ----------
  const dialog = document.createElement('dialog');
  const header = document.createElement('div');
  const headerText = document.createElement('h4');
  const exitBtn = document.createElement('button');
  const body = document.createElement('div');
  const dialogTitle = document.createElement('div');
  const dialogText = document.createElement('div');

  // ---------- add classes ----------
  dialog.classList.add('dialog');
  header.classList.add('dialog-header');
  headerText.classList.add('dialog-header-text');
  exitBtn.classList.add('exit-btn');
  body.classList.add('form-text-input-area');
  dialogTitle.classList.add('dialog-title');
  dialogText.classList.add('dialog-text');

  // ---------- create structure ----------
  // add dialog to DOM
  const main = document.querySelector('main');
  main.parentNode.insertBefore(dialog, main.nextSibling);
  // append element child
  dialog.appendChild(header);
  dialog.appendChild(body);
  header.appendChild(headerText);
  header.appendChild(exitBtn);
  body.appendChild(dialogTitle);
  body.appendChild(dialogText);

  // put title and details into element
  headerText.innerHTML = projectName;
  dialogTitle.innerHTML = title;
  dialogText.innerHTML = details;

  // handle exit
  exitBtn.addEventListener('click', () => {
    // close dialog then remove it from DOM
    dialog.close();
    dialog.remove();
  });

  return dialog;
}
