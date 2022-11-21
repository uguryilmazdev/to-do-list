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
        this.createNoteCard(noteArray[i]);
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

  static createNoteCard(obj) {
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
    document.querySelector('.main-container').append(noteContainer);
  }
}
