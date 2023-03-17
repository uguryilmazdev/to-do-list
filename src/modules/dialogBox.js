import DialogBoxTemplate from './DialogBoxTemplate';
import Note from './Note';
import Storage from './Storage';
import Todo from './Todo';
import Project from './Project';
import UI from './UI';
import { selectedProject } from './UI';

export default class DialogBox extends DialogBoxTemplate {
  static initialize() {
    this.openDialogBox();
    this.closeDialogBox();
    this.handleDialogBoxTasksOnClick();
  }

  static resetButtonStyle(button) {
    const btnArray = ['#todo-btn', '#note-btn', '#project-btn'];

    // reset all dialog button style
    btnArray.forEach((btn) => {
      document.querySelector(btn).style.backgroundColor = '#f9f7f7';
      document.querySelector(btn).style.color = '#3f72af';
    });

    // change selected button style
    document.querySelector(`#${button}`).style.backgroundColor = '#3f72af';
    document.querySelector(`#${button}`).style.color = '#f9f7f7';
  }

  static openDialogBox() {
    // open default dialog menu
    document.querySelector('#add-project').addEventListener('click', () => {
      document.querySelector('#add-task-dialog').showModal();
      this.setDialogAsTodo();
    });
  }

  static closeDialogBox() {
    // close
    document
      .querySelector('#add-task-exit-btn')
      .addEventListener('click', () => {
        document.querySelector('dialog').close();
      });
  }

  static handleDialogBoxTasksOnClick() {
    let clickedTask = '';

    // change dialog box ui to todo
    document.querySelector('#todo-btn').addEventListener('click', (e) => {
      this.setDialogAsTodo();
      this.resetButtonStyle(e.target.id);
      clickedTask = 'todo-btn';
    });

    // change dialog box ui to note
    document.querySelector('#note-btn').addEventListener('click', (e) => {
      this.setDialogAsNote();
      this.resetButtonStyle(e.target.id);
      clickedTask = 'note-btn';
    });

    // change dialog box ui to project
    document.querySelector('#project-btn').addEventListener('click', (e) => {
      this.setDialogAsProject();
      this.resetButtonStyle(e.target.id);
      clickedTask = 'project-btn';
    });

    //create
    document.querySelector('form').addEventListener('submit', () => {
      // get form elements
      const elements = document.querySelector('form').elements;
      let obj = {};

      // get object properties
      for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        obj[item.name] = item.value;
      }
      if (clickedTask === 'todo-btn') {
        this.submitTodo(obj);
      } else if (clickedTask === 'note-btn') {
        this.submitNote(obj);
      } else if (clickedTask === 'project-btn') {
        this.submitProject(obj);
      }
    });
  }

  static submitTodo(obj) {
    // set the project that todo belongs to.
    let project;

    selectedProject.id === 'home-btn' ||
    selectedProject.id === 'today-btn' ||
    selectedProject.id === 'week-btn' ||
    selectedProject.id === 'notes-btn'
      ? (project = 'home-btn')
      : (project = selectedProject.id);

    // create todo object
    const todo = new Todo(
      obj['dialog-title'],
      obj['dialog-text'],
      obj['dueTo'],
      document.querySelector('input[name="priority"]:checked').value,
      project
    );

    Todo.createTodo(todo);
    Storage.addItemToTodoArray(todo);
    // reload page
    project === 'home-btn'
      ? UI.createHomePage(project)
      : UI.createProjectPage(project);
  }

  static submitNote(obj) {
    // create note object
    const note = new Note(obj['dialog-title'], obj['dialog-text']);

    Note.createNoteCard(note);
    Storage.addItemToNoteArray(note);
    //reload page
    UI.createNotesPage();
  }

  static submitProject(obj) {
    const projectList = Storage.getProjectArrayFromStorage();
    // check if project has already exist
    if (projectList.find((element) => element.title === obj['dialog-title'])) {
      alert('Project name has already exist');
    } else {
      // create project obj
      const project = new Project(obj['dialog-title']);
      Project.createProjectItem(project);
      Storage.addItemToProjectArray(project);
    }
  }
}
