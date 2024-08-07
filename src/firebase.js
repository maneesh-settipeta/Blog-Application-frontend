import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKnowm-F9PqHmafkIki_vsTxzmbi6l2To",
  authDomain: "blog-application-aa5bf.firebaseapp.com",
  projectId: "blog-application-aa5bf",
  storageBucket: "blog-application-aa5bf.appspot.com",
  messagingSenderId: "1002033522010",
  appId: "1:1002033522010:web:4dcdd34f06518204daff63",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
