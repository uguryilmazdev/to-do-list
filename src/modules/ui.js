import MainContainer from './mainContainer.js';
import Storage from './Storage';
import Todo from './Todo.js';
import Project from './Project.js';
import Note from './Note.js';

let selectedProject;
export { selectedProject };

export default class UI {
  static loadUI() {
    const [sidebarItemArr] = this.loadSidebarItems();
    this.handleSidebarItemOnClick(sidebarItemArr);
    this.setTodoCount(sidebarItemArr);
  }

  // ----------- sidebar items ----------
  static loadSidebarItems() {
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
    const projectArray = Storage.getProjectArrayFromStorage();

    projectArray.forEach((project) => {
      // create sidebar project items
      Project.createProjectItem(project);
    });

    projectArray.map((project) => {
      const element = document.querySelector(`#${project.key}`);
      projectArr.push(element);
    });

    const sidebarItemArr = navbarArr.concat(projectArr);
    return [sidebarItemArr];
  }

  static handleSidebarItemOnClick(sidebarItemArr) {
    sidebarItemArr.forEach((item) => {
      item.addEventListener('click', () => {
        // clear main container and put template into it
        MainContainer.clearContainer();
        MainContainer.createContainer();

        // handle button click
        if (item.id === 'home-btn') {
          this.createHomePage(item);
        } else if (item.id === 'today-btn') {
          this.createTodayPage(item);
        } else if (item.id === 'week-btn') {
          this.createWeekPage(item);
        } else if (item.id === 'notes-btn') {
          this.createNotesPage();
        } else {
          this.createProjectPage(item);
        }
      });
    });
  }

  // ---------- pages ----------
  static createHomePage(item) {
    selectedProject = item;

    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');

    // get todoArray
    const todoArray = Storage.getTodoArrayFromStorage();
    // create todos
    todoArray.map((todo) => Todo.createTodo(todo));
  }

  static createTodayPage(item) {
    selectedProject = item;

    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');

    // get today todo's array
    const [arr] = this.getTodayTodo();
    // create todos
    arr.map((todo) => Todo.createTodo(todo));
  }

  static createWeekPage(item) {
    selectedProject = item;

    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');

    // get week todo's array
    const [arr] = this.getWeekTodo();
    // create todos
    arr.map((todo) => Todo.createTodo(todo));
  }

  static createNotesPage() {
    // set note container style to main
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-note');

    const noteArray = Storage.getNoteArrayFromStorage();
    // create note cards
    noteArray.map((note) => Note.createNoteCard(note));
  }

  static createProjectPage(item) {
    selectedProject = item;
    // add todo container to main
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-todo');

    const todoList = Storage.getTodoArrayFromStorage();

    // scan todoList for selected project's todos
    todoList.map((todo) => {
      const projectName = todo.project;
      if (projectName === item.id) {
        Todo.createTodo(todo);
      }
    });

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
      Project.handleDeleteProject(item.id);
    }
  }

  // ----------- task numbers ----------
  static setTodoCount(sidebarItemArr) {
    const todoList = Storage.getTodoArrayFromStorage();
    const todoCount = todoList.length;

    sidebarItemArr.map((item) => {
      // pass notes button
      if (item.id !== 'notes-btn') {
        let todoNumber = 0;
        const id = item.id;

        todoList.map((todo) => {
          if (todo.project === id) todoNumber++;
        });

        item.nextElementSibling.innerHTML = todoNumber;
      }
    });
    // home covers all todos.
    document.querySelector('#home-todo-count').innerHTML = todoCount;
    // today todos
    const [, todayCount] = this.getTodayTodo();
    document.querySelector('#today-todo-count').innerHTML = todayCount;
    // week todos
    const [, weekCount] = this.getWeekTodo();
    document.querySelector('#week-todo-count').innerHTML = weekCount;
  }

  // today and week todo
  static getTodayTodo() {
    // date
    const date = new Date().toISOString().split('T')[0];

    // get todoArray
    const todoArray = Storage.getTodoArrayFromStorage();
    // filter today's todo
    const arr = [];
    let count = 0;
    todoArray.map((todo) => {
      if (todo.dueTo === date) {
        arr.push(todo);
        count++;
      }
    });

    return [arr, count];
  }

  static getWeekTodo() {
    // get current date
    const date = new Date().toISOString().split('T')[0];
    // get one week later
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const oneWeekFromNow = now + oneWeek;
    const oneWeekLater = new Date(oneWeekFromNow).toISOString().split('T')[0];

    // get todoArray
    const todoArray = Storage.getTodoArrayFromStorage();
    // filter week's todo
    const arr = [];
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
