import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const serverURI =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.NEXT_PUBLIC_SERVER_URL_PROD;

export const isAuthenticated = async (token: string) => {
  const res = await fetch(serverURI + "/api/auth/checktoken", {
    headers: {
      authorization: token,
    },
  });
  const data = await res.json();
  return data;
};

export const logout = async () => {
  // const res = await axios.get(`${serverURI}/api/auth/logout`);
  const res = await axios.get(`${serverURI}/api/auth/logout`);
  console.log(res.data);
  localStorage.removeItem("user");
};
