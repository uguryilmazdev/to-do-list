export default class Storage {
  static initializeLocalStorage() {
    // set note list within local storage
    if (!localStorage.noteList) {
      const noteArray = [];
      localStorage.setItem('noteList', JSON.stringify(noteArray));
    }

    // set todo list within local storage
    if (!localStorage.todoList) {
      const todoArray = [];
      localStorage.setItem('todoList', JSON.stringify(todoArray));
    }

    // set project list within local storage
    if (!localStorage.projectList) {
      const projectArray = [];
      localStorage.setItem('projectList', JSON.stringify(projectArray));
    }
  }

  // ----- TODO -----
  static addItemToTodoArray(obj) {
    const item = [
      {
        title: obj.title,
        details: obj.details,
        priority: obj.priority,
        project: obj.project,
      },
    ];

    const todoArray = JSON.parse(localStorage.getItem('todoList'));
    const updatedArray = todoArray.concat(item);

    localStorage.setItem('todoList', JSON.stringify(updatedArray));
    window.dispatchEvent(new Event('storage'));
  }

  static saveTodoArrayToStorage(data) {
    localStorage.setItem('todoList', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  }

  static getTodoArrayFromStorage() {
    return JSON.parse(localStorage.getItem('todoList'));
  }

  // ----- NOTE -----
  static addItemToNoteArray(obj) {
    const item = [
      {
        title: obj.title,
        details: obj.details,
      },
    ];

    const noteArray = JSON.parse(localStorage.getItem('noteList'));
    const updatedArray = noteArray.concat(item);

    localStorage.setItem('noteList', JSON.stringify(updatedArray));
    window.dispatchEvent(new Event('storage'));
  }

  static saveNoteArrayToStorage(data) {
    localStorage.setItem('noteList', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  }

  static getNoteArrayFromStorage() {
    return JSON.parse(localStorage.getItem('noteList'));
  }

  // ----- PROJECT -----
  static addItemToProjectArray(obj) {
    const item = [
      {
        title: obj.title,
        key: obj.key,
      },
    ];

    const projectArray = JSON.parse(localStorage.getItem('projectList'));
    const updatedArray = projectArray.concat(item);

    localStorage.setItem('projectList', JSON.stringify(updatedArray));
    window.dispatchEvent(new Event('storage'));
  }

  static saveProjectArrayToStorage(data) {
    localStorage.setItem('projectList', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  }

  static getProjectArrayFromStorage() {
    return JSON.parse(localStorage.getItem('projectList'));
  }

  static getProjectDOMElements() {
    const projects = Storage.getProjectArrayFromStorage();
    const projectElements = [];

    projects.map((project) => {
      const element = document.querySelector(`#${project.key}`);
      projectElements.push(element);
    });
    return projectElements;
  }
}
