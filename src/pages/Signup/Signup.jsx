import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signUpReducer } from "./signUpReducer";
import { postAPI } from "../../utils/postAPI";
import { validateSignUpCredentials } from "../../utils/validateCredentials";

const Signup = () => {
  const navigate = useNavigate();

  const initialSignUpData = { userName: "", email: "", password: "", confirmPassword: "", showPassword: false};
  const [signupData, dispathSignUpData] = useReducer(signUpReducer, initialSignUpData);

  const handleShowPassword = (e) => {
    e.preventDefault();
    dispathSignUpData({
      type: "SHOW_PASSWORD",
    });
  };

  const onSignUpClick = async (e) => {
    e.preventDefault();
    const { userName, email, password, confirmPassword } = signupData;
    if (
      !validateSignUpCredentials(userName, email, password) ||
      password !== confirmPassword
    ) {
      // TODO: SHOW TOAST FOR INVALID CREDENTIALS
      console.log("invalid credentials");
      return;
    }

    const { status } = await postAPI("http://localhost:8080/user/register", {
      name: userName,
      email: email,
      password: password,
    });

    if (status === 201) {
      navigate("/login");
      return;
    }
  };

  console.log({ signupData });

  return (
    <div className="signup">
      <form className="signup__main">
        <h2 className="signup__title">SIGN UP</h2>

        <label htmlFor="name" className="signup__label--uname">
          Username
        </label>
        <input
          id="name"
          className="signup__input--uname"
          placeholder="Enter Username"
          minLength="3"
          maxLength="20"
          value={signupData.userName}
          onChange={(e) =>
            dispathSignUpData({
              type: "UPDATE_USERNAME",
              payload: { data: e.target.value },
            })
          }
          required
        />

        <label htmlFor="email" className="signup__label--email">
          Email
        </label>
        <input
          id="email"
          className="signup__input--email"
          placeholder="Enter Email"
          pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
          value={signupData.email}
          onChange={(e) =>
            dispathSignUpData({
              type: "UPDATE_EMAIL",
              payload: { data: e.target.value },
            })
          }
          required
        />

        <label id="password" className="signup__label--password">
          Password
        </label>
        <div className="wrapper--password">
          <input
            type={signupData.showPassword ? "text" : "password"}
            id="password"
            className="signup__input--password"
            placeholder="Enter Password"
            minLength="8"
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            value={signupData.password}
            onChange={(e) =>
              dispathSignUpData({
                type: "UPDATE_PASSWORD",
                payload: { data: e.target.value },
              })
            }
            required
          />
          <button
            className="signup__btn--showpassword"
            onClick={handleShowPassword}
          >
            {signupData.showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <label id="cpassword" className="signup__label--password">
          Confirm Password
        </label>
        <div className="wrapper--password">
          <input
            type={signupData.showPassword ? "text" : "password"}
            id="cpassword"
            className="signup__input--password"
            placeholder="Enter Password"
            minLength="8"
            value={signupData.confirmPassword}
            onChange={(e) =>
              dispathSignUpData({
                type: "CONFIRM_PASSWORD",
                payload: { data: e.target.value },
              })
            }
            required
          />
          <button
            className="signup__btn--showpassword"
            onClick={handleShowPassword}
          >
            {signupData.showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="wrapper--actions">
          <button
            type="submit"
            className="signup__btn--signup"
            onClick={onSignUpClick}
          >
            Sign Up
          </button>
          <Link to="/login" className="signup__btn--login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export { Signup };
