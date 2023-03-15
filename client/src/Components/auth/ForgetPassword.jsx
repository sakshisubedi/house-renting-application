import React, { useState } from "react";
import { forgetPassword } from "./auth";
import { useNotification } from "./context/hookIndex";
import CustomLink from "./CustomLink";
import FormInput from "./FormInput";
import Submit from "./Submit";
import NavBar from "../NavBar"

// Check if the format of email input is valid
export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

// Thanks to Sakshi for adding the userType parameter to optimize the duplicated structure of landlord. 
export default function ForgetPassword({userType}) {
  const [email, setEmail] = useState("");

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  // First validate email format, then use forgetPassword API to send use's email to server on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid email!");

    const { error, message } = await forgetPassword(email, userType);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };

  return (
    <div>
      <NavBar />

      {/* Background color and position of Forget password card */}
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">

          {/* Forget password cardand header */}
          <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6 w-96"}>
            <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
              Please Enter Your Email
            </h1>

            {/* Forget password Input */}
            <FormInput
              onChange={handleChange}
              value={email}
              label="Email *"
              placeholder="Enter Email"
              name="email"
            />

            {/* Forget password button */}
            <Submit value="Send Link" />

            {/* Additional routers */}
            <div className="flex justify-between">
              <CustomLink to={userType === "customer" ? "/auth/user/signin": "/auth/landlord/signin"}>Sign in</CustomLink>
              <CustomLink to={userType === "customer" ? "/auth/user/signup": "/auth/landlord/signup"}>Sign up</CustomLink>
            </div>
          </form>
      </div>
    </div>
  );
}
