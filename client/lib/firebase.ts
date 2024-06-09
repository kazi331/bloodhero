// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { AuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// register, login, logout, reset password
export const loginWith = async (
  provider: AuthProvider,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  signInWithPopup(auth, provider)
    .then(({ user, providerId, operationType }) => {
      setLoading(false);
      window.location.href = "/";
    })
    .catch((err) => {
      setLoading(false);
      if (err.message.includes("auth/popup-closed-by-user")) {
        return toast.error("Login prompt closed by user!");
      }
      toast.error("An error occurred");
      console.log(err.message);
      console.log(err);
    });
};
