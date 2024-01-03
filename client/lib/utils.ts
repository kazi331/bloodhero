import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const serverURI =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.NEXT_PUBLIC_SERVER_URL_PROD;
