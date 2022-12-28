// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_ANALYTICS_apiKey,
  authDomain: process.env.NEXT_PUBLIC_ANALYTICS_authDomain,
  projectId: process.env.NEXT_PUBLIC_ANALYTICS_projectId,
  storageBucket: process.env.NEXT_PUBLIC_ANALYTICS_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_ANALYTICS_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_ANALYTICS_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
