export default class TodoCreator {

    constructor(title, details, priority) {
        this.title = title;
        this.details = details;
        this.priority = priority;

        // create todo card elements
        this.container = document.createElement('div');
        this.checkBox = document.createElement('input');
        this.titleText = document.createElement('div');
        this.detailsBtn = document.createElement('button');
        this.dueTimeText = document.createElement('div');
        this.editBtn = document.createElement('button');
        this.deleteBtn = document.createElement('button');
    }

    createContainer() {

        const main = document.querySelector('main');

        this.container.classList.add('todo-container');


           


        

    }

}
