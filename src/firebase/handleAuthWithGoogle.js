import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

import { getFirebaseConfig } from './firebase-config';

// ------------ google auth container elements ------------
const userPicElement = document.querySelector('#user-pic');
const userNameElement = document.querySelector('#user-name');
const signInButtonElement = document.querySelector('#sign-in');
const signOutButtonElement = document.querySelector('#sign-out');

function handleAuthWithGoogle() {
  document.querySelector('#sign-in').addEventListener('click', () => signIn());
  document
    .querySelector('#sign-out')
    .addEventListener('click', () => signOutUser());
}

async function signIn() {
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function signOutUser() {
  signOut(getAuth());
}

function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || '../images/profile_placeholder.png';
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function getUserID() {
  if (isUserSignedIn) {
    return getAuth().currentUser.uid;
  }
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage =
      'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}

function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// initialize firebase
const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
// initialize Firebase auth
initFirebaseAuth();

export { handleAuthWithGoogle, getUserID, app };
