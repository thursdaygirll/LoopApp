// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7cihT769KcAW2TI-6ojfpN_SV9yROkpY",
  authDomain: "loopapp-13b10.firebaseapp.com",
  projectId: "loopapp-13b10",
  storageBucket: "loopapp-13b10.firebasestorage.app",
  messagingSenderId: "764577657193",
  appId: "1:764577657193:web:c2daa1bdaf99c1ccdb0df8",
  measurementId: "G-VQ4N4X0HE4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
