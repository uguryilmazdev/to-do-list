import uniqid from 'uniqid';

export default class Project {
  constructor(title) {
    this._title = title;
    this._key = uniqid('project-');
  }

  // getter - setter
  set title(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  get key() {
    return this._key;
  }

  // add project item to UI
  static createProjectItem(obj) {
    // object property
    const title = obj.title;
    const key = obj.key;

    // create elements
    const listedItem = document.createElement('li');
    const projectBtn = document.createElement('button');
    const countText = document.createElement('div');

    // add class
    listedItem.classList.add('projects-item');
    projectBtn.classList.add('project-name', 'nav-btn');
    countText.classList.add('project-count', 'to-do-count');

    // add project name to button
    projectBtn.innerHTML = title;
    projectBtn.setAttribute('type', 'button');
    projectBtn.setAttribute('id', key);

    // add children
    listedItem.appendChild(projectBtn);
    listedItem.appendChild(countText);

    document.querySelector('.projects').appendChild(listedItem);
  }
}
