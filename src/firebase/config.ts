import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-TmZsrDD95ytOunFccFXPoeoaVSc81B8",
  authDomain: "shift-portal-8122b.firebaseapp.com",
  projectId: "shift-portal-8122b",
  storageBucket: "shift-portal-8122b.firebasestorage.app",
  messagingSenderId: "250812416699",
  appId: "1:250812416699:web:5b9a6500e5a5949e2adf9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
