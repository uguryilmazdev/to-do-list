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
  }

  // ----- TODO -----
  static addItemToTodoArray(obj) {
    const title = obj.title;
    const details = obj.details;
    const priority = obj.priority;

    const todoArray = JSON.parse(localStorage.getItem('todoList'));
    todoArray.push({
      title: title,
      details: details,
      priority: priority,
    });

    localStorage.setItem('todoList', JSON.stringify(todoArray));
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
}
