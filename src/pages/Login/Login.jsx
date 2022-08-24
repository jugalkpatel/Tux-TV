import { useReducer } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { loginReducer } from "./loginReducer";
import { AuthButton } from "../../components";

const Login = () => {
  const { state } = useLocation();
  const path = state?.from || "/";
  const details = state?.data || "";

  const initialLoginData = {
    email: "",
    password: "",
    showPassword: false,
    submitting: false,
  };

  const [loginData, dispatchLoginData] = useReducer(
    loginReducer,
    initialLoginData
  );

  const handleShowPassword = (e) => {
    e.preventDefault();
    dispatchLoginData({
      type: "SHOW_PASSWORD",
    });
  };

  return (
    <div className="login">
      <form className="login__main">
        <h2 className="login__title">LOGIN</h2>
        <label htmlFor="email" className="login__label--email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login__input--email"
          placeholder="Enter Email"
          onChange={(e) =>
            dispatchLoginData({
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
            placeholder="Enter Password(At least 8 letters with a number)"
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            value={loginData.password}
            onChange={(e) =>
              dispatchLoginData({
                type: "UPDATE_PASSWORD",
                payload: { data: e.target.value },
              })
            }
            minLength="8"
            maxLength="20"
            required
          />
          <button
            className="login__btn--showpassword"
            onClick={handleShowPassword}
          >
            {loginData.showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* <div className="wrapper--forgetpassword">
          <Link to="/login" className="login__btn--fpassword">
            Forget Password?
          </Link>
        </div> */}

        <div className="wrapper--actions">
          <AuthButton
            data={{
              btnText: "Login",
              btnType: "LOGIN",
              btnClass: "login__btn--login",
              email: loginData.email.trim() || loginData.email,
              password: loginData.password.trim() || loginData.password,
              callback: () => dispatchLoginData({ type: "SUBMIT" }),
              submitting: loginData.submitting,
              path,
              details,
            }}
          />

          <Link to="/signup" className="login__btn--signup">
            Sign Up
          </Link>
        </div>

        <div className="wrapper--asguest">
          <AuthButton
            data={{
              btnText: "Login as a guest",
              btnType: "LOGIN",
              btnClass: "login__btn--asguest",
              ldColor: "#FFD14A",
              email: process.env.REACT_APP_GUEST_EMAIL,
              password: process.env.REACT_APP_GUEST_PASSWORD,
              callback: () => dispatchLoginData({ type: "SUBMIT" }),
              submitting: loginData.submitting,
              path,
              details,
            }}
          />
        </div>
      </form>
    </div>
  );
};

export { Login };
