// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhRNRo9d_3rJzdZxa4LATfD62KpMhJH5w",
  authDomain: "job-portal-8af74.firebaseapp.com",
  projectId: "job-portal-8af74",
  storageBucket: "job-portal-8af74.appspot.com",
  messagingSenderId: "833083410378",
  appId: "1:833083410378:web:554040d8ef3f51051cf133",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const db = getFirestore();
export const storage = getStorage();
