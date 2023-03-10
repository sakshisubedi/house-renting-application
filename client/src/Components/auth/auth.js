import axios from "axios";
import env from "../../environment";
const BASE_URL = env.BASE_URL;

// local test
// const client = axios.create({ baseURL: "http://localhost:4000/api/v1/login" });
// const landlord = axios.create({ baseURL: "http://localhost:4000/api/v1/landlord" });

const client = axios.create({ baseURL: `${BASE_URL}/api/v1/login` });
const landlord = axios.create({ baseURL: `${BASE_URL}/api/v1/landlord` });

export default client;

// user server
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

export const getIsAuth = async (token, userType) => {
  try {
    const { data } = await client.get("/is-auth", {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json",
        userType
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const forgetPassword = async (email, userType) => {
  try {
    const { data } = await client.post("/forget-password", { email, userType });
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

// landlord server
export const newLandlord = async (userInfo) => {
  try {
    const { data } = await landlord.post("/create-landlord", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyLandlordEmail = async (userInfo) => {
  try {
    const { data } = await landlord.post("/verify-email-landlord", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signInLandlord = async (userInfo) => {
  try {
    const { data } = await landlord.post("/sign-in-landlord", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getIsAuthLandlord = async (token) => {
  try {
    const { data } = await landlord.get("/is-auth-landlord", {
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

export const forgetPasswordLandlord = async (email) => {
  try {
    const { data } = await landlord.post("/forget-password-landlord", { email });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyPasswordResetTokenLandlord = async (token, userId) => {
  try {
    const { data } = await landlord.post("/verify-pass-reset-token-landlord", {
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

export const resetPasswordLandlord = async (passwordInfo) => {
  try {
    const { data } = await landlord.post("/reset-password-landlord", passwordInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const resendEmailVerificationTokenLandlord = async (userId) => {
  try {
    const { data } = await landlord.post(
      "/resend-email-verification-token-landlord",
      { userId }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
