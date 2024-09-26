// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd8I9F2kqmjWlp_EuOAoqwqya3_RDi7FM",
  authDomain: "react-app-001-f7ff1.firebaseapp.com",
  projectId: "react-app-001-f7ff1",
  storageBucket: "react-app-001-f7ff1.appspot.com",
  messagingSenderId: "1003931998811",
  appId: "1:1003931998811:web:3662a54410ab18c34efd7e"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
