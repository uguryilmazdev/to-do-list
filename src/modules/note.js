export default class Note {
  constructor(title, details) {
    this.title = title;
    this.details = details;
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
}
