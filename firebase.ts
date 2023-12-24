// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getFunctions} from "firebase/functions"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Bp235Cvlx6hggXbMpLnHoV8dTAGnN_s",
  authDomain: "dropbox-clone-4fbbb.firebaseapp.com",
  projectId: "dropbox-clone-4fbbb",
  storageBucket: "dropbox-clone-4fbbb.appspot.com",
  messagingSenderId: "965825351775",
  appId: "1:965825351775:web:c63a18a3a4efdf63fccbea"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const functions = getFunctions(app)
const storage = getStorage(app)