
export default class MainContainer {

    mainContainerTemplate() {

        const main = document.querySelector('main');

        // check if any container within main
        while (main.lastElementChild) {
            main.removeChild(main.lastElementChild);
        }

        // create container
        const container = document.createElement('div');
        container.classList.add('sidebar-element-container');
        main.append(container);

    }

}