import DialogBoxTemplate from './DialogBoxTemplate';
import Note from './Note';
import Storage from './Storage';
import Todo from './Todo';
import Project from './Project';
import { selectedProject } from './UI';

export default class DialogBox extends DialogBoxTemplate {
  static initialize() {
    this.openDialogBox();
    this.closeDialogBox();
    this.handleDialogBoxOnClick();
  }

  // reset button style
  static resetButtonStyle() {
    const btnArray = ['#todo-btn', '#note-btn', '#project-btn'];

    btnArray.forEach((btn) => {
      document.querySelector(btn).style.backgroundColor = '#fefcfe';
      document.querySelector(btn).style.color = '#2a3444';
    });
  }

  static resetPriorityButtonStyle() {
    const btnArray = [
      '#low-input-priority',
      '#medium-input-priority',
      '#high-input-priority',
    ];

    btnArray.forEach((btn) => {
      document.querySelector(btn).style.backgroundColor = '#fefcfe';
      if (btn === btnArray[0]) {
        document.querySelector(btn).style.color = 'green';
      } else if (btn === btnArray[1]) {
        document.querySelector(btn).style.color = 'orange';
      } else if (btn === btnArray[2]) {
        document.querySelector(btn).style.color = 'red';
      }
    });
  }

  static openDialogBox() {
    // open default dialog menu
    document.querySelector('#add-project').addEventListener('click', () => {
      document.querySelector('dialog').showModal();
      this.setDialogAsTodo();
    });
  }

  static closeDialogBox() {
    // close
    document.querySelector('#exit-btn').addEventListener('click', () => {
      document.querySelector('dialog').close();
    });
  }

  static handleDialogBoxOnClick() {
    let clickedTask = '';

    // change dialog box ui to todo
    document.querySelector('#todo-btn').addEventListener('click', () => {
      this.setDialogAsTodo();
      this.resetButtonStyle();
      document.querySelector('#todo-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#todo-btn').style.color = '#ff7373';
      clickedTask = 'todo-btn';
    });

    // change dialog box ui to note
    document.querySelector('#note-btn').addEventListener('click', () => {
      this.setDialogAsNote();
      this.resetButtonStyle();
      document.querySelector('#note-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#note-btn').style.color = '#ff7373';
      clickedTask = 'note-btn';
    });

    // change dialog box ui to project
    document.querySelector('#project-btn').addEventListener('click', () => {
      this.setDialogAsProject();
      this.resetButtonStyle();
      document.querySelector('#project-btn').style.backgroundColor = '#fadb44';
      document.querySelector('#project-btn').style.color = '#ff7373';
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
      document.querySelector('input[name="priority"]:checked').value,
      project
    );

    Todo.createTodo(todo);
    Storage.addItemToTodoArray(todo);
  }

  static submitNote(obj) {
    // create note object
    const note = new Note(obj['dialog-title'], obj['dialog-text']);

    Note.createNoteCard(note);
    Storage.addItemToNoteArray(note);
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
