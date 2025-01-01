// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu3ZXwI1fiQv9PZhpUciivU8PsG4fqUmQ",
  authDomain: "mauryans-tutorials.firebaseapp.com",
  databaseURL: "https://mauryans-tutorials.firebaseio.com",
  projectId: "mauryans-tutorials",
  storageBucket: "mauryans-tutorials.firebasestorage.app",
  messagingSenderId: "1052760755567",
  appId: "1:1052760755567:web:9055d386e18fcb7cacec9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);