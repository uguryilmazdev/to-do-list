import uniqid from 'uniqid';
import Storage from './Storage';
import UI from './UI';
import { openDetailsDialogScreen } from '../utilities/openDetailsDialogScreen';
import { openEditDialogScreen } from '../utilities/openEditDialogScreen';
import { isUserSignedIn } from '../firebase/handleAuthWithGoogle';
import {
  addTodoToFirestore,
  deleteTodoFromFirestore,
  getTodoFromFirestore,
} from '../firebase/handleFireStore';
import Project from './Project';

export default class Todo {
  constructor(title, details, dueTo, priority, project) {
    this._title = title;
    this._details = details;
    this._isComplete = false;
    this._dueTo = dueTo;
    this._priority = priority;
    this._project = project;
    const time = new Date().getTime();
    this._key = uniqid('todo-', `${time}`);
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

  // isComplete
  get isComplete() {
    return this._isComplete;
  }

  // due to
  set dueTo(dueTo) {
    this._dueTo = dueTo;
  }

  get dueTo() {
    return this._dueTo;
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
    const isComplete = obj.isComplete;
    const dueTo = obj.dueTo;
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
    isCheck.checked = isComplete;
    todoTitle.innerHTML = title;
    detailsBtn.innerHTML = 'Details';
    dateText.innerHTML = dueTo;

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
    if (isComplete) todoContainer.classList.toggle('is-todo-complete');
    if (priority === 'LOW') todoContainer.classList.add('low-priority-border');
    if (priority === 'MEDIUM')
      todoContainer.classList.add('medium-priority-border');
    if (priority === 'HIGH')
      todoContainer.classList.add('high-priority-border');
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
    this.handleIsCompleteTodoCard();
  }

  static handleIsCompleteTodoCard() {
    window.addEventListener('click', async (e) => {
      if (e.target.className.includes('isCheck')) {
        // container is card
        const container = e.target.parentElement.parentElement.parentElement;

        if (isUserSignedIn()) {
          const todo = await getTodoFromFirestore(container.id);
          todo.isComplete = !todo.isComplete;
          addTodoToFirestore(todo);
        } else {
          const arr = Storage.getTodoArrayFromStorage();
          arr.map((todo) => {
            if (todo.key === container.id) {
              todo.isComplete = !todo.isComplete;
            }
          });
          Storage.saveTodoArrayToStorage(arr);
        }

        // add or remove container check style
        container.classList.toggle('is-todo-complete', e.target.checked);
      }
    });
  }

  static handleShowDetailsTodoCard() {
    window.addEventListener('click', async (e) => {
      if (e.target.className.includes('todo-details-btn')) {
        // child is note card, and we need note card's id
        const child = e.target.parentElement.parentElement;
        // create dialog using id
        const dialog = await openDetailsDialogScreen(child.id);
        dialog.showModal();
      }
    });
  }

  static handleEditTodoCard() {
    window.addEventListener('click', (e) => {
      if (e.target.className.includes('edit-todo-btn')) {
        // child is card, and we need card's id
        const child = e.target.parentElement.parentElement;
        // create dialog using id
        openEditDialogScreen(child.id, 'todo').then((dialog) => {
          dialog.showModal();
        });
      }
    });
  }

  static handleDeleteTodoCard() {
    window.addEventListener('click', async (e) => {
      let projectNameOfTodo = null;

      if (e.target.className.includes('delete-todo-btn')) {
        //child is todo card
        const child = e.target.parentElement.parentElement;
        // parent is main-container
        const parent = child.parentElement;

        if (isUserSignedIn()) {
          // decrease project's todo count
          await Project.decreaseTodoCountOfProjectInFirebase(child.id);
          // delete todo from firestore
          deleteTodoFromFirestore(child.id);
        } else {
          let index = Array.prototype.indexOf.call(parent.children, child);
          const todoArray = Storage.getTodoArrayFromStorage();
          projectNameOfTodo = todoArray[index].project;
          todoArray.splice(index, 1);
          Storage.saveTodoArrayToStorage(todoArray);
          // decrease project's todo count
          Project.decreaseTodoCountOfProjectInLocalStorage(projectNameOfTodo);
        }

        document
          .querySelector('.main-container-todo')
          .removeChild(document.querySelector(`#${child.id}`));

        if (projectNameOfTodo !== 'todoHasNoProject') {
          UI.handleDeleteProjectPage(projectNameOfTodo);
        } else {
          UI.createHomePage();
        }

        const sidebarItemArr = await UI.loadSidebarItems();
        // todo count
        UI.setTodoCount(sidebarItemArr);
      }
    });
  }
}
