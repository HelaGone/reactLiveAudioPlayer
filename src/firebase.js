import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDMR2Yj7WGb9sgaxAN4YBi13jTiS8X-ouM",
    authDomain: "nofmradio.firebaseapp.com",
    databaseURL: "https://nofmradio.firebaseio.com",
    projectId: "nofmradio",
    storageBucket: "nofmradio.appspot.com",
    messagingSenderId: "331069032670",
    appId: "1:331069032670:web:da20779a3eb82ed8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;