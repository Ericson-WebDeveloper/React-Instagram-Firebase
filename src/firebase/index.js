// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp  } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVc81vXFdy8Xuc_OMeoe3kXVntl8mIa08",
  authDomain: "react-insta-f1754.firebaseapp.com",
  projectId: "react-insta-f1754",
  storageBucket: "react-insta-f1754.appspot.com",
  messagingSenderId: "987495941466",
  appId: "1:987495941466:web:6ef20a7ed62bf2f4885f63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const timestamp = serverTimestamp();

export const firebasecollection = collection;
export const firebasegetDocs = getDocs;
export const firebaseaddDoc = addDoc;
export const storage = getStorage(app, 'gs://react-insta-f1754.appspot.com/');
export default app;