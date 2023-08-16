// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmLFYIp8Zy00ExZmlVJQrV7pcnjLYTWEc",
  authDomain: "crud-app-fd0e6.firebaseapp.com",
  projectId: "crud-app-fd0e6",
  storageBucket: "crud-app-fd0e6.appspot.com",
  messagingSenderId: "70236964634",
  appId: "1:70236964634:web:5e114867447d1557bf0ea3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
export {db}