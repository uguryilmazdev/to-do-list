import MainContainer from './mainContainer.js';
import Storage from './storage';

// sidebar menu buttons
const sidebarButtonArray = [
  document.querySelector('#home-btn'),
  document.querySelector('#today-btn'),
  document.querySelector('#week-btn'),
  document.querySelector('#notes-btn'),
];

const projectIdArray = [];
// this points the selected project on sidebar
let selectedProject;
export { selectedProject };

export default class UI {
  static loadUI() {
    this.sidebarButtonListeners();
    this.loadProjects();
    this.sidebarProjectsListeners();
    this.setTodoCount();
  }

  // sidebarButtonAction and sidebarButtonListener reset the main container
  // with respect to clicked button
  static sidebarButtonAction(e) {
    MainContainer.clearContainer();
    MainContainer.template();

    // check event target id
    if (e === document.querySelector('#home-btn')) {
      // refresh selected project
      selectedProject = 'home-btn';

      document
        .querySelector('main')
        .firstChild.classList.add('main-container-todo');

      // get todoArray
      const todoArray = Storage.getTodoArrayFromStorage();

      // create todos
      for (let i = 0; i < todoArray.length; i++) {
        this.createTodo(todoArray[i]);
      }
    } else if (e === document.querySelector('#today-btn')) {
      // refresh selected project
      selectedProject = 'today-btn';
    } else if (e === document.querySelector('#week-btn')) {
      // refresh selected project
      selectedProject = 'week-btn';
    } else if (e === document.querySelector('#notes-btn')) {
      document
        .querySelector('main')
        .firstChild.classList.add('main-container-note');
      const noteArray = Storage.getNoteArrayFromStorage();
      // create note cards
      for (let i = 0; i < noteArray.length; i++) {
        this.createNoteCard(noteArray[i]);
      }
    } else if (projectIdArray.find((element) => element === e)) {
      // add todo container to main
      document
        .querySelector('main')
        .firstChild.classList.add('main-container-todo');

      const index = projectIdArray.indexOf(e); // index of clicked project
      const projectList = Storage.getProjectArrayFromStorage();
      const todoList = Storage.getTodoArrayFromStorage();
      selectedProject = projectList[index];
      console.log(selectedProject);
      // scan todoList for selected project's todos
      for (let i = 0; i < todoList.length; i++) {
        const projectName = todoList[i].project;

        // create todo card
        if (projectName === selectedProject.title) {
          this.createTodo(todoList[i]);
        }
      }
    }
  }

  static sidebarButtonListeners() {
    sidebarButtonArray.forEach((button) => {
      button.addEventListener('click', () => {
        this.sidebarButtonAction(button);
      });
    });
  }

  static sidebarProjectsListeners() {
    projectIdArray.forEach((project) => {
      project.addEventListener('click', () => {
        this.sidebarButtonAction(project);
      });
    });
  }

  // ----- NOTE -----
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
    // change main container class
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-note');
    document.querySelector('.main-container-note').append(noteContainer);
  }

  // ----- TODO -----
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
    [detailsBtn, changeTodoBtn, deleteTodoBtn].forEach((button) => {
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
    changeTodoBtn.classList.add('note-btn', 'change-todo-btn');
    deleteTodoBtn.classList.add('note-btn', 'delete-todo-btn');

    // ----- add container to main container -----
    // change main container class
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');
    document.querySelector('.main-container-todo').append(todoContainer);

    // todo count
    this.setTodoCount();
  }

  static setTodoCount() {
    const todoList = Storage.getTodoArrayFromStorage();
    const todoCount = todoList.length;
    document.querySelector('#home-todo-count').innerHTML = todoCount;
  }

  // ----- PROJECT -----
  static createProject(obj) {
    // object property
    const title = obj.title;

    // create elements
    const listedItem = document.createElement('li');
    const projectBtn = document.createElement('button');
    const countText = document.createElement('div');

    // add class
    listedItem.classList.add('projects-item');
    projectBtn.classList.add('project-name', 'nav-btn');
    countText.classList.add('project-count', 'to-do-count');

    // add project name to button
    projectBtn.innerHTML = title;
    projectBtn.setAttribute('type', 'button');
    projectBtn.setAttribute('id', title);

    // add children
    listedItem.appendChild(projectBtn);
    listedItem.appendChild(countText);

    document.querySelector('.projects').appendChild(listedItem);
  }

  static loadProjects() {
    const projectsArray = Storage.getProjectArrayFromStorage();

    projectsArray.forEach((project) => {
      // create sidebar project items
      this.createProject(project);
      // create array of sidebar project items' id
      projectIdArray.push(document.querySelector(`#${project.title}`));
    });
  }
}
