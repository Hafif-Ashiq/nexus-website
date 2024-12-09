// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhrZJuKNDg6vWRDp17PSocAfm2VVr3o6w",
    authDomain: "nexus-ef4c1.firebaseapp.com",
    projectId: "nexus-ef4c1",
    storageBucket: "nexus-ef4c1.appspot.com",
    messagingSenderId: "217320925090",
    appId: "1:217320925090:web:30b72f9b5da6d1dacc34fb",
    measurementId: "G-HBK57GGPCH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// export const analytics = getAnalytics(app);
// export { logEvent }
// const analytics = getAnalytics(app);
export const storage = getStorage();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();