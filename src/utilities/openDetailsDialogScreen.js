import Storage from '../modules/Storage';

export function openDetailsDialogScreen(id) {
  // ---------- get selected todo ----------
  const array = Storage.getTodoArrayFromStorage();
  let title = '';
  let details = '';
  let projectID = '';
  // get title and details of todo
  array.map((todo) => {
    if (todo.key === id) {
      title = todo.title;
      details = todo.details;
      projectID = todo.project; //
    }
  });

  // get project name of todo
  const projects = Storage.getProjectArrayFromStorage();
  let projectName = '';
  projects.map((project) => {
    if (project.key === projectID) {
      projectName = project.title;
    }
  });

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
