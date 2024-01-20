import axios from "axios";
import { serverURI } from "./utils";
export default axios.create({
  baseURL: serverURI + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
