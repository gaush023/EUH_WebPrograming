// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2BGZ_omOfdjgS6qY_s7TFAbKGWo3ehBw",
  authDomain: "euhwebprograming.firebaseapp.com",
  projectId: "euhwebprograming",
  storageBucket: "euhwebprograming.appspot.com",
  messagingSenderId: "314721194469",
  appId: "1:314721194469:web:b4bc123123fd9accac5f0c",
  measurementId: "G-J4FD44D5Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
