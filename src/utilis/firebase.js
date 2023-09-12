// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC5nkc6b_smhJvSJnNeW0x65p0Oyghb-o",
  authDomain: "netflixgpt-b497d.firebaseapp.com",
  projectId: "netflixgpt-b497d",
  storageBucket: "netflixgpt-b497d.appspot.com",
  messagingSenderId: "598382206180",
  appId: "1:598382206180:web:fb776ffb4141181f5c60f1",
  measurementId: "G-YZKZ3RHMMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()