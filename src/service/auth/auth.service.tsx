import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data :any) => {
  const response = await axios.post(`${API_URL}users/login`, data);
  return response.data;
};
