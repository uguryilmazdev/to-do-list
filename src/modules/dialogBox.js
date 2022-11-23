// Open a dialog window that creates new project, task or note.

import Note from './note';
import UI from './ui';
import Storage from './storage';
import Todo from './todo';

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

    // create radio button container
    const lowLabelContainer = document.createElement('label');
    const mediumLabelContainer = document.createElement('label');
    const highLabelContainer = document.createElement('label');
    // create priority buttons
    const lowInput = document.createElement('input');
    const mediumInput = document.createElement('input');
    const highInput = document.createElement('input');
    // create text area
    const lowText = document.createElement('div');
    lowText.innerHTML = 'LOW';
    const mediumText = document.createElement('div');
    mediumText.innerHTML = 'MEDIUM';
    const highText = document.createElement('div');
    highText.innerHTML = 'HIGH';

    const lowAttr = {
      type: 'radio',
      id: 'low-input-priority',
      name: 'priority',
      value: 'LOW',
    };

    const mediumAttr = {
      type: 'radio',
      id: 'medium-input-priority',
      name: 'priority',
      value: 'MEDIUM',
    };

    const highAttr = {
      type: 'radio',
      id: 'high-input-priority',
      name: 'priority',
      value: 'HIGH',
    };

    // LOW
    Object.keys(lowAttr).forEach((attr) => {
      lowInput.setAttribute(attr, lowAttr[attr]);
    });

    // MEDIUM
    Object.keys(mediumAttr).forEach((attr) => {
      mediumInput.setAttribute(attr, mediumAttr[attr]);
    });

    // HIGH
    Object.keys(highAttr).forEach((attr) => {
      highInput.setAttribute(attr, highAttr[attr]);
    });

    // ----- append children -----
    lowLabelContainer.appendChild(lowInput);
    lowLabelContainer.appendChild(lowText);
    mediumLabelContainer.appendChild(mediumInput);
    mediumLabelContainer.appendChild(mediumText);
    highLabelContainer.appendChild(highInput);
    highLabelContainer.appendChild(highText);

    container.appendChild(lowLabelContainer);
    container.appendChild(mediumLabelContainer);
    container.appendChild(highLabelContainer);

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

    btnArray.forEach((btn) => {
      document.querySelector(btn).style.backgroundColor = '#fefcfe';
      document.querySelector(btn).style.color = '#2a3444';
    });
  }

  static resetPriorityButtonStyle() {
    const btnArray = [
      '#low-input-priority',
      '#medium-input-priority',
      '#high-input-priority',
    ];

    btnArray.forEach((btn) => {
      document.querySelector(btn).style.backgroundColor = '#fefcfe';
      if (btn === btnArray[0]) {
        document.querySelector(btn).style.color = 'green';
      } else if (btn === btnArray[1]) {
        document.querySelector(btn).style.color = 'orange';
      } else if (btn === btnArray[2]) {
        document.querySelector(btn).style.color = 'red';
      }
    });
  }

  // button click methods
  static dialogBoxButtonListeners() {
    // open default dialog menu
    document.querySelector('#add-project').addEventListener('click', () => {
      document.querySelector('dialog').showModal();
      this.setDialogAsTodo();
    });

    // check which event (task) clicked
    let clickedTask = [];

    // todo
    document.querySelector('#todo-btn').addEventListener('click', () => {
      this.setDialogAsTodo();
      this.resetButtonStyle();
      document.querySelector('#todo-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#todo-btn').style.color = '#ff7373';
      clickedTask = 'todo-btn';
    });

    // note
    document.querySelector('#note-btn').addEventListener('click', () => {
      this.setDialogAsNote();
      this.resetButtonStyle();
      document.querySelector('#note-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#note-btn').style.color = '#ff7373';
      clickedTask = 'note-btn';
    });

    // project
    document.querySelector('#project-btn').addEventListener('click', () => {
      this.setDialogAsProject();
      this.resetButtonStyle();
      document.querySelector('#project-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#project-btn').style.color = '#ff7373';
      clickedTask = 'project-btn';
    });

    // close
    document.querySelector('#exit-btn').addEventListener('click', () => {
      document.querySelector('dialog').close();
    });

    //create
    document.querySelector('form').addEventListener('submit', () => {
      // get form elements
      const elements = document.querySelector('form').elements;
      let obj = {};

      for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        obj[item.name] = item.value;
      }

      if (clickedTask === 'todo-btn') {
        // create todo obj
        const todo = new Todo(
          obj['dialog-title'],
          obj['dialog-text'],
          document.querySelector('input[name="priority"]:checked').value
        );

        UI.createTodo(todo);
        Storage.addItemToTodoArray(todo);
        UI.sidebarButtonAction('home-btn');
      } else if (clickedTask === 'note-btn') {
        // create note obj
        const note = new Note(obj['dialog-title'], obj['dialog-text']);

        UI.createNoteCard(note);
        Storage.addItemToNoteArray(note);
        UI.sidebarButtonAction('notes-btn');
      } else if (clickedTask === 'project-btn') {
      }
    });
  }
}
