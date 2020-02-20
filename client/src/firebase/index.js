import firebase from "firebase/app";
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAjO5qtdT-OfuJ7q03x2fBfZiaaYQhhzOI",
    authDomain: "get-dev-project.firebaseapp.com",
    databaseURL: "https://get-dev-project.firebaseio.com",
    projectId: "get-dev-project",
    storageBucket: "get-dev-project.appspot.com",
    messagingSenderId: "517752517092",
    appId: "1:517752517092:web:06173459a46e019a2717f1",
    measurementId: "G-0RC5NQFBEV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage= firebase.storage();

  export {
      storage, firebase as default
  }

   