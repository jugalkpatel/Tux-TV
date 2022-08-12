import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { postAPI } from "../../utils/postAPI";
import { useSetupAuth } from "../../hooks/useSetupAuth";
import { useToast, useAuth } from "../../contexts";
import {
  validateLoginCredentials,
  validateSignUpCredentials,
} from "../../utils/validateCredentials";

const AuthButton = ({ data }) => {
  const { btnText, btnType, btnClass, ldColor, callback, submitting, ...rest } =
    data;
  const [isLoading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { dispatchUserData } = useAuth();
  const setupAuth = useSetupAuth(dispatchUserData);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const onLoginClick = async (e) => {
    e.preventDefault();

    if (callback) {
      callback();
    }

    setLoading(true);

    if (!isLoading) {
      const { email, password, path, details } = rest;

      if (!validateLoginCredentials(email, password)) {
        addToast("Invalid Login Credentials", "error");
        setLoading(false);
        return;
      }

      const { data, status } = await postAPI(`/user/login`, {
        email,
        password,
      });

      if (status === 201) {
        const { token, id, name } = data;
        setLoading(false);

        localStorage?.setItem("ttv", JSON.stringify({ token, id, name }));

        setupAuth({ token, id, name, path, data: details });
        return;
      }

      if (status === 404) {
        addToast("You're not Registered! Please Signup", "error");
      } else if (status === 403) {
        addToast("Invalid User Name or Password", "error");
      } else {
        addToast("Someting went wrong....", "error");
      }

      setLoading(false);
    }
  };

  const onSignUpClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!isLoading) {
      const { userName, email, password, confirmPassword } = rest;

      if (
        !validateSignUpCredentials(userName, email, password) ||
        password !== confirmPassword
      ) {
        addToast("Invalid Credentials", "error");
        setLoading(false);
        return;
      }

      const { data, status } = await postAPI("/user/register", {
        name: userName,
        email,
        password,
      });

      if (status === 201) {
        const { token, id, name } = data.credentials;
        localStorage?.setItem("ttv", JSON.stringify({ token, id, name }));
        setupAuth({ token, id, name, path: "/", data: null });
      } else {
        addToast("failed to signup....", "error");
      }

      setLoading(false);
    }
  };

  const handleClick = btnType === "LOGIN" ? onLoginClick : onSignUpClick;

  return (
    <>
      <button
        type="submit"
        className={btnClass}
        onClick={handleClick}
        disabled={submitting ? true : false}
      >
        {isLoading ? (
          <Loader
            type="Bars"
            color={ldColor || "#000"}
            height={16}
            width={16}
          />
        ) : (
          btnText
        )}
      </button>
    </>
  );
};

export { AuthButton };
