import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLandlordAuth, useNotification } from "./context/hookIndex";
import CustomLink from "./CustomLink";
import FormInput from "./FormInput";
import Submit from "./Submit";
import NavBar from "../NavBar"

export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

const validateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" };

  return { ok: true };
};

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { handleLoginLandlord, landlordInfo } = useLandlordAuth();
  const { isPending, isLoggedIn } = landlordInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    handleLoginLandlord(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/landing");
  }, [isLoggedIn]);

  return (
    <div>
      <NavBar />
      
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
          {/* Card size */}
          <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6 w-96"}>
            <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
              LANDLORD LOGIN
            </h1>
            <FormInput
              value={userInfo.email}
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

            <div className="flex justify-end"
                  style={{margin: "2px"}}>
              <CustomLink to="/landlord/forget-password">Forget password?</CustomLink>
            </div>

            <Submit value="LOGIN" busy={isPending} />

            <div className="flex justify-center"
                  style={{fontSize: "12px", fontWeight: "400"}}>
              <p style={{color: "#4B4B4B", paddingRight: "3px"}}>
                Don't have an account?
              </p>
              <CustomLink to="/landlord/signup">SIGN UP</CustomLink>
            </div>
          </form>
      </div>
    </div>
  );
}
