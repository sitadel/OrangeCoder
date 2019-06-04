import { firebase } from "@firebase/app";
import "@firebase/firestore";

//UPDATE WITH YOUR CONFIG

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDBSlGMgNKNiJMB1obrIkDo2vSQnnH5qM",
  authDomain: "vue-firebase-example-fb635.firebaseapp.com",
  databaseURL: "https://vue-firebase-example-fb635.firebaseio.com",
  storageBucket: "vue-firebase-example-fb635.appspot.com",
  projectId: "vue-firebase-example-fb635",
  messagingSenderId: "xxxxxxxxxxxx"
});

export const db = firebaseApp.firestore();
