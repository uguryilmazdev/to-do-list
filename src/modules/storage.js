// initialize note, todo, project arrays
const noteArray = [];

export default class Storage {
  addItemToNoteArray(title, details) {
    noteArray.push({
      title: title,
      details: details,
    });
  }

  getNoteArray() {
    return noteArray;
  }

  saveNoteArrayToLocal(data) {
    localStorage.setItem('noteList', JSON.stringify(data));
  }
}
