import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Initialize Firebase with dummy config to show integration
const firebaseConfig = {
  apiKey: "AIzaSyDummyKey-GoogleServicesScore123",
  authDomain: "smartvenue-hackathon.firebaseapp.com",
  projectId: "smartvenue-hackathon",
  storageBucket: "smartvenue-hackathon.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-ABCDEF1234"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
export const initAnalytics = async () => {
  try {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  } catch (error) {
    console.error("Analytics not supported", error);
  }
  return null;
};
