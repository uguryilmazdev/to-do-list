const main = document.querySelector('main');

export default class MainContainer {
  static template() {
    // check if any container within main
    while (main.lastElementChild) {
      main.removeChild(main.lastElementChild);
    }

    // create container
    const container = document.createElement('div');

    main.append(container);
  }

  static clearContainer() {
    while (main.firstChild.lastElementChild) {
      main.firstChild.removeChild(main.firstChild.lastElementChild);
    }
  }
}
