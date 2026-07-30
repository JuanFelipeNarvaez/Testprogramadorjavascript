// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //agregado por kai
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjiL6L0jgu2FPcPBlLOQq82RQLZB8T8g",
  authDomain: "entrenamientos-app-27e2f.firebaseapp.com",
  projectId: "entrenamientos-app-27e2f",
  storageBucket: "entrenamientos-app-27e2f.firebasestorage.app",
  messagingSenderId: "191058719748",
  appId: "1:191058719748:web:4587dddc7251bd83a8f151"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //agregado por kai