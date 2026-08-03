import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxiaq-By0cpbgpVy_XMlc55csmcTLPt4Y",
  authDomain: "artikel-astro.firebaseapp.com",
  projectId: "artikel-astro",
  storageBucket: "artikel-astro.firebasestorage.app",
  messagingSenderId: "704826377756",
  appId: "1:704826377756:web:f07eb911ef9f11ad2f41d9",
  measurementId: "G-27N9767F5H"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Safely initialize analytics only on the client side
let analytics;
if (typeof window !== "undefined") {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, analytics };
