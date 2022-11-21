export default class Storage {
  static setInitialArrays() {
    // set note list within local storage
    if (!localStorage.noteList) {
      const noteArray = [];
      localStorage.setItem('noteList', JSON.stringify(noteArray));
    }
  }

  static addItemToNoteArray(obj) {
    const title = obj.title;
    const details = obj.details;

    const noteArray = JSON.parse(localStorage.getItem('noteList'));
    noteArray.push({
      title: title,
      details: details,
    });

    localStorage.setItem('noteList', JSON.stringify(noteArray));
  }

  static saveNoteArrayToStorage(data) {
    localStorage.setItem('noteList', JSON.stringify(data));
  }

  static getNoteArrayFromStorage() {
    return JSON.parse(localStorage.getItem('noteList'));
  }
}
