import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import FormInput from "./FormInput";
import Submit from "./Submit";
import { resetPassword, verifyPasswordResetToken } from "./auth";
import { useNotification } from "./context/hookIndex";

// Thanks to Sakshi for adding the userType parameter to optimize the duplicated structure of landlord. 
export default function ConfirmPassword({userType}) {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Get the token and userId from url
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);

    // Not valid if any error occurs
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    // Not valid if the token is in valid
    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    // If no error occurs and the token is valid, user is able to reset password
    setIsValid(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  // Validate password format, use resetPassword API handling the credentials, and redirect to signin if no error
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.one.trim())
      return updateNotification("error", "Password is missing");

    if (password.one.trim().length < 8)
      return updateNotification("error", "Password must be 8 characters long");

    if (password.one !== password.two)
      return updateNotification("error", "Password do not match");

    const { error, message } = await resetPassword({
      newPassword: password.one,
      userId: id,
      token,
      userType
    });

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    navigate("/auth/signin", { replace: true });
  };

  // Page of the token is still verifying
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

  // Page of isValidToken is not proceed
  if (isValid)
    return (
      <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">
          <h1 className="text-4xl font-semibold text-black">
            Sorry the token is invalid!
          </h1>
      </div>
    );

  // Page of the token is validated and user is allowed to reset password
  return (

    // Background color and position of Reset Password card
    <div className="fixed inset-0 bg-gray-200 -z-10 flex justify-center items-center">

        {/* Reset Password Card */}
        <form onSubmit={handleSubmit} className={"bg-white drop-shadow-lg rounded p-6 space-y-6 w-96"}>
          <h1 style={{ color: '#505050', fontSize: "18px", fontWeight: "600", fontStyle: "normal", fontFamily: "Inter"}}>
            Enter New Password
          </h1>

          {/* User's expected new password */}
          <FormInput
            value={password.one}
            onChange={handleChange}
            label="New Password"
            placeholder="********"
            name="one"
            type="password"
          />

          {/* Double check the password is same of user expected */}
          <FormInput
            value={password.two}
            onChange={handleChange}
            label="Confirm Password"
            placeholder="********"
            name="two"
            type="password"
          />

          {/* Submit button */}
          <Submit value="Confirm Password" />
        </form>
    </div>
  );
}
