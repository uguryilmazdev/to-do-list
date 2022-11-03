import './style.css';
import plusIcon from './plus-circle.png';

import {setDialogAsProject, setDialogAsTask, setDialogAsNote} from './modules/dialogBox.js';

// dialog screen objects
const dialog = document.querySelector('dialog');
const addButton = document.querySelector("#add-project");
const closeButton = document.querySelector('#exit-btn');

addButton.addEventListener('click', () => {
    dialog.showModal();
    setDialogAsProject();
});

closeButton.addEventListener('click', () => {
    dialog.close();
})