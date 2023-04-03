const config = {
  apiKey: 'AIzaSyCrWXKgPJajj_zr1sRpuPHWxDR-NB4kpOo',
  authDomain: 'todo-project-efbf3.firebaseapp.com',
  projectId: 'todo-project-efbf3',
  storageBucket: 'todo-project-efbf3.appspot.com',
  messagingSenderId: '90334664053',
  appId: '1:90334664053:web:ae79ba85825b0a050d6f3c',
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      'No Firebase configuration object provided.' +
        '\n' +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return config;
  }
}
