import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { getUserID, app } from './handleAuthWithGoogle';

// ---------- initalize firestore ----------
const db = getFirestore(app);

// ----- handle todos -----
function addTodoToFirestore(todo) {
  const todoRef = doc(db, 'users', getUserID(), 'todos', todo.key);
  setDoc(todoRef, { ...todo }, { capital: true }, { merge: true });
}

function updateTodoFirestore(todo) {
  const todoRef = doc(db, 'users', getUserID(), 'todos', todo.key);
  updateDoc(todoRef, { ...todo }, { capital: true });
}

async function deleteTodoFromFirestore(key) {
  await deleteDoc(doc(db, 'users', getUserID(), 'todos', key));
}

// ----- handle notes -----
function addNoteToFirestore(note) {
  const noteRef = doc(db, 'users', getUserID(), 'notes', note.key);
  setDoc(noteRef, { ...note }, { capital: true }, { merge: true });
}

function updateNoteFirestore(note) {
  const noteRef = doc(db, 'users', getUserID(), 'notes', note.key);
  updateDoc(noteRef, { ...note }, { capital: true });
}

async function deleteNoteFromFirestore(key) {
  await deleteDoc(doc(db, 'users', getUserID(), 'notes', note.key));
}

// ----- handle projects -----
function addProjectToFirestore(project) {
  const projectRef = doc(db, 'users', getUserID(), 'projects', project.key);
  setDoc(projectRef, { ...project }, { capital: true }, { merge: true });
}

function updateProjectFirestore(project) {
  const projectRef = doc(db, 'users', getUserID(), 'projects', project.key);
  updateDoc(projectRef, { ...project }, { capital: true });
}

async function deleteProjectFromFirestore(key) {
  await deleteDoc(doc(db, 'users', getUserID(), 'projects', key));
}

export {
  addTodoToFirestore,
  updateTodoFirestore,
  deleteTodoFromFirestore,
  addNoteToFirestore,
  updateNoteFirestore,
  deleteNoteFromFirestore,
  addProjectToFirestore,
  updateProjectFirestore,
  deleteProjectFromFirestore,
};
