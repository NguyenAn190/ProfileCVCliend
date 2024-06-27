import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Service xử lí đăng nhập tài khoản
 */
export const login = async (data :any) => {
  const response = await axios.post(`${API_URL}users/auth/login`, data);
  return response.data;
};

/**
 * Service xử lí đăng kí tài khoản
 */
export const registerUser = async (data: any) => {
  const response = await axios.post(`${API_URL}users/auth/register`, data)
  return response.data;
}

/**
 * Service xử lí gửi email khôi phục mật khẩu
 */
export const sendEmailForgotPassword = async (email: string) => {
  const response = await axios.get(`${API_URL}users/auth/sendEmailForgotPassword`, {
    params: { email },
  });
  return response.data;
};

/**
 * Phương thức kiểm tra người dùng và token hợp lệ
 */
export const checkEmailForgotPassword = async (token: string, id: string) => {
  const response = await axios.get(`${API_URL}users/auth/checkEmailForgotPassword/${token}/${id}`)

  return response.data;
}

/**
 * Phương thức xử lí thay đổi mật khẩu
 */
export const changePassword = async (userId: string, password: string) => {
  const response = await axios.post(`${API_URL}users/auth/changePassword`, { userId, password });
  return response.data;
};

/**
 * Phương thức kiểm tra token và id hợp lệ
 */
export const veryfyTokenActiveUser = async (token: string, id: string) => {
  const response = await axios.get(`${API_URL}users/auth/veryfyTokenActiveUser/${token}/${id}`)
  return response.data
}
/**
 * Đăng nhập với google
 */
const signInWithGoogle = async () => {
  try {
    const response = await axios.get(`${API_URL}users/auth/signInWithGoogle`);
    window.location.href = response.request.responseURL;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
  }
};

