import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvEzKHfJAtxrkHYzcDQXJ12JFCGB8eGek",
  authDomain: "moodspace-f688b.firebaseapp.com",
  projectId: "moodspace-f688b",
  storageBucket: "moodspace-f688b.firebasestorage.app",
  messagingSenderId: "496422041432",
  appId: "1:496422041432:web:31755e95fa193336f8972d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);