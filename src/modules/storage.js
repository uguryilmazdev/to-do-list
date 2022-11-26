import Project from './project';

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
    const title = obj.title;
    const details = obj.details;
    const priority = obj.priority;
    const project = obj.project;

    const todoArray = JSON.parse(localStorage.getItem('todoList'));
    todoArray.push({
      title: title,
      details: details,
      priority: priority,
      project: project,
    });

    localStorage.setItem('todoList', JSON.stringify(todoArray));
  }

  static saveTodoArrayToStorage(data) {
    localStorage.setItem('todoList', JSON.stringify(data));
  }

  static getTodoArrayFromStorage() {
    return JSON.parse(localStorage.getItem('todoList'));
  }

  // ----- NOTE -----
  static addItemToNoteArray(obj) {
    const title = obj.title;
    const details = obj.details;

    const noteArray = JSON.parse(localStorage.getItem('noteList'));
    noteArray.push({
      title: title,
      details: details,
    });

    localStorage.setItem('noteList', JSON.stringify(noteArray));
  }

  static saveNoteArrayToStorage(data) {
    localStorage.setItem('noteList', JSON.stringify(data));
  }

  static getNoteArrayFromStorage() {
    return JSON.parse(localStorage.getItem('noteList'));
  }

  // ----- PROJECT -----
  static addItemToProjectArray(obj) {
    const title = obj.title;

    const projectArray = JSON.parse(localStorage.getItem('projectList'));
    projectArray.push({
      title: title,
    });

    localStorage.setItem('projectList', JSON.stringify(projectArray));
  }

  static saveProjectArrayToStorage(data) {
    localStorage.setItem('projectList', JSON.stringify(data));
  }

  static getProjectArrayFromStorage() {
    return JSON.parse(localStorage.getItem('projectList'));
  }
}
