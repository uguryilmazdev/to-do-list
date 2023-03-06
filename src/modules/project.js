import uniqid from 'uniqid';

export default class Project {
  constructor(title) {
    this._title = title;
    this._key = uniqid('project-');
  }

  set title(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  get key() {
    return this._key;
  }
}
