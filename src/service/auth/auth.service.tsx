import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/';

export const login = async (data: any) => {
  const response = await axios.post(`${API_URL}users/login`, data);
  return response.data;
};
