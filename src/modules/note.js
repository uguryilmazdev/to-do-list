import uniqid from 'uniqid';
import Storage from './Storage';
import { openEditNoteDialog } from '../utilities/openEditNoteDialog';

export default class Note {
  constructor(title, details) {
    this._title = title;
    this._details = details;
    this._key = uniqid('note-');
  }

  // ---------- getter - setter -----------
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

  // ---------- add note card to UI ----------
  static createNoteCard(obj) {
    // object properties
    const title = obj.title;
    const details = obj.details;
    // ----- create elements ------
    // main container
    const noteContainer = document.createElement('div');
    // header elements
    const headerContainer = document.createElement('div');
    const noteTitle = document.createElement('p');
    const noteBtnContainer = document.createElement('div');
    const detailsBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    // body elements
    const noteDetails = document.createElement('p');

    // ----- add inner text  and text attributes-----
    noteTitle.innerHTML = title;
    noteDetails.innerHTML = details;

    // ----- append children -----
    // add header and body elements
    noteContainer.appendChild(headerContainer);
    noteContainer.appendChild(noteDetails);
    // add header's children
    headerContainer.appendChild(noteTitle);
    headerContainer.appendChild(noteBtnContainer);
    // add buttons
    noteBtnContainer.appendChild(detailsBtn);
    noteBtnContainer.appendChild(deleteBtn);
    // button property
    detailsBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('type', 'button');

    // ----- add classes -----
    noteContainer.classList.add('note-container');
    headerContainer.classList.add('note-header-container');
    noteTitle.classList.add('note-title');
    noteBtnContainer.classList.add('note-btn-container');
    detailsBtn.classList.add('note-btn', 'note-details-btn');
    deleteBtn.classList.add('note-btn', 'note-delete-btn');
    noteDetails.classList.add('note-details');

    // ----- add container to main container -----
    // change main container class
    document
      .querySelector('main')
      .firstChild.classList.add('main-container-note');
    document.querySelector('.main-container-note').append(noteContainer);
  }

  // ---------- note card listeners ----------
  static handleNoteCardControl() {
    this.handleDeleteNoteCard();
    this.handleEditNoteCard();
  }

  static handleDeleteNoteCard() {
    window.addEventListener('click', (e) => {
      if (e.target.className.includes('note-delete-btn')) {
        // child is note card
        const child = e.target.parentElement.parentElement.parentElement;
        // parent is main-container
        const parent = child.parentElement;

        let index = Array.prototype.indexOf.call(parent.children, child);

        const noteArray = Storage.getNoteArrayFromStorage();

        noteArray.splice(index, 1);
        Storage.saveNoteArrayToStorage(noteArray);

        document
          .querySelector('.main-container-note')
          .removeChild(
            document.querySelector('.main-container-note').children[index]
          );
      }
    });
  }

  static handleEditNoteCard() {
    window.addEventListener('click', (e) => {
      if (e.target.className.includes('note-details-btn')) {
        // child is note card
        const child = e.target.parentElement.parentElement.parentElement;
        // parent is main-container
        const parent = child.parentElement;

        // find note index from note array and open dialog to edit
        let index = Array.prototype.indexOf.call(parent.children, child);
        const dialog = openEditNoteDialog(index, 'note');
        dialog.showModal();
      }
    });
  }
}
