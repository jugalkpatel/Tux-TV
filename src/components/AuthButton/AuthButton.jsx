import Loader from "react-loader-spinner";

import { useState } from "react";
import { postAPI } from "../../utils/postAPI";
import { useSetupAuth } from "../../hooks/useSetupAuth";
import { useToast } from "../../contexts";
import { useAuth } from "../../contexts";
import {
  validateLoginCredentials,
  validateSignUpCredentials,
} from "../../utils/validateCredentials";

const AuthButton = ({ data }) => {
  const { btnText, btnType, btnClass, ldColor, ...rest } = data;
  const [isLoading, setLoading] = useState(false);
  const { setupToast } = useToast();
  const { dispatchUserData } = useAuth();
  const setupAuth = useSetupAuth(dispatchUserData);

  const onLoginClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!isLoading) {
      const { email, password, path, details } = rest;

      if (!validateLoginCredentials(email, password)) {
        setupToast("Invalid Login Credentials");
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
        setupToast("You're not Registered! Please Signup");
      } else if (status === 403) {
        setupToast("Invalid User Name or Password");
      } else {
        setupToast("Someting went wrong....");
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
        setupToast("Invalid Credentials");
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
        setupToast("failed to signup....");
      }

      setLoading(false);
    }
  };

  const handleClick = btnType === "LOGIN" ? onLoginClick : onSignUpClick;

  return (
    <>
      <button type="submit" className={btnClass} onClick={handleClick}>
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
