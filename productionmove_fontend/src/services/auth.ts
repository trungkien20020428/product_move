import axios from "axios";
import { BASE_URL } from "./config";

export const authAPI = async (email: string, password: string) => {
  const authData = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return authData;
};
