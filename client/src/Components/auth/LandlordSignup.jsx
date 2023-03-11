import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newLandlord } from "./auth"
import { useLandlordAuth, useNotification } from "./context/hookIndex";
import CustomLink from "./CustomLink";
import FormInput from "./FormInput";
import Submit from "./Submit";
import NavBar from "../NavBar"

export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

const validateUserInfo = ({ name, email, password }) => {
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { landlordInfo } = useLandlordAuth();
  const { isLoggedIn } = landlordInfo;

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    const response = await newLandlord(userInfo);
    if (response.error) return console.log(response.error);

    navigate("/landlord/verification", {
      state: { user: response.user },
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
                LANDLORD SIGN UP
            </h1>
            <FormInput
              value={name}
              onChange={handleChange}
              label="Name *"
              placeholder="Enter Name"
              name="name"
            />
            <FormInput
              value={email}
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
              <CustomLink to="/landlord/signin">LOGIN</CustomLink>
            </div>
          </form>
      </div>
    </div>
  );
}
