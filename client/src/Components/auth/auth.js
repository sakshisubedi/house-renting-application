import axios from "axios";
import env from "../../environment";
const BASE_URL = env.BASE_URL;

// Local test url
// const client = axios.create({ baseURL: "http://localhost:4000/api/v1/login" });
// const landlord = axios.create({ baseURL: "http://localhost:4000/api/v1/landlord" });

const client = axios.create({ baseURL: `${BASE_URL}/api/v1/login` });
const landlord = axios.create({ baseURL: `${BASE_URL}/api/v1/landlord` });

export default client;

// User server
// Create a new user on sign-up page with user's credentials, and return the data to server; return error when we failed. 
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

// Veryify user's email after a new user is created, and return the data to server; return error when we failed. 
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

// Handle the signed-in user's credentials, and return the data to server; return error when we failed. 
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

// Get user's status after a user is logged in, and return the data to server; return error when we failed. 
// Thanks to Sakshi for adding the userType parameter to optimize the duplicated structure of landlord. 
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

// Handle user's forget password request, and return the email and data to server; return error when we failed. 
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

// Handle verifying if the token is valid, and return the data to server; return error when we failed. 
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

// Handle user's reset password request, and return password credentials to server; return error when we failed. 
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

// Handle user's resending otp request, and return the data to server; return error when we failed. 
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

// Landlord server
// Create a new landlord on sign-up page with landlord's credentials, and return the data to server; return error when we failed. 
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

// Veryify landlord's email after a new landlord is created, and return the data to server; return error when we failed. 
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

// Handle the signed-in landlord's credentials, and return the data to server; return error when we failed. 
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

// Get landlord's status after a landlord is logged in, and return the data to server; return error when we failed. 
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

// Handle landlord's forget password request, and return the email and data to server; return error when we failed. 
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

// Handle verifying if the token is valid, and return the data to server; return error when we failed. 
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

// Handle landlord's reset password request, and return password credentials to server; return error when we failed. 
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

// Handle landlord's resending otp request, and return the data to server; return error when we failed. 
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
