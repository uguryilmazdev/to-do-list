import MainContainer from './mainContainer.js';
import Storage from './Storage';
import Todo from './Todo.js';
import Project from './Project.js';
import Note from './Note.js';
import { isUserSignedIn } from '../firebase/handleAuthWithGoogle.js';
import {
  getAllNotesFromFireStore,
  getAllProjectsFromFirestore,
  getAllTodosFromFirestore,
} from '../firebase/handleFireStore';

let selectedProject;
export { selectedProject };

export default class UI {
  static async loadUI() {
    const sidebarItemArr = await this.loadSidebarItems();
    this.setTodoCount();
    this.handleSidebarItemOnClick(sidebarItemArr);
  }

  // ----------- sidebar items ----------
  static async loadSidebarItems() {
    // navigation items -> home, today, week, notes
    const navbarArr = [
      document.querySelector('#home-btn'),
      document.querySelector('#today-btn'),
      document.querySelector('#week-btn'),
      document.querySelector('#notes-btn'),
    ];

    // project items
    // clear if project container has child
    const container = document.querySelector('.projects');
    while (container.lastElementChild) {
      container.removeChild(container.lastElementChild);
    }

    // project element's container
    const projectArr = [];
    let projectArray = [];

    if (isUserSignedIn()) {
      projectArray = await getAllProjectsFromFirestore();
    } else {
      projectArray = Storage.getProjectArrayFromStorage();
    }

    projectArray.forEach((project) => {
      // create sidebar project items
      Project.createProjectItem(project);
    });

    projectArray.map((project) => {
      const element = document.querySelector(`#${project.key}`);
      projectArr.push(element);
    });

    const sidebarItemArr = navbarArr.concat(projectArr);
    console.log(sidebarItemArr);
    return sidebarItemArr;
  }

  static handleSidebarItemOnClick(sidebarItemArr) {
    sidebarItemArr.forEach((item) => {
      item.addEventListener('click', () => {
        // clear main container and put template into it
        MainContainer.clearContainer();
        MainContainer.createContainer();
        selectedProject = item;
        // handle button click
        if (item.id === 'home-btn') {
          this.createHomePage();
        } else if (item.id === 'today-btn') {
          this.createTodayPage();
        } else if (item.id === 'week-btn') {
          this.createWeekPage();
        } else if (item.id === 'notes-btn') {
          this.createNotesPage();
        } else {
          this.createProjectPage(item.id);
        }
      });
    });
  }

  // ---------- pages ----------
  static async createHomePage() {
    MainContainer.clearContainer();
    MainContainer.createContainer();
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');

    let todoArray = null;

    isUserSignedIn()
      ? (todoArray = await getAllTodosFromFirestore())
      : (todoArray = Storage.getTodoArrayFromStorage());

    todoArray.map((todo) => Todo.createTodo(todo));
  }

  static async createTodayPage() {
    MainContainer.clearContainer();
    MainContainer.createContainer();
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');

    // get today todo's array
    const [arr, count] = await this.getTodayTodo();
    arr.map((todo) => Todo.createTodo(todo));
  }

  static async createWeekPage() {
    MainContainer.clearContainer();
    MainContainer.createContainer();
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');

    // get week todo's array
    const [arr, count] = await this.getWeekTodo();
    // create todos
    arr.map((todo) => Todo.createTodo(todo));
  }

  static createNotesPage() {
    MainContainer.clearContainer();
    MainContainer.createContainer();
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-note');

    if (isUserSignedIn()) {
      getAllNotesFromFireStore();
    } else {
      const noteArray = Storage.getNoteArrayFromStorage();
      // create note cards
      noteArray.map((note) => Note.createNoteCard(note));
    }
  }

  static async createProjectPage(id) {
    // add todo container to main
    MainContainer.clearContainer();
    MainContainer.createContainer();
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');
    let todoList = null;
    isUserSignedIn()
      ? (todoList = await getAllTodosFromFirestore())
      : (todoList = Storage.getTodoArrayFromStorage());

    // scan todoList for selected project's todos
    todoList.map((todo) => {
      const projectName = todo.project;
      if (projectName === id) {
        Todo.createTodo(todo);
      }
    });
    this.handleDeleteProjectPage(id);
  }

  static handleDeleteProjectPage(id) {
    // if project has no todo, user can delete the project
    if (!document.querySelector('.main-container-todo').firstChild) {
      // reset main container
      MainContainer.clearContainer();
      MainContainer.createContainer();
      // add delete project container to main
      document
        .querySelector('main')
        .firstChild.classList.add('container-delete-project');

      // handle delete project
      Project.handleDeleteProject(id);
    }
  }

  // ----------- task numbers ----------
  static async setTodoCount() {
    // set project's todo count
    let projectList = null;
    isUserSignedIn()
      ? (projectList = await getAllProjectsFromFirestore())
      : (projectList = Storage.getProjectArrayFromStorage());
    projectList.map((item) => {
      const element = document.querySelector(`#${item.key}`);
      element.nextElementSibling.innerHTML = item.todoCount;
    });

    // set home, today and week todos
    const [, todayTodoCount, allTodoCount] = await this.getTodayTodo();
    const [, weekTodoCount] = await this.getWeekTodo();

    // set today and week todo count
    const homeElement = document.querySelector('#home-btn');
    homeElement.nextElementSibling.innerHTML = allTodoCount;
    const todayElement = document.querySelector('#today-btn');
    todayElement.nextElementSibling.innerHTML = todayTodoCount;
    const weekElement = document.querySelector('#week-btn');
    weekElement.nextElementSibling.innerHTML = weekTodoCount;
  }

  // today and week todo
  static async getTodayTodo() {
    let todoArray = null;
    // get all todos
    isUserSignedIn()
      ? (todoArray = await getAllTodosFromFirestore())
      : (todoArray = Storage.getTodoArrayFromStorage());

    // All todos count. Home button covers all todos
    const allTodoCount = todoArray.length;

    // get today date
    const todayDate = new Date().toISOString().split('T')[0];
    let arr = [];
    let todayCount = 0;
    todoArray.map((todo) => {
      if (todo.dueTo === todayDate) {
        arr.push(todo);
        todayCount++;
      }
    });
    return [arr, todayCount, allTodoCount];
  }

  static async getWeekTodo() {
    let todoArray = null;
    // get all todos
    isUserSignedIn()
      ? (todoArray = await getAllTodosFromFirestore())
      : (todoArray = Storage.getTodoArrayFromStorage());

    // get current date
    const date = new Date().toISOString().split('T')[0];
    // get one week later
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const oneWeekFromNow = now + oneWeek;
    const oneWeekLater = new Date(oneWeekFromNow).toISOString().split('T')[0];

    // filter week's todo
    let arr = [];
    let count = 0;
    todoArray.map((todo) => {
      if (todo.dueTo >= date && todo.dueTo <= oneWeekLater) {
        arr.push(todo);
        count++;
      }
    });

    return [arr, count];
  }
}
