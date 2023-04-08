
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_SECRET_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  projectId: "movieworld-285a8",
  storageBucket: "movieworld-285a8.appspot.com",
  messagingSenderId: "150512753475",
  appId: process.env.REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db,"users");
export default app;