// Open a dialog window that creates new project, task or note.

import Note from './note';
import UI from './ui';
import Storage from './storage';

class TemplateDialogBox {
  // Create a new dialog box element template
  // It has only title element.
  static template() {
    const inputArea = document.querySelector('.form-text-input-area');
    const submitArea = document.querySelector('.form-submit-area');

    // check if any elements that created before within input area
    while (inputArea.lastElementChild) {
      inputArea.removeChild(inputArea.lastElementChild);
    }
    // check if any elements that created before within submit area
    while (submitArea.lastElementChild) {
      submitArea.removeChild(submitArea.lastElementChild);
    }

    // -------------------- input area -----------------------
    // create title and text area.
    const dialogTitle = document.createElement('input');
    const dialogText = document.createElement('textarea');

    // attributes
    const titleAttributes = {
      type: 'text',
      id: 'dialog-title',
      name: 'dialog-title',
      class: 'dialog-title',
      placeholder: 'Title',
      maxLength: '35',
    };

    const textAttributes = {
      id: 'dialog-text',
      name: 'dialog-text',
      class: 'dialog-text',
      placeholder: 'Details',
    };

    // set attributes
    Object.keys(titleAttributes).forEach((attr) => {
      dialogTitle.setAttribute(attr, titleAttributes[attr]);
    });

    Object.keys(textAttributes).forEach((attr) => {
      dialogText.setAttribute(attr, textAttributes[attr]);
    });

    inputArea.appendChild(dialogTitle);
    inputArea.appendChild(dialogText);

    // ---------------------- submit area -------------------
    const createBtn = document.createElement('button');

    const createBtnAttributes = {
      type: 'submit',
      id: 'dialog-create-btn',
      class: 'dialog-btn',
      value: 'Create',
    };

    // set attributes
    Object.keys(createBtnAttributes).forEach((attr) => {
      createBtn.setAttribute(attr, createBtnAttributes[attr]);
    });

    submitArea.append(createBtn);

    return [inputArea, submitArea];
  }
}

export default class DialogBox extends TemplateDialogBox {
  // note template
  static setDialogAsNote() {
    const [, submitArea] = super.template();

    // change flex design
    submitArea.style.justifyContent = 'flex-end';

    // change create button's text
    const createBtn = document.querySelector('#dialog-create-btn');
    createBtn.innerHTML = 'CREATE NOTE';
  }

  // todo template
  static setDialogAsTodo() {
    const [, submitArea] = super.template();

    // change flex design
    submitArea.style.justifyContent = 'space-between';

    // change create button's text
    const createBtn = document.querySelector('#dialog-create-btn');
    createBtn.innerHTML = 'CREATE TO DO';

    // ------------------- priority buttons ------------------
    // -------------------------------------------------------
    // create container of priority buttons
    const container = document.createElement('div');
    container.classList.add('priority-buttons-container');

    // create priority buttons
    const low = document.createElement('input');
    const medium = document.createElement('input');
    const high = document.createElement('input');

    const lowAttributes = {
      type: 'button',
      id: 'low-priority',
      name: 'priority',
      value: 'LOW',
      class: 'priority-btns dialog-btn',
    };

    const mediumAttributes = {
      type: 'button',
      id: 'medium-priority',
      name: 'priority',
      value: 'MEDIUM',
      class: 'priority-btns dialog-btn',
    };

    const highAttributes = {
      type: 'button',
      id: 'high-priority',
      name: 'priority',
      value: 'HIGH',
      class: 'priority-btns dialog-btn',
    };

    Object.keys(lowAttributes).forEach((attr) => {
      low.setAttribute(attr, lowAttributes[attr]);
    });
    Object.keys(mediumAttributes).forEach((attr) => {
      medium.setAttribute(attr, mediumAttributes[attr]);
    });
    Object.keys(highAttributes).forEach((attr) => {
      high.setAttribute(attr, highAttributes[attr]);
    });

    container.appendChild(low);
    container.appendChild(medium);
    container.appendChild(high);

    submitArea.prepend(container);
  }

  // project template
  static setDialogAsProject() {
    const [, submitArea] = super.template();

    // change flex design
    submitArea.style.justifyContent = 'flex-end';

    // change create button's text
    const createBtn = document.querySelector('#dialog-create-btn');
    createBtn.innerHTML = 'CREATE PROJECT';

    // remove text area element.
    // Projects need only title.
    document.querySelector('.dialog-text').remove();
  }

  // reset button style
  static resetButtonStyle() {
    const btnArray = ['#todo-btn', '#note-btn', '#project-btn'];

    // reset buttons' style
    btnArray.forEach((btn) => {
      document.querySelector(btn).style.backgroundColor = '#fefcfe';
      document.querySelector(btn).style.color = '#2a3444';
    });
  }

  // button click methods
  static dialogBoxButtonListeners() {
    // open default dialog menu
    document.querySelector('#add-project').addEventListener('click', () => {
      document.querySelector('dialog').showModal();
      this.setDialogAsTodo();
    });
    // todo
    document.querySelector('#todo-btn').addEventListener('click', (e) => {
      this.setDialogAsTodo();
      this.resetButtonStyle();
      document.querySelector('#todo-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#todo-btn').style.color = '#ff7373';
    });
    // note
    document.querySelector('#note-btn').addEventListener('click', () => {
      this.setDialogAsNote();
      this.resetButtonStyle();
      document.querySelector('#note-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#note-btn').style.color = '#ff7373';
    });
    // project
    document.querySelector('#project-btn').addEventListener('click', () => {
      this.setDialogAsProject();
      this.resetButtonStyle();
      document.querySelector('#project-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#project-btn').style.color = '#ff7373';
    });
    // close
    document.querySelector('#exit-btn').addEventListener('click', () => {
      document.querySelector('dialog').close();
    });
    //create
    document.querySelector('form').addEventListener('submit', () => {
      const note = new Note(
        document.querySelector('#dialog-title').value,
        document.querySelector('#dialog-text').value
      );

      UI.createNoteCard(note);
      Storage.addItemToNoteArray(note);
      UI.sidebarButtonAction('notes-btn');
    });
  }
}
