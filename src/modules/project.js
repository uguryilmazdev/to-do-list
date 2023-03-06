import uniqid from 'uniqid';

export default class Project {
  constructor(title) {
    this.title = title;
    this.key = uniqid();
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
}
