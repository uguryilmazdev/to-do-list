import './styles/style.css';
import { loadContent } from './modules/loadContent';
import { initFirebaseAuth } from './firebase/handleAuthWithGoogle';

// --------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  initFirebaseAuth();
  loadContent();
});
