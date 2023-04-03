import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import { getFirebaseConfig } from './firebase-config';
import { initializeApp } from 'firebase/app';
import { getUserID } from './handleAuthWithGoogle';
import Note from '../modules/Note';

// initialize app
const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
// initalize firestore
const db = getFirestore(app);

// ADD, UPDATE and DELETE TASKS FROM FIRESTORE
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
  await deleteDoc(doc(db, 'users', getUserID(), 'notes', key));
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

// GET TASKS FROM FIRESTORE
// ----- get notes -----
async function getNoteFromFirestore(key) {
  const noteRef = doc(db, 'users', getUserID(), 'notes', key);
  const noteSnap = await getDoc(noteRef);
  const note = noteSnap.data();
  return note;
}

async function getAllNotesFromFireStore() {
  const q = query(collection(db, 'users', getUserID(), 'notes'));
  const querySnapshot = await getDocs(q);
  // create note array
  const noteArray = [];
  querySnapshot.forEach((doc) => {
    noteArray.push(doc.data());
  });

  noteArray.map((note) => Note.createNoteCard(note));
}

// ----- get todos -----
async function getTodoFromFirestore(key) {
  const todoRef = doc(db, 'users', getUserID(), 'todos', key);
  const todoSnap = await getDoc(todoRef);
  const todo = todoSnap.data();
  return todo;
}

async function getTodayTodoFromFirestore(date) {
  const q = query(
    collection(db, 'users', getUserID(), 'todos', where('dueTo', '==', date))
  );
  const querySnapshot = await getDocs(q);
  const todayTodoArray = [];

  querySnapshot.forEach((doc) => {
    todayTodoArray.push(doc.data());
  });
  return todayTodoArray;
}

async function getAllTodosFromFirestore() {
  const q = query(collection(db, 'users', getUserID(), 'todos'));
  const querySnapshot = await getDocs(q);
  // create todo array
  const todoArray = [];
  querySnapshot.forEach((doc) => {
    todoArray.push(doc.data());
  });
  return todoArray;
}

// ----- get projects -----
async function getProjectFromFirestore(key) {
  const projectRef = doc(db, 'users', getUserID(), 'projects', key);
  const projectSnap = await getDoc(projectRef);
  const project = projectSnap.data();
  return project;
}

async function getAllProjectsFromFirestore() {
  const q = query(collection(db, 'users', getUserID(), 'projects'));
  const querySnapshot = await getDocs(q);
  // create project array
  const projectArray = [];
  querySnapshot.forEach((doc) => {
    projectArray.push(doc.data());
  });

  return projectArray;
}
// ---------- export funcs -----------
// ----- todo -----
export {
  addTodoToFirestore,
  updateTodoFirestore,
  deleteTodoFromFirestore,
  getTodoFromFirestore,
  getTodayTodoFromFirestore,
  getAllTodosFromFirestore,
};

// ----- note -----
export {
  addNoteToFirestore,
  updateNoteFirestore,
  deleteNoteFromFirestore,
  getNoteFromFirestore,
  getAllNotesFromFireStore,
};

// ----- project -----
export {
  addProjectToFirestore,
  updateProjectFirestore,
  deleteProjectFromFirestore,
  getProjectFromFirestore,
  getAllProjectsFromFirestore,
};
