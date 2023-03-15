import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "./context/hookIndex";
import CustomLink from "./CustomLink";
import FormInput from "./FormInput";
import Submit from "./Submit";
import NavBar from "../NavBar"

// Check if the format of email input is valid
export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

// Check if the format of user's credential input is valid
const validateUserInfo = ({ email, password }) => {
  if (!email.data.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email.data)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

// Thanks to Sakshi for adding the userType parameter to optimize the duplicated structure of landlord. 
export default function Signin({userType}) {
  const [userInfo, setUserInfo] = useState({
    email: {
      isPublic: false,
      data: ""
    },
    password: "",
    userType: userType
  });

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === "email") {
      setUserInfo({
        ...userInfo,
        email: {
          ...userInfo.email,
          data: value
        },
      });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  // First validate user's credential format, then use handleLogin API to send use's credential and user-type to server on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    handleLogin(userInfo.email, userInfo.password, userInfo.userType);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/landing");
  }, [isLoggedIn]);

  return (
    <div>
      <NavBar />
      
      {/* Background color and position of Signin card */}
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">

          {/* Signin card style */}
          <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6 w-96"}>
            <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
              {userType === "customer" ? "USER" : "LANDLORD"} LOGIN
            </h1>

            {/* Signin card input */}
            <FormInput
              value={userInfo.email.data}
              onChange={handleChange}
              label="Email *"
              placeholder="Enter Email"
              name="email"
            />
            <FormInput
              value={userInfo.password}
              onChange={handleChange}
              label="Password *"
              placeholder="Enter Password"
              name="password"
              type="password"
            />

            {/* Additional routers */}
            <div className="flex justify-end"
                  style={{margin: "2px"}}>
              <CustomLink to={userType === "customer" ? "/auth/user/forget-password" : "/auth/landlord/forget-password"}>Forget password?</CustomLink>
            </div>

            {/* Signin card button */}
            <Submit value="LOGIN" busy={isPending} />

            <div className="flex justify-center"
                  style={{fontSize: "12px", fontWeight: "400"}}>
              <p style={{color: "#4B4B4B", paddingRight: "3px"}}>
                Don't have an account?
              </p>
              <span style={{fontWeight: 600}}><CustomLink to={userType === "customer" ? "/auth/user/signup" : "/auth/landlord/signup"}>SIGN UP</CustomLink></span>
            </div>

            {/* Switch user or landlord login */}
            <div className="flex justify-center"
                  style={{fontSize: "12px", fontWeight: "400"}}>
              <p style={{color: "#4B4B4B", paddingRight: "3px"}}>
                {userType === "customer" ? "Want to sign in as a landlord?" : "Want to sign in as a user?"}
              </p>
              { userType === "customer" ? (
                <span onClick={(e) => {window.location.href = "/auth/landlord/signin"}} style={{fontWeight: 600}}><CustomLink>SIGN IN</CustomLink></span>
              ) : (
                <span onClick={(e) => {window.location.href = "/auth/user/signin"}} style={{fontWeight: 600}}><CustomLink>SIGN IN</CustomLink></span>
              )}
            </div>
          </form>
      </div>
    </div>
  );
}
