import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newUser } from "./auth"
import { useAuth, useNotification } from "./context/hookIndex";
import CustomLink from "./CustomLink";
import FormInput from "./FormInput";
import Submit from "./Submit";
import NavBar from "../NavBar"
import { useToast } from "@chakra-ui/react";

export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

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
  const { authInfo } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    const response = await newUser(userInfo);
    if (response.error) {
      return updateNotification("error", response.error);
    }

    navigate("/auth/verification", {
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
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
          <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6 w-96"}>
            <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
              {userType === "customer" ? "USER" : "LANDLORD"} SIGN UP
            </h1>
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
            <Submit value="SIGN UP" />

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
