import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseClient from "../firebase/client";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";

type AuthContextType = {
  user: firebase.User | null;
  initializing: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
});

export const AuthProvider = ({ children }: any) => {
  firebaseClient();
  const [user, setUser] = useState<firebase.User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initializeUser();
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, { path: "/" });

      setInitializing(false);
    });
  }, []);

  async function logout () {
    await firebase.auth().signOut();
    setUser(null);
    nookies.set(undefined, "token", "", { path: "/" });
    router.push("/login");
  }

  async function initializeUser () {
    const user = firebase.auth().currentUser;
    if (user) await user.getIdToken(true);
  }

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(initializeUser, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user, initializing, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
