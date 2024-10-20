import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore"; // Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBocRZ7f7BzGfTBTE-n09EQ-Ut8j9NXZ0M",
  authDomain: "insta-clone-8eb6f.firebaseapp.com",
  databaseURL: "https://insta-clone-8eb6f-default-rtdb.firebaseio.com",
  projectId: "insta-clone-8eb6f",
  storageBucket: "insta-clone-8eb6f.appspot.com",
  messagingSenderId: "70019907140",
  appId: "1:70019907140:web:1f3a492b0c9732cc428611",
};

// Initialize Firebase only if it's not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize services
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore(); // Initialize Firestore

// Export services
export { auth, storage, db };
