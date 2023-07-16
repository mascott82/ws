// import firebase from "firebase/app";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpRAKMX22R7DWR3Ze1eAZ81wUMfI_SfSs",
  authDomain: "chickadee-62f24.firebaseapp.com",
  projectId: "chickadee-62f24",
  storageBucket: "chickadee-62f24.appspot.com",
  messagingSenderId: "557484339878",
  appId: "1:557484339878:web:8c782ff2ee9ce60dcc3a67"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db