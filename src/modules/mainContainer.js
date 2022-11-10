
class MainContainer {

    mainContainerTemplate() {

        const main = document.querySelector('main');

        // check if any container within main
        while (main.lastElementChild) {
            main.removeChild(main.lastElementChild);
        }
        return main;
    }
}

class NoteContainer extends MainContainer {

    createNoteContainer() {

        const main = super.mainContainerTemplate();

        // create container
        const container = document.createElement('div');
        container.classList.add('note-container-template');
        main.append(container);
        
    }
}

export { NoteContainer };