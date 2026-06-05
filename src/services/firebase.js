import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "@firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWRimdCr_nbdWx8zodItcgNJ5SQx483o4",
  authDomain: "trippin-5046a.firebaseapp.com",
  projectId: "trippin-5046a",
  storageBucket: "trippin-5046a.firebasestorage.app",
  messagingSenderId: "439204702970",
  appId: "1:439204702970:web:b00b660b00adc9558e3743",
  measurementId: "G-YLDVJC0VGR"
};

export const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(
      AsyncStorage
    ),
  });
} catch {
  auth = getAuth(app);
}

export { auth };

export const db = getFirestore(app);