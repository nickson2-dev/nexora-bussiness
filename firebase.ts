import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxwOasJWzR6uU9aWJ45u6WUgZRAMP3NdA",
  authDomain: "next-tech-2ed10.firebaseapp.com",
  projectId: "next-tech-2ed10",
  storageBucket: "next-tech-2ed10.firebasestorage.app",
  messagingSenderId: "157161682097",
  appId: "1:157161682097:web:ba8093c6b1d7a0e3a89e90",
  measurementId: "G-SK32PG3TYZ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Create reusable instances for Google login and recaptcha
export const googleProvider = new GoogleAuthProvider();
export { RecaptchaVerifier, signInWithPhoneNumber };
