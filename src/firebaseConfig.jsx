// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfQemjDEfaM-aOGxD0nN_FItFxtzlVCQo",
  authDomain: "marketplace-e1718.firebaseapp.com",
  projectId: "marketplace-e1718",
  storageBucket: "marketplace-e1718.appspot.com",
  messagingSenderId: "909210385925",
  appId: "1:909210385925:web:64ae1e8da1bccfbf04e66c",
  measurementId: "G-0TDZ005QCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
