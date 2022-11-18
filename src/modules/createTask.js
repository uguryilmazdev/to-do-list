const noteArray = [];

export default class NoteCreator {
  constructor(title, details) {
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

    // add new note object to array
    noteArray.push({
      title: this.noteTitle.innerHTML,
      details: this.noteDetails.innerHTML,
    });

    console.log(noteArray);
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
