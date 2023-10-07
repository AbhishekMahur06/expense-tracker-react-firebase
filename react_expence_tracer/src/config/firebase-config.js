import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxbWF-O1sarXf1lcoQ2WSiJEMH-1-UVLw",
  authDomain: "expense-tracker-130fc.firebaseapp.com",
  projectId: "expense-tracker-130fc",
  storageBucket: "expense-tracker-130fc.appspot.com",
  messagingSenderId: "1059059538052",
  appId: "1:1059059538052:web:625e29c3a1ab1334fe0ad1",
  measurementId: "G-X6XB0SCCFK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
