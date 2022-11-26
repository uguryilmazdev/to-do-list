export default class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setTodos(todo) {
    this.todos.push(todo);
  }

  getTodos() {
    return this.todos;
  }
}
