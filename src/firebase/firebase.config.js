// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3-rWynpUkL5r_FalpLKfPjv60jB1STRk",
  authDomain: "foodi-app-auth.firebaseapp.com",
  projectId: "foodi-app-auth",
  storageBucket: "foodi-app-auth.appspot.com",
  messagingSenderId: "217619210708",
  appId: "1:217619210708:web:30fd877c20447a9e84b641",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
