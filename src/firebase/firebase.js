import firebase from 'firebase'
import 'firebase/firestore'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDOmL-uhMkz8L8hW0WyTEhXEOoUP6YjqC4",
    authDomain: "react-firestore-crud-4af37.firebaseapp.com",
    projectId: "react-firestore-crud-4af37",
    storageBucket: "react-firestore-crud-4af37.appspot.com",
    messagingSenderId: "44377811381",
    appId: "1:44377811381:web:50d9a0bf508d408bbb51fc"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

export const dataBase = fb.firestore()