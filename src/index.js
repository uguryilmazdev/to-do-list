import './style.css';
import plusIcon from './plus-circle.png';
import dialogPolyfill from 'dialog-polyfill'

import {setDialogAsProject, setDialogAsTask, setDialogAsNote} from './modules/dialogBox.js';

const addButton = document.querySelector("#add-project");

addButton.addEventListener("click", setDialogAsProject);