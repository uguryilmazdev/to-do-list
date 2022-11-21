import MainContainer from './mainContainer.js';
import Storage from './storage';

// sidebar menu buttons
const sidebarButtonArray = [
  document.querySelector('#home-btn'),
  document.querySelector('#today-btn'),
  document.querySelector('#week-btn'),
  document.querySelector('#notes-btn'),
];

export default class UI {
  // sidebarButtonAction and sidebarButtonListener reset the main container
  // with respect to clicked button
  static sidebarButtonAction(e) {
    MainContainer.clearContainer();
    MainContainer.template();

    // check event target id
    if (e === 'home-btn') {
    } else if (e === 'today-btn') {
    } else if (e === 'week-btn') {
    } else if (e === 'notes-btn') {
      const noteArray = Storage.getNoteArrayFromStorage();
      // create note cards
      for (let i = 0; i < noteArray.length; i++) {
        this.createNoteCard(noteArray[i].title, noteArray[i].details);
      }
    }
  }

  static sidebarButtonListeners() {
    sidebarButtonArray.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.sidebarButtonAction(e.target.id);
      });
    });
  }

  static createNoteCard(title, details) {
    // ----- create elements ------
    // main container
    this.noteContainer = document.createElement('div');
    // header elements
    this.headerContainer = document.createElement('div');
    this.noteTitle = document.createElement('p');
    this.noteBtnContainer = document.createElement('div');
    this.detailsBtn = document.createElement('button');
    this.deleteBtn = document.createElement('button');
    // body elements
    this.noteDetails = document.createElement('p');

    // ----- add inner text  and text attributes-----
    this.noteTitle.innerHTML = title;
    this.noteDetails.innerHTML = details;

    // ----- append children -----
    // add header and body elements
    this.noteContainer.appendChild(this.headerContainer);
    this.noteContainer.appendChild(this.noteDetails);
    // add header's children
    this.headerContainer.appendChild(this.noteTitle);
    this.headerContainer.appendChild(this.noteBtnContainer);
    // add buttons
    this.noteBtnContainer.appendChild(this.detailsBtn);
    this.noteBtnContainer.appendChild(this.deleteBtn);
    // button property
    this.detailsBtn.setAttribute('type', 'button');
    this.deleteBtn.setAttribute('type', 'button');

    // ----- add classes -----
    this.noteContainer.classList.add('note-container');
    this.headerContainer.classList.add('note-header-container');
    this.noteTitle.classList.add('note-title');
    this.noteBtnContainer.classList.add('note-btn-container');
    this.detailsBtn.classList.add('note-btn', 'note-details-btn');
    this.deleteBtn.classList.add('note-btn', 'note-delete-btn');
    this.noteDetails.classList.add('note-details');

    // ----- add container to main container -----
    document.querySelector('.main-container').append(this.noteContainer);
  }
}
