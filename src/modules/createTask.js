export default class NoteCreator {
  constructor(title, details) {
    // create container elements
    this.noteContainer = document.createElement('div');
    this.noteTitle = document.createElement('p');
    this.noteDetails = document.createElement('p');

    this.noteTitle.innerHTML = title;
    this.noteDetails.innerHTML = details;

    this.noteContainer.appendChild(this.noteTitle);
    this.noteContainer.appendChild(this.noteDetails);

    // set classes
    this.noteContainer.classList.add('note-container');
    this.noteTitle.classList.add('note-title');
    this.noteDetails.classList.add('note-details');

    // add container to main container
    document.querySelector('.main-container').append(this.noteContainer);

    // add note to array
  }
}
