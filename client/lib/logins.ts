import {
  AuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "sonner";
import axios from "./axios";
import app from "./firebaseConf";
export const auth = getAuth(app);

export const socialLogin = (provider: AuthProvider) => {
  signInWithPopup(auth, provider)
    .then((credential) => {
      const user = credential.user.providerData[0];
      // save users into database
      axios
        .post("/auth/login", user)
        .then()
        .catch((err) => console.log(err));

      localStorage.setItem("user", JSON.stringify(user));
      if (user) {
        toast.success(`Welcome, ${user.displayName}`);
      }
    })
    .catch((error) => {
      console.log(error.message);

      if (error.message.includes("exists-with-different-credential")) {
        toast.error(
          "An account already exists with the same email address but different sign-in credentials.",
          {
            description:
              "Sign in using a provider associated with this email address",
          }
        );
      } else if (error.message.includes("auth/user-cancelled")) {
        toast.error("User cancelled the sign-in flow");
      } else if (error.message.includes("auth/popup-closed-by-user")) {
        toast.error("Popup closed by user");
      } else if (error.message.includes("auth/cancelled-popup-request")) {
        toast.error("Popup closed by user");
      } else {
        toast.error(error.message);
      }
    });
};

export const googleLogin = () => {
  socialLogin(new GoogleAuthProvider());
};
export const facebookLogin = () => {
  socialLogin(new FacebookAuthProvider());
};
export const xLogin = () => {
  socialLogin(new TwitterAuthProvider());
};
export const appleLogin = () => {
  socialLogin(new OAuthProvider("apple.com"));
};
export const githubLogin = () => {
  socialLogin(new GithubAuthProvider());
};

export const emailRegister = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Welcome, ${user?.email}`);
    })
    .catch((error) => {
      if (error.message.includes("auth/email-already-in-use")) {
        toast.error("Email already in use");
      } else {
        toast.error(error.message);
      }
    });
};
export const emailLogin = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user.providerData[0];
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(`Welcome, ${user?.email}`);
    })
    .catch((err) => {
      if (err.message.includes("auth/invalid-credential")) {
        toast.error("Invalid credentials");
      } else {
        toast.error(err.message);
      }
    });
};
