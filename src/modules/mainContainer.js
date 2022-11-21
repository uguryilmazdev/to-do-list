const main = document.querySelector('main');

export default class MainContainer {
  mainContainerTemplate() {
    // check if any container within main
    while (main.lastElementChild) {
      main.removeChild(main.lastElementChild);
    }

    // create container
    const container = document.createElement('div');
    container.classList.add('main-container');

    main.append(container);
  }

  clearContainer() {
    while (main.firstChild.lastElementChild) {
      main.firstChild.removeChild(main.firstChild.lastElementChild);
    }
  }
}
