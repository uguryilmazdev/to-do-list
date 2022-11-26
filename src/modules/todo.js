export default class Todo {
  constructor(title, details, priority, project) {
    this.title = title;
    this.details = details;
    this.priority = priority;
    this.project = project;
  }

  // title
  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  // details
  setDetails(details) {
    this.details = details;
  }

  getDetails() {
    return this.details;
  }

  // priority
  setPriority(priority) {
    this.priority = priority;
  }

  getPriority() {
    return this.priority;
  }

  // project
  getProject() {
    return this.project;
  }
}
