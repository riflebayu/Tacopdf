// Lazy-loaded Firebase Auth - only imported when admin page is visited
// This prevents the auth/iframe.js from blocking initial page render
import { getAuth } from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);
