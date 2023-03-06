import uniqid from 'uniqid';

export default class Todo {
  constructor(title, details, priority, project) {
    this._title = title;
    this._details = details;
    this._priority = priority;
    this._project = project;
    this._key = uniqid('todo-');
  }

  // title
  set title(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  // details
  set details(details) {
    this._details = details;
  }

  get details() {
    return this._details;
  }

  // priority
  set priority(priority) {
    this._priority = priority;
  }

  get priority() {
    return this._priority;
  }

  // project
  get project() {
    return this._project;
  }

  // key
  get key() {
    return this._key;
  }
}
