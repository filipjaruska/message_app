// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection, getDocs} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4nCDqe-DUE56ajzGka2Hwn9lwYQrTHzc",
  authDomain: "msgapp-proper.firebaseapp.com",
  projectId: "msgapp-proper",
  storageBucket: "msgapp-proper.appspot.com",
  messagingSenderId: "87241770824",
  appId: "1:87241770824:web:8a2556ade1ee0397e9557d",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_COL = collection(FIRESTORE_DB, 'messages');