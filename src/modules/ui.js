import MainContainer from './mainContainer.js';
import Storage from './storage';

// sidebar menu buttons
const sidebarButtonArray = [
  document.querySelector('#home-btn'),
  document.querySelector('#today-btn'),
  document.querySelector('#week-btn'),
  document.querySelector('#notes-btn'),
];

export default class UI {
  // sidebarButtonAction and sidebarButtonListener reset the main container
  // with respect to clicked button
  static sidebarButtonAction(e) {
    MainContainer.clearContainer();
    MainContainer.template();

    // check event target id
    if (e === 'home-btn') {
    } else if (e === 'today-btn') {
    } else if (e === 'week-btn') {
    } else if (e === 'notes-btn') {
      const noteArray = Storage.getNoteArrayFromStorage();
      // create note cards
      for (let i = 0; i < noteArray.length; i++) {
        this.createNoteCard(noteArray[i]);
      }
    }
  }

  static sidebarButtonListeners() {
    sidebarButtonArray.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.sidebarButtonAction(e.target.id);
      });
    });
  }

  static createNoteCard(obj) {
    // object properties
    const title = obj.title;
    const details = obj.details;
    // ----- create elements ------
    // main container
    const noteContainer = document.createElement('div');
    // header elements
    const headerContainer = document.createElement('div');
    const noteTitle = document.createElement('p');
    const noteBtnContainer = document.createElement('div');
    const detailsBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    // body elements
    const noteDetails = document.createElement('p');

    // ----- add inner text  and text attributes-----
    noteTitle.innerHTML = title;
    noteDetails.innerHTML = details;

    // ----- append children -----
    // add header and body elements
    noteContainer.appendChild(headerContainer);
    noteContainer.appendChild(noteDetails);
    // add header's children
    headerContainer.appendChild(noteTitle);
    headerContainer.appendChild(noteBtnContainer);
    // add buttons
    noteBtnContainer.appendChild(detailsBtn);
    noteBtnContainer.appendChild(deleteBtn);
    // button property
    detailsBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('type', 'button');

    // ----- add classes -----
    noteContainer.classList.add('note-container');
    headerContainer.classList.add('note-header-container');
    noteTitle.classList.add('note-title');
    noteBtnContainer.classList.add('note-btn-container');
    detailsBtn.classList.add('note-btn', 'note-details-btn');
    deleteBtn.classList.add('note-btn', 'note-delete-btn');
    noteDetails.classList.add('note-details');

    // ----- add container to main container -----
    document.querySelector('.main-container').append(noteContainer);
  }

  static createTodo(obj) {
    // object properties
    const title = obj.title;
    const details = obj.details;
    const priority = obj.priority;

    // ----- create elements -----
    // main container
    const todoContainer = document.createElement('div');
    // left and right side container
    const leftContainer = document.createElement('div');
    const rightContainer = document.createElement('div');
    // left container children
    const isCheck = document.createElement('input');
    const todoTitle = document.createElement('p');
    // right container children
    const detailsBtn = document.createElement('button');
    const dateText = document.createElement('p');
    const changeTodoBtn = document.createElement('button');
    const deleteTodoBtn = document.createElement('button');

    // ----- append children -----
    // add left-right container
    todoContainer.appendChild(leftContainer);
    todoContainer.appendChild(rightContainer);
    // add left container children
    leftContainer.appendChild(isCheck);
    leftContainer.appendChild(todoTitle);
    // add right container children
    rightContainer.appendChild(detailsBtn);
    rightContainer.appendChild(dateText);
    rightContainer.appendChild(changeTodoBtn);
    rightContainer.appendChild(deleteTodoBtn);
    // ----- add container to main container -----
    document.querySelector('.main-container').append(todoContainer);

    // ----- button properties -----
    [detailsBtn, changeTodoBtn, deleteTodoBtn].forEach((button) => {
      button.setAttribute('type', 'button');
    });
    isCheck.setAttribute('type', 'checkbox');

    // ----- add classes -----
    todoContainer.classList.add('todo-container');
    isCheck.classList.add('isCheck');
    todoTitle.classList.add('todo-title');
    detailsBtn.classList.add('todo-details-btn');
    dateText.classList.add('date-text');
    changeTodoBtn.classList.add('note-btn', 'change-todo-btn');
    deleteTodoBtn.classList.add('note-btn', 'delete-todo-btn');
  }
}
