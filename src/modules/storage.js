const noteListArray = [];

export default class Storage {
  saveNoteList(data) {
    localStorage.setItem('noteList', JSON.stringify(data));
  }

  getNoteListArray() {
    return noteListArray;
  }
}
