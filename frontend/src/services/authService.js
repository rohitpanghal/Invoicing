import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`; // change if needed

export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};
