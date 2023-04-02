import MainContainer from './mainContainer';
import UI from './UI';
import { signIn, signOutUser } from '../firebase/handleAuthWithGoogle';
import { loadContent } from './loadContent';
// ---------- handle user authentication ----------
// When the user enters the app, they first see the sign-in page
// They have two options: sign-in with google or no authentication (using local storage)
export function handleAuthPageItemsOnClick() {
  // sign-in with google
  document
    .querySelector('#googleAuthBtn')
    .addEventListener('click', () => signIn());
  // no authentication
  document
    .querySelector('#noAuthBtn')
    .addEventListener('click', () => hideSigninScreen());
}

// When the user reaches the main content,
// There is a button in the header that allows the user to sign-in or sign-out
export function handleHeaderAuthItemsOnClick() {
  // the sign-in button redirects the user to the authentication page
  // then user can choose an authentication option
  document
    .querySelector('#header-sign-in')
    .addEventListener('click', () => showSigninScreen());
  // also the sign-out button redirects the user to the authentication page
  document
    .querySelector('#header-sign-out')
    .addEventListener('click', () => signOutUser());
}

// ----------- display sign-in page ----------
// when the user first enters the site or clicks sign-out button,
// the sign-in page appears
export function showSigninScreen() {
  // get sign-in screen and content
  const signInContainer = document.querySelector('#signin-container');
  const content = document.querySelector('#content');
  // change display attribute
  content.style.display = 'none';
  signInContainer.style.display = 'flex';
  console.log('all worked');
}

// when the user selects authentication option or click sign-in button,
// the sign-in page disappears
export async function hideSigninScreen() {
  // get sign-in screen and content
  const signInContainer = document.querySelector('#signin-container');
  const content = document.querySelector('#content');
  // change display attribute
  content.style.display = 'block';
  signInContainer.style.display = 'none';
  // user lands to home page
  MainContainer.createContainer();
  MainContainer.clearContainer();
  await UI.loadUI();
  UI.createHomePage();
}
