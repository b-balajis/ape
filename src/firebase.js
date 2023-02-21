// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh7EEa4J49hVVr3BMajln9qZ3xuPFQOIw",
  authDomain: "ape-code.firebaseapp.com",
  projectId: "ape-code",
  storageBucket: "ape-code.appspot.com",
  messagingSenderId: "528292449372",
  appId: "1:528292449372:web:6c633abb697f74f5b9aa99",
  measurementId: "G-DNTDSDZPZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export default app;
