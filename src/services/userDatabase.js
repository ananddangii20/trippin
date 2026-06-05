import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { app } from "./firebase";

const db = getFirestore(app);

export async function getUserDetails(uid) {
  if (!uid) {
    return null;
  }

  const userSnapshot = await getDoc(
    doc(db, "users", uid)
  );

  if (!userSnapshot.exists()) {
    return null;
  }

  return {
    id: userSnapshot.id,
    ...userSnapshot.data(),
  };
}

export async function saveUserDetails(user, details = {}) {
  if (!user?.uid) {
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userDetails = {
    uid: user.uid,
    username:
      details.username ||
      user.displayName ||
      "",
    email: user.email || details.email || "",
    photoURL: user.photoURL || "",
    provider:
      details.provider ||
      user.providerData?.[0]?.providerId ||
      "password",
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  };

  if (details.isNewUser === true) {
    userDetails.createdAt = serverTimestamp();
  }

  await setDoc(
    userRef,
    userDetails,
    { merge: true }
  );
}
