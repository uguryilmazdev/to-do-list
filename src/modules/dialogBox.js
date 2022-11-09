// Create a dialog window as project, task or note.

class TemplateDialogBox {

    // Create a new dialog box element template
    // It has only title element.
    template() {

        const inputArea = document.querySelector('.form-text-input-area');

        // check if any elements that created before
        while (inputArea.lastElementChild) {
            inputArea.removeChild(inputArea.lastElementChild);
        }

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
        }

        const textAttributes = {
            id: 'dialog-text',
            name: 'dialog-text',
            class: 'dialog-text',
            placeholder: 'Details',
        }

        // set attributes
        Object.keys(titleAttributes).forEach((attr) => {
            dialogTitle.setAttribute(attr, titleAttributes[attr]);
        })

        Object.keys(textAttributes).forEach((attr) => {
            dialogText.setAttribute(attr, textAttributes[attr]);
        })

        inputArea.appendChild(dialogTitle);
        inputArea.appendChild(dialogText);

        return inputArea;
    }

}

export default class DialogBox extends TemplateDialogBox {

    // note template
    setDialogAsNote() {

        super.template();

    }

    // todo template
    setDialogAsTodo() {

        super.template();

    }

    // project template
    setDialogAsProject() {

        super.template();
        
        // remove text area element. 
        // Projects need only title.
        document.querySelector('.dialog-text').remove();

    }
}
