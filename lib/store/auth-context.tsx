'use client';

import { createContext } from 'react';
import { auth } from '../firebase/index';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';

export const authContext = createContext({
  user: null as User | null,
  loading: false,
  googleLoginHandler: async () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);

  const googleProvider = new GoogleAuthProvider();

  const googleLoginHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const values = {
    user: user || null,
    loading,
    googleLoginHandler,
    logout,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
