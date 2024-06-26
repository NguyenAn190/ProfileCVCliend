import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (data :any) => {
  const response = await axios.post(`${API_URL}users/auth/login`, data);
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await axios.post(`${API_URL}users/auth/register`, data)
  return response.data;
}

export const sendEmailForgotPassword = async (email: string) => {
  const response = await axios.get(`${API_URL}users/auth/sendEmailForgotPassword`, {
    params: { email },
  });
  return response.data;
};

export const checkEmailForgotPassword = async (token: string, id: string) => {
  const response = await axios.get(`${API_URL}users/auth/checkEmailForgotPassword/${token}/${id}`)

  return response.data;
}

export const changePassword = async (userId: string, password: string) => {
  const response = await axios.post(`${API_URL}users/auth/changePassword`, { userId, password });
  return response.data;
};


