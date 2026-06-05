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

import { auth } from "../services/firebase";
import {
  getUserDetails,
  saveUserDetails,
} from "../services/userDatabase";

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
      login: async (email, password) => {
        authActionInProgress.current = true;

        try {
          const credential =
            await signInWithEmailAndPassword(
            auth,
            email.trim(),
            password
          );
          const userDetails = await getUserDetails(
            credential.user.uid
          );

          if (!userDetails) {
            await signOut(auth);
            const error = new Error(
              "No saved user data found. Please create an account first."
            );
            error.code = "auth/user-data-not-found";
            throw error;
          }

          await saveUserDetails(credential.user, {
            email,
            provider: "password",
          });
          setUser(credential.user);

          return credential;
        } finally {
          authActionInProgress.current = false;
        }
      },
      signup: async (name, email, password) => {
        authActionInProgress.current = true;

        try {
          const credential =
            await createUserWithEmailAndPassword(
              auth,
              email.trim(),
              password
            );

          if (name.trim()) {
            await updateProfile(credential.user, {
              displayName: name.trim(),
            });
          }

          await saveUserDetails(credential.user, {
            name,
            email,
            provider: "password",
            isNewUser: true,
          });
          setUser(credential.user);

          return credential;
        } finally {
          authActionInProgress.current = false;
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
