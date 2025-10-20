import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/usd-details`; // change to your backend URL

// Add Authorization token if needed
const config = () => {
    const token = localStorage.getItem("token") || "";
    return {
  headers: { Authorization: `Bearer ${token}` },
}};

export const createUSD = (data) => axios.post(API_URL, data, config());
export const getUSDList = () => axios.get(API_URL, config());
export const updateUSD = (id, data) => axios.put(`${API_URL}/${id}`, data, config());
export const deleteUSD = (id) => axios.delete(`${API_URL}/${id}`, config());
