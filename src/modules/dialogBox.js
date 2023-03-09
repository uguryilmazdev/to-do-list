import DialogBoxTemplate from './DialogBoxTemplate';
import Note from './Note';
import Storage from './Storage';
import Todo from './Todo';
import Project from './Project';
import UI, { selectedProject } from './UI';

export default class DialogBox extends DialogBoxTemplate {
  static initialize() {
    this.openDialogBox();
    this.closeDialogBox();
    this.createTask();
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

  static createTask() {
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

      for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        obj[item.name] = item.value;
      }

      if (clickedTask === 'todo-btn') {
        console.log(clickedTask);
        // check if todo belongs any project
        let project;

        if (
          selectedProject === document.querySelector('#home-btn') ||
          selectedProject === document.querySelector('#today-btn') ||
          selectedProject === document.querySelector('#week-btn')
        ) {
          project = 'home-btn';
        } else {
          project = selectedProject.id;
        }

        // create todo obj
        const todo = new Todo(
          obj['dialog-title'],
          obj['dialog-text'],
          document.querySelector('input[name="priority"]:checked').value,
          project
        );

        Todo.createTodo(todo);

        Storage.addItemToTodoArray(todo);
        //UI.handleSidebarClick(selectedProject);
      } else if (clickedTask === 'note-btn') {
        // create note obj
        const note = new Note(obj['dialog-title'], obj['dialog-text']);

        Note.createNoteCard(note);
        Storage.addItemToNoteArray(note);
      } else if (clickedTask === 'project-btn') {
        const projectList = Storage.getProjectArrayFromStorage();
        // check if project name has already exist
        if (
          projectList.find((element) => element.title === obj['dialog-title'])
        ) {
          console.log('error');
        } else {
          // create project obj
          console.log(obj['dialog-title']);
          const project = new Project(obj['dialog-title']);
          Project.createProjectItem(project);
          Storage.addItemToProjectArray(project);
        }
      }
    });
  }
}
