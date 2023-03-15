import uniqid from 'uniqid';
import Storage from './Storage';
import UI from './UI';
import { openDetailsDialogScreen } from '../utilities/openDetailsDialogScreen';
import { openEditDialogScreen } from '../utilities/openEditDialogScreen';

export default class Todo {
  constructor(title, details, priority, project) {
    this._title = title;
    this._details = details;
    this._priority = priority;
    this._project = project;
    this._key = uniqid('todo-');
  }

  // ----------- getter - setter ----------
  // title
  set title(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  // details
  set details(details) {
    this._details = details;
  }

  get details() {
    return this._details;
  }

  // priority
  set priority(priority) {
    this._priority = priority;
  }

  get priority() {
    return this._priority;
  }

  // project
  get project() {
    return this._project;
  }

  // key
  get key() {
    return this._key;
  }

  // ---------- class functions ----------
  static createTodo(obj) {
    // object properties
    const title = obj.title;
    const details = obj.details;
    const priority = obj.priority;
    const project = obj.project;
    const key = obj.key;

    // ----- create elements -----
    // main container
    const todoContainer = document.createElement('div');
    todoContainer.setAttribute('id', key);
    // left and right side container
    const leftContainer = document.createElement('div');
    const rightContainer = document.createElement('div');
    // left container children
    const labelContainer = document.createElement('label');
    const isCheck = document.createElement('input');
    const todoTitle = document.createElement('p');
    // right container children
    const detailsBtn = document.createElement('button');
    const dateText = document.createElement('p');
    const changeTodoBtn = document.createElement('button');
    const deleteTodoBtn = document.createElement('button');

    // inner HTML
    todoTitle.innerHTML = title;
    detailsBtn.innerHTML = 'Details';
    dateText.innerHTML = 'exampletext';

    // ----- append children -----
    // add left-right container
    todoContainer.appendChild(leftContainer);
    todoContainer.appendChild(rightContainer);
    // add left container children
    leftContainer.appendChild(labelContainer);
    labelContainer.appendChild(isCheck);
    labelContainer.appendChild(todoTitle);
    // add right container children
    rightContainer.appendChild(detailsBtn);
    rightContainer.appendChild(dateText);
    rightContainer.appendChild(changeTodoBtn);
    rightContainer.appendChild(deleteTodoBtn);

    // ----- button properties -----
    [detailsBtn, changeTodoBtn, deleteTodoBtn].map((button) => {
      button.setAttribute('type', 'button');
    });
    isCheck.setAttribute('type', 'checkbox');

    // ----- add classes -----
    todoContainer.classList.add('todo-container');
    rightContainer.classList.add('todo-sub-container');
    leftContainer.classList.add('todo-sub-container');
    labelContainer.classList.add('todo-label-container');
    isCheck.classList.add('isCheck');
    todoTitle.classList.add('todo-title');
    detailsBtn.classList.add('todo-details-btn', 'dialog-btn');
    dateText.classList.add('date-text');
    changeTodoBtn.classList.add('note-btn', 'edit-todo-btn');
    deleteTodoBtn.classList.add('note-btn', 'delete-todo-btn');

    // ----- add container to main container -----
    // change main container class
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');
    document.querySelector('.main-container-todo').append(todoContainer);
  }

  static handleTodoCartButtonsOnClick() {
    this.handleShowDetailsTodoCard();
    this.handleEditTodoCard();
    this.handleDeleteTodoCard();
  }

  static handleShowDetailsTodoCard() {
    window.addEventListener('click', (e) => {
      if (e.target.className.includes('todo-details-btn')) {
        // child is note card, and we need note card's id
        const child = e.target.parentElement.parentElement;
        // create dialog using id
        const dialog = openDetailsDialogScreen(child.id);
        dialog.showModal();
      }
    });
  }

  static handleEditTodoCard() {
    window.addEventListener('click', (e) => {
      if (e.target.className.includes('edit-todo-btn')) {
        // child is note card, and we need note card's id
        const child = e.target.parentElement.parentElement;
        // create dialog using id
        const dialog = openEditDialogScreen(child.id, 'todo');
        dialog.showModal();
      }
    });
  }

  static handleDeleteTodoCard() {
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

        const [sidebarItemArr] = UI.loadSidebarItems();
        // todo count
        UI.setTodoCount(sidebarItemArr);
      }
    });
  }
}
