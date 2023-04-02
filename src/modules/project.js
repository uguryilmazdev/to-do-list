import uniqid from 'uniqid';
import Storage from './Storage';
import UI from './UI';
import MainContainer from './mainContainer';
import '../styles/project.css';
import {
  getTodoFromFirestore,
  getProjectFromFirestore,
  updateProjectFirestore,
  deleteProjectFromFirestore,
  getAllProjectsFromFirestore,
} from '../firebase/handleFireStore';
import { isUserSignedIn } from '../firebase/handleAuthWithGoogle';

export default class Project {
  constructor(title) {
    this._title = title;
    this._todoCount = 0;
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

  set todoCount(todoCount) {
    this._todoCount = todoCount;
  }

  get todoCount() {
    return this._todoCount;
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

  static async increaseTodoCountOfProjectInFirebase(projectKey) {
    if (projectKey !== 'todoHasNoProject') {
      /*     const todo = await getTodoFromFirestore(key);
    const projectOfTodo = todo.project; */
      const project = await getProjectFromFirestore(projectKey);
      let newTodoCount = project.todoCount + 1;
      project.todoCount = newTodoCount;
      updateProjectFirestore(project);
    }
  }

  static increaseTodoCountOfProjectInLocalStorage(key) {
    const projectList = Storage.getProjectArrayFromStorage();
    const updatedProjectList = projectList.map((project) => {
      if (project.key === key) {
        return { ...project, todoCount: project.todoCount + 1 };
      }
      return project;
    });
    Storage.saveProjectArrayToStorage(updatedProjectList);
  }

  static decreaseTodoCountOfProjectInLocalStorage(projectKey) {
    // get project list from local storage
    let projectList = Storage.getProjectArrayFromStorage();

    // edit todoCount of project
    projectList.map((project) => {
      if (project.key === projectKey) {
        project.todoCount--;
      }
    });

    // save updated project array
    Storage.saveProjectArrayToStorage(projectList);
  }

  static async decreaseTodoCountOfProjectInFirebase(key) {
    const todo = await getTodoFromFirestore(key);
    const projectOfTodo = todo.project;
    if (projectOfTodo !== 'todoHasNoProject') {
      const project = await getProjectFromFirestore(projectOfTodo);
      let newTodoCount = project.todoCount - 1;
      project.todoCount = newTodoCount;
      updateProjectFirestore(project);
    }
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
    container.id = `${id}delete-project`;
    text.innerHTML = 'There is nothing to do!';
    button.type = 'button';
    button.innerHTML = 'DELETE PROJECT';

    // append child
    container.appendChild(text);
    container.appendChild(button);
    document.querySelector('main').appendChild(container);

    // handle delete project
    button.addEventListener('click', async () => {
      if (isUserSignedIn()) {
        // firestore
        deleteProjectFromFirestore(id);
      } else {
        // get project array
        const array = Storage.getProjectArrayFromStorage();
        // find project and delete it
        for (let i = 0; i < array.length; i++) {
          if (array[i].key === id) {
            array.splice(i, 1);
            // save project array to local storage
            Storage.saveProjectArrayToStorage(array);
          }
        }
      }

      // clear main container and reload home page
      MainContainer.clearContainer();
      MainContainer.createContainer();
      UI.createHomePage();
      const sidebarItemArr = await UI.loadSidebarItems();
      // todo count
      UI.setTodoCount(sidebarItemArr);
    });
  }
}
