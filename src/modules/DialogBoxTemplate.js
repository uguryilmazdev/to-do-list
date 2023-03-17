import addPriorityButtons from '../utilities/addPriorityButtons';

export default class DialogBoxTemplate {
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
      autocomplete: 'off',
      required: 'required',
    };

    const textAttributes = {
      id: 'dialog-text',
      name: 'dialog-text',
      class: 'dialog-text',
      placeholder: 'Details',
      autocomplete: 'off',
      required: 'required',
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
    createBtn.innerHTML = 'Create';

    const createBtnAttributes = {
      type: 'submit',
      id: 'dialog-create-btn',
      class: 'dialog-btn dialog-submit-btn',
    };

    // set attributes
    Object.keys(createBtnAttributes).forEach((attr) => {
      createBtn.setAttribute(attr, createBtnAttributes[attr]);
    });

    submitArea.appendChild(createBtn);

    return [inputArea, submitArea];
  }

  // Update the template based on the input from the user
  // ---------- TODO template ----------
  static setDialogAsTodo() {
    const [, submitArea] = this.template();

    // change flex design
    submitArea.style.justifyContent = 'space-between';

    // add date input
    const date = document.createElement('input');
    date.required = 'required';
    date.type = 'date';
    date.name = 'dueTo';
    submitArea.prepend(date);

    // priority buttons
    addPriorityButtons(submitArea);
  }

  // ---------- NOTE template ----------
  static setDialogAsNote() {
    const [, submitArea] = this.template();

    // change flex design
    submitArea.style.justifyContent = 'flex-end';
  }

  // ---------- PROJECT template ----------
  static setDialogAsProject() {
    const [, submitArea] = this.template();

    // change flex design
    submitArea.style.justifyContent = 'flex-end';

    // remove text area element.
    // Projects need only title.
    document.querySelector('.dialog-text').remove();
  }
}
