// Create a dialog window as project, task or note.

function setDialogAsTodo() {
    
}

function setDialogAsNote() {
    
    const inputArea = document.querySelector('.form-text-input-area');
    
    while (inputArea.lastElementChild) {
        inputArea.removeChild(inputArea.lastElementChild);
    }

    // create elements
    const dialogTitle = document.createElement('input');
    const dialogText = document.createElement('textarea');

    // attributes
    const titleAttributes = {
        type: 'text',
        id: 'dialog-title',
        name: 'dialog-title',
        class: 'dialog-title',
        placeholder: 'Title',
    }

    const textAttributes = {
        id: 'dialog-text',
        name: 'dialog-text',
        class: 'dialog-text',
        placeholder: 'Details',
    }

    // set attributes
    Object.keys(titleAttributes).forEach((attr) => {
        dialogTitle.setAttribute(attr,titleAttributes[attr]);
    })

    Object.keys(textAttributes).forEach((attr) => {
        dialogText.setAttribute(attr,textAttributes[attr]);
    })

    inputArea.appendChild(dialogTitle);
    inputArea.appendChild(dialogText);

}

function setDialogAsProject() {

}

export {setDialogAsProject, setDialogAsTodo, setDialogAsNote};



