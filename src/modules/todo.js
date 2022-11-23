export default class Todo {
  constructor(title, details, priority) {
    this.title = title;
    this.details = details;
    this.priority = priority;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setDetails(details) {
    this.details = details;
  }

  getDetails() {
    return this.details;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }
}
