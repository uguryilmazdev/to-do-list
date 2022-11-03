
function setDialogAsProject() {
    const header = document.querySelector(".dialog-header-text");
    header.innerHTML = "Create a new project";
}

function setDialogAsTask() {
    const header = document.querySelector(".dialog-header-text");
    header.innerHTML = "Create a new task";
}

function setDialogAsNote() {
    const header = document.querySelector(".dialog-header-text");
    header.innerHTML = "Create a new note";
}

export {
    setDialogAsProject,
    setDialogAsTask,
    setDialogAsNote
}

