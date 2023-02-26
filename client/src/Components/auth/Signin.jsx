import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "./context/hookIndex";
import { commonModalClasses } from "./theme";

import Container from "./Container";
import CustomLink from "./CustomLink";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import Submit from "./Submit";
import Title from "./Title";

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
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    handleLogin(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    // we want to move our user to somewhere else
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>

        {/* Card size */}
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>LOGIN</Title>
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
            <CustomLink to="/auth/forget-password">Forget password?</CustomLink>
          </div>

          <Submit value="LOGIN" busy={isPending} />

          <div className="flex justify-center"
                style={{fontSize: "12px", fontWeight: "400"}}>
            <p style={{color: "#4B4B4B", paddingRight: "3px"}}>
              Don't have an account?
            </p>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
