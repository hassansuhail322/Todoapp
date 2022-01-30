import firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyAybpmxFG1KaiObcaepDbP2YzGh6KAqpm0",
    authDomain: "todo-app-ce9ab.firebaseapp.com",
    projectId: "todo-app-ce9ab",
    storageBucket: "todo-app-ce9ab.appspot.com",
    messagingSenderId: "633853488067",
    appId: "1:633853488067:web:f0adeed4cb27c170c9ab76",
    measurementId: "G-R6RN3FQRX8"
});

const db = firebaseApp.firestore();

export { db };  

    