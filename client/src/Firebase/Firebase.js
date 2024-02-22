// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAukuwzn3WPCMx-C0Fa9Rui0Z_uGcjY5PM",
  authDomain: "react-ecommerce-bc611.firebaseapp.com",
  projectId: "react-ecommerce-bc611",
  storageBucket: "react-ecommerce-bc611.appspot.com",
  messagingSenderId: "709789728720",
  appId: "1:709789728720:web:56426a5a665e75bca943d5",
  measurementId: "G-4WZH72535H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
