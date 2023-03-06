export default class Storage {
  static setInitialArrays() {
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
  }

  static saveTodoArrayToStorage(data) {
    localStorage.setItem('todoList', JSON.stringify(data));
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
  }

  static saveNoteArrayToStorage(data) {
    localStorage.setItem('noteList', JSON.stringify(data));
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
  }

  static saveProjectArrayToStorage(data) {
    localStorage.setItem('projectList', JSON.stringify(data));
  }

  static getProjectArrayFromStorage() {
    return JSON.parse(localStorage.getItem('projectList'));
  }
}
