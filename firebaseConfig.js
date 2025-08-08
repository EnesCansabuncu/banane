import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCKA6grbfwozu639EjrIbvS0V10fbIS-zU",
  authDomain: "banane-5aabf.firebaseapp.com",
  projectId: "banane-5aabf",
    databaseURL: "https://banane-5aabf-default-rtdb.firebaseio.com/",
  storageBucket: "banane-5aabf.firebasestorage.app",
  messagingSenderId: "904556460157",
  appId: "1:904556460157:web:7732496a1959dd759ad914",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const database = getDatabase(app);

// Firebase'in başlatıldığını kontrol et
if (!app) {
  throw new Error('Firebase app başlatılamadı');
}
