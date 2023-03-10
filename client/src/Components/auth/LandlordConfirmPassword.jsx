import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import FormInput from "./FormInput";
import Submit from "./Submit";
import { resetPasswordLandlord, verifyPasswordResetTokenLandlord } from "./auth";
import { useNotification } from "./context/hookIndex";

export default function ConfirmPassword() {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  // isValid, !isValid
  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetTokenLandlord(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim())
      return updateNotification("error", "Password is missing");

    if (password.one.trim().length < 8)
      return updateNotification("error", "Password must be 8 characters long");

    if (password.one !== password.two)
      return updateNotification("error", "Password do not match");

    const { error, message } = await resetPasswordLandlord({
      newPassword: password.one,
      userId: id,
      token,
    });

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/landlord/signin", { replace: true });
  };

  if (isVerifying)
    return (
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold text-black">
              Please wait we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl text-black" />
          </div>
      </div>
    );

  if (isValid)
    return (
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
          <h1 className="text-4xl font-semibold text-black">
            Sorry the token is invalid!
          </h1>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
        <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6 w-96"}>
          <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
            Enter New Password
          </h1>
          <FormInput
            value={password.one}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="one"
            type="password"
          />
          <FormInput
            value={password.two}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="********"
            name="two"
            type="password"
          />
          <Submit value="Confirm Password" />
        </form>
    </div>
  );
}
