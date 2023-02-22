import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

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
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
  };

  useEffect(() => {
    // we want to move our user to somewhere else
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>SIGN UP</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            label="Name"
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
            <CustomLink to="/auth/signin">LOGIN</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
