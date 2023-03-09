import axios from "axios";
import env from "../../environment";
const BASE_URL = env.BASE_URL;

// Local test URL
// const client = axios.create({ baseURL: "http://localhost:4000/api/v1/login" });

const client = axios.create({ baseURL: `${BASE_URL}/api/v1/login` });

export default client;

export const newUser = async (userInfo) => {
  try {
    const { data } = await client.post("/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/verify-email", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/sign-in", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/is-auth", {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/forget-password", { email });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyPasswordResetToken = async (token, userId) => {
  try {
    const { data } = await client.post("/verify-pass-reset-token", {
      token,
      userId,
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const resetPassword = async (passwordInfo) => {
  try {
    const { data } = await client.post("/reset-password", passwordInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const resendEmailVerificationToken = async (userId) => {
  try {
    const { data } = await client.post(
      "/resend-email-verification-token",
      { userId }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
