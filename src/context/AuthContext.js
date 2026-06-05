import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "@firebase/auth";

import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
  limit,
} from "firebase/firestore";

import { app } from "../services/firebase";

import { auth } from "../services/firebase";

import {
  getUserDetails,
  saveUserDetails,
} from "../services/userDatabase";
const db = getFirestore(app);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] =
    useState(true);
  const authActionInProgress = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        if (!currentUser) {
          setUser(null);
          setInitializing(false);
          return;
        }

        if (authActionInProgress.current) {
          setInitializing(false);
          return;
        }

        const userDetails = await getUserDetails(
          currentUser.uid
        );

        if (!userDetails) {
          await signOut(auth);
          setUser(null);
          setInitializing(false);
          return;
        }

        setUser(currentUser);
        setInitializing(false);
      }
    );

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      initializing,
      login: async (
  identifier,
  password
) => {
  authActionInProgress.current = true;

  try {
    let email = identifier.trim();

    if (!identifier.includes("@")) {
      const q = query(
        collection(db, "users"),
        where(
          "username",
          "==",
          identifier
            .trim()
            .toLowerCase()
        )
      );

      const snapshot =
        await getDocs(q);

      if (snapshot.empty) {
        const error =
          new Error(
            "Username not found."
          );

        error.code =
          "auth/user-not-found";

        throw error;
      }

      email =
        snapshot.docs[0].data()
          .email;
    }

    const credential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    const userDetails =
      await getUserDetails(
        credential.user.uid
      );

    if (!userDetails) {
      await signOut(auth);

      const error =
        new Error(
          "No saved user data found."
        );

      error.code =
        "auth/user-data-not-found";

      throw error;
    }

    await saveUserDetails(
      credential.user,
      {
        email,
        provider:
          "password",
      }
    );

    setUser(
      credential.user
    );

    return credential;
  } finally {
    authActionInProgress.current =
      false;
  }
},

signup: async (
  username,
  email,
  password
) => {
  authActionInProgress.current = true;

  try {
    const credential =
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    const cleanUsername =
      username
        .trim()
        .toLowerCase();
        const usernameQuery = query(
  collection(db, "users"),
  where(
    "username",
    "==",
    cleanUsername
  ),
  limit(1)
);

const usernameSnapshot =
  await getDocs(usernameQuery);

if (!usernameSnapshot.empty) {
  const error = new Error(
    "Username already taken."
  );

  error.code =
    "auth/username-already-in-use";

  throw error;
}

    if (cleanUsername) {
      await updateProfile(
        credential.user,
        {
          displayName:
            cleanUsername,
        }
      );
    }

    await saveUserDetails(
      credential.user,
      {
        username:
          cleanUsername,
        email,
        provider:
          "password",
        isNewUser: true,
      }
    );

    setUser(
      credential.user
    );

    return credential;
  } finally {
    authActionInProgress.current =
      false;
  }
},

      loginWithGoogleToken: async (idToken) => {
        authActionInProgress.current = true;

        try {
          const credential =
            GoogleAuthProvider.credential(idToken);

          const userCredential =
            await signInWithCredential(auth, credential);
          const userDetails = await getUserDetails(
            userCredential.user.uid
          );

          await saveUserDetails(userCredential.user, {
            provider: "google.com",
            isNewUser:
              !userDetails ||
              userCredential?._tokenResponse?.isNewUser,
          });
          setUser(userCredential.user);

          return userCredential;
        } finally {
          authActionInProgress.current = false;
        }
      },
      logout: async () => {
        await signOut(auth);
        setUser(null);
      },
    }),
    [user, initializing]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
