// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7cihT769KcAW2TI-6ojfpN_SV9yROkpY",
  authDomain: "loopapp-13b10.firebaseapp.com",
  projectId: "loopapp-13b10",
  storageBucket: "loopapp-13b10.firebasestorage.app",
  messagingSenderId: "764577657193",
  appId: "1:764577657193:web:c2daa1bdaf99c1ccdb0df8",
  measurementId: "G-VQ4N4X0HE4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

// El archivo AuthContext.js típicamente va en una carpeta llamada "context" o "contexts" en la raíz del proyecto o dentro de "src".
// Ejemplo de estructura:
// - src/
//   - context/
//     - AuthContext.js
// O simplemente:
// - context/
//   - AuthContext.js
