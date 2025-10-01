// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClxLg9uRtKoqBMZw__706Nyp_uHmgWJOc",
  authDomain: "chain-share-valut.firebaseapp.com",
  projectId: "chain-share-valut",
  storageBucket: "chain-share-valut.firebasestorage.app",
  messagingSenderId: "22717656057",
  appId: "1:22717656057:web:a8fe8fa9d2cf820f28ab28",
  measurementId: "G-4CZ4X20MFN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };