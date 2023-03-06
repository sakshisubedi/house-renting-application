import React, { useState } from "react";
import { forgetPassword } from "./auth";
import { useNotification } from "./context/hookIndex";
import CustomLink from "./CustomLink";
import FormInput from "./FormInput";
import Submit from "./Submit";

export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

export default function ForgetPassword() {
  const [email, setEmail] = useState({
    data: "",
  });

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail({ ...email, data: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email.data))
      return updateNotification("error", "Invalid email!");

    const { error, message } = await forgetPassword(email.data);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
  };

  return (
    <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
        <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6 w-96"}>
          <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
            Please Enter Your Email
          </h1>
          <FormInput
            onChange={handleChange}
            value={email.data}
            label="Email *"
            placeholder="Enter Email"
            name="email"
          />
          <Submit value="Send Link" />

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
    </div>
  );
}
