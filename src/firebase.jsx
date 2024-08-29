import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjdhXA3Etp4BzRD9kMw3tDLDeS_doPxOk",
  authDomain: "vocab-enhancer.firebaseapp.com",
  projectId: "vocab-enhancer",
  storageBucket: "vocab-enhancer.appspot.com",
  messagingSenderId: "898211102793",
  appId: "1:898211102793:web:9b011c25cb5394bac23f98",
  measurementId: "G-JVC520MSNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const signOutUser = () => {
  return signOut(auth);
};


export const db = getFirestore(app);
export { auth, signInWithGoogle, signOutUser };
