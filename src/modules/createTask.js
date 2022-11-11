
export default class NoteCreator {

    constructor() {
        this.noteContainer = document.createElement('div');
        this.noteTitle = document.createElement('p');
        this.noteDetails = document.createElement('p');
    }

    createNoteContainer() {

        this.noteContainer.classList.add('noteContainer');
        this.noteTitle.classList.add('noteTitle');
        this.noteDetails.classList.add('noteDetails');

    }

}
