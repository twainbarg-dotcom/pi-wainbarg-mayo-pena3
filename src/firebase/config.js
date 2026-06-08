import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDC9IzWB1xp7zpzcFHhZHfW2t23pBuUhv0",
  authDomain: "pi-wainbarg-mayo-pena3-public.firebaseapp.com",
  projectId: "pi-wainbarg-mayo-pena3-public",
  storageBucket: "pi-wainbarg-mayo-pena3-public.firebasestorage.app",
  messagingSenderId: "37706936481",
  appId: "1:37706936481:web:97ba02f3627cdf617380e0"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();