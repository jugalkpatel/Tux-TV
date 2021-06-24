import React, { useReducer } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from "../../contexts/AuthProvider";
import { loginReducer } from "./loginReducer";
import { validateLoginCredentials } from "../../utils/validateCredentials";
import { postAPI } from "../../utils/postAPI";

const Login = () => {
  const { state } = useLocation();
  const path = state?.from || "/";
  const details = state?.details || "";

  const { setupAuth } = useAuth();

  const initialLoginData = { email: "", password: "", showPassword: false };

  const [loginData, dispathLoginData] = useReducer(
    loginReducer,
    initialLoginData
  );

  const handleShowPassword = (e) => {
    e.preventDefault();
    dispathLoginData({
      type: "SHOW_PASSWORD",
    });
  };

  const onLoginClick = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = loginData;
    if (
      !validateLoginCredentials(email, password) &&
      password !== confirmPassword
    ) {
      // TODO: SHOW INVALID CREDENTIALS TOAST
      console.log("invalid credentials");
      return;
    }

    const { data, status } = await postAPI("http://localhost:8080/user/login", {
      email,
      password,
    });

    if (status === 201) {
      const { id, token } = data;
      setupAuth(id, token, path, details);
    }
  };

  return (
    <div className="login">
      <form className="login__main">
        <h2 className="login__title">LOGIN</h2>
        <label htmlFor="email" className="login__label--email">
          Email
        </label>
        <input
          id="email"
          className="login__input--email"
          placeholder="Enter Email"
          pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
          onChange={(e) =>
            dispathLoginData({
              type: "UPDATE_EMAIL",
              payload: { data: e.target.value },
            })
          }
          value={loginData.email}
          required
        />

        <label id="password" className="login__label--password">
          Password
        </label>
        <div className="wrapper--password">
          <input
            type={loginData.showPassword ? "text" : "password"}
            id="password"
            className="login__input--password"
            placeholder="Enter Password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            value={loginData.password}
            onChange={(e) =>
              dispathLoginData({
                type: "UPDATE_PASSWORD",
                payload: { data: e.target.value },
              })
            }
            minLength="8"
            required
          />
          <button
            className="login__btn--showpassword"
            onClick={handleShowPassword}
          >
            {loginData.showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="wrapper--forgetpassword">
          <Link to="/login" className="login__btn--fpassword">
            Forget Password?
          </Link>
        </div>

        <div className="wrapper--actions">
          <button
            type="submit"
            className="login__btn--login"
            onClick={onLoginClick}
          >
            Login
          </button>
          <Link to="/signup" className="login__btn--signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export { Login };
