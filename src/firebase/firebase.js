
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAvsUpZbinHac75uOXJx4XeRQczmTLCLMA",
  authDomain: "movieworld-285a8.firebaseapp.com",
  projectId: "movieworld-285a8",
  storageBucket: "movieworld-285a8.appspot.com",
  messagingSenderId: "150512753475",
  appId: "1:150512753475:web:c8b88e0467fb46cd3fadf6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db,"users");
export default app;