import uniqid from 'uniqid';

export default class Note {
  constructor(title, details) {
    this._title = title;
    this._details = details;
    this._key = uniqid('note-');
  }

  set title(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  set details(details) {
    this._details = details;
  }

  get details() {
    return this._details;
  }

  get key() {
    return this._key;
  }
}
