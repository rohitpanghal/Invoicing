import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/invoices`; // Update base URL

export const getInvoices = async () => await axios.get(API_URL);
export const createInvoice = async (data) => await axios.post(API_URL, data);
export const updateInvoice = async (id, data) => await axios.put(`${API_URL}/${id}`, data);
export const deleteInvoice = async (id) => await axios.delete(`${API_URL}/${id}`);
