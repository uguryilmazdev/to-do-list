import uniqid from 'uniqid';
import Storage from './Storage';
import UI from './UI';
import MainContainer from './mainContainer';
import '../styles/project.css';
import { deleteProjectFromFirestore } from '../firebase/handleFireStore';

export default class Project {
  constructor(title) {
    this._title = title;
    const time = new Date().getTime();
    this._key = uniqid('project-', `${time}`);
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

  static handleDeleteProject(id) {
    // create main elements
    const container = document.querySelector('.container-delete-project');
    const text = document.createElement('div');
    const button = document.createElement('button');

    // add class
    text.classList.add('text-delete-project');
    button.classList.add('button-delete-project');

    // attributes
    text.innerHTML = 'There is nothing to do!';
    button.type = 'button';
    button.innerHTML = 'DELETE PROJECT';

    // append child
    container.appendChild(text);
    container.appendChild(button);
    document.querySelector('main').appendChild(container);

    // handle delete project
    button.addEventListener('click', () => {
      // get project array
      const array = Storage.getProjectArrayFromStorage();
      // find project and delete it
      for (let i = 0; i < array.length; i++) {
        if (array[i].key === id) {
          array.splice(i, 1);
          // firestore
          deleteProjectFromFirestore(id);
        }
      }
      // save project array to local storage
      Storage.saveProjectArrayToStorage(array);

      // clear main container and reload home page
      MainContainer.clearContainer();
      MainContainer.createContainer();
      UI.createHomePage();
    });
  }
}
