import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyB8DhdJ0xe-5KMpj7C8A6OSowDdVdOQyL4",
  authDomain: "project-622bb.firebaseapp.com",
  databaseURL: "https://project-622bb.firebaseio.com",
  projectId: "project-622bb",
  storageBucket: "project-622bb.appspot.com",
  messagingSenderId: "145787839222"
};

let FirebaseConnect = firebase.initializeApp(config);

export default FirebaseConnect;