import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newUser } from "./auth"
import { useAuth, useNotification } from "./context/hookIndex";
import CustomLink from "./CustomLink";
import FormInput from "./FormInput";
import Submit from "./Submit";
import NavBar from "../NavBar"
import { useToast } from "@chakra-ui/react";

// Check if the format of email input is valid
export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

// Check if the format of user's credential input is valid
const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.data.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email.data)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

// Thanks to Sakshi for adding the userType parameter to optimize the duplicated structure of landlord. 
export default function Signup({userType}) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: {
      isPublic: false,
      data: ""
    },
    password: "",
    userType: userType
  });

  const navigate = useNavigate();
  const { authInfo, isAuth } = useAuth();
  const { isLoggedIn } = authInfo;

  const { updateNotification } = useNotification();
  const toast = useToast();

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

  // First validate user's credential format, then use newUser API to send use's credential and user-type to server on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    const response = await newUser(userInfo);
    if (response.error) {
      return updateNotification("error", response.error);
    }

    localStorage.setItem("auth-token", response.user.token);
    localStorage.setItem("user-type", response.user.userType);
    isAuth();

    // navigate("/auth/verification", {
    //   state: { user: response.user, userType },
    //   replace: true,
    // });

    navigate("/landing", {
      state: { user: response.user, userType },
      replace: true,
    });
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const { name, email, password } = userInfo;

  return (
    <div>
      <NavBar />

      {/* Background color and position of Signup card */}
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">

          {/* Signup card style */}
          <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6 w-96"}>
            <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
              {userType === "customer" ? "USER" : "LANDLORD"} SIGN UP
            </h1>

            {/* Signin card input */}
            <FormInput
              value={name}
              onChange={handleChange}
              label="Name *"
              placeholder="Enter Name"
              name="name"
            />
            <FormInput
              value={email.data}
              onChange={handleChange}
              label="Email *"
              placeholder="Enter Email"
              name="email"
            />
            <FormInput
              value={password}
              onChange={handleChange}
              label="Password *"
              placeholder="Enter Password"
              name="password"
              type="password"
            />

            {/* Signin card button */}
            <Submit value="SIGN UP" />

            {/* Additional routers based on user-type */}
            <div className="flex justify-center"
                style={{fontSize: "12px", fontWeight: "400"}}>
              <p className="pr-1"
                  style={{color: "#4B4B4B", paddingRight: "3px"}}>Alreay a user?</p>
              <span style={{fontWeight: 600}}><CustomLink to={userType === "customer" ? "/auth/user/signin" : "/auth/landlord/signin"}>LOGIN</CustomLink></span>
            </div>
          </form>
      </div>
    </div>
  );
}
