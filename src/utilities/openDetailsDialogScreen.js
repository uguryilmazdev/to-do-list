import Storage from '../modules/Storage';

export function openDetailsDialogScreen(index) {
  // ---------- get selected todo ----------
  const array = Storage.getTodoArrayFromStorage();
  // get title and details of todo
  const title = array[index].title;
  const details = array[index].details;

  // ---------- main elements ----------
  const dialog = document.createElement('dialog');
  const header = document.createElement('div');
  const headerText = document.createElement('h4');
  const exitBtn = document.createElement('button');
  const body = document.createElement('div');

  // ---------- add classes ----------
  dialog.classList.add('dialog');
  header.classList.add('dialog-header');
  headerText.classList.add('dialog-header-text');
  exitBtn.classList.add('exit-btn');
  body.classList.add('dialog-text', 'details-dialog-body');

  // ---------- create structure ----------
  // add dialog to DOM
  const main = document.querySelector('main');
  main.parentNode.insertBefore(dialog, main.nextSibling);
  // append element child
  dialog.appendChild(header);
  dialog.appendChild(body);
  header.appendChild(headerText);
  header.appendChild(exitBtn);

  // put title and details into element
  headerText.innerHTML = title;
  body.innerHTML = details;

  // handle exit
  exitBtn.addEventListener('click', () => {
    // close dialog then remove it from DOM
    dialog.close();
    dialog.remove();
  });

  return dialog;
}
