// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwCxK2fx9XykgemmZtTiGsH1cks7Bqfek",
  authDomain: "badbank-20106.firebaseapp.com",
  projectId: "badbank-20106",
  storageBucket: "badbank-20106.appspot.com",
  messagingSenderId: "39630329016",
  appId: "1:39630329016:web:fa71bb7e2d3211b09fd04d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
