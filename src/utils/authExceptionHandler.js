import axios from "axios";
import { actions } from "./actions";
import { logout } from "./logout";

const authExceptionHandler = (navigate, setupToast, dispatchUserData) => {
  const { REMOVE_USER_CREDENTIALS } = actions;
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        setupToast("TOKEN EXPIRED: Please Login again");
        logout(dispatchUserData, REMOVE_USER_CREDENTIALS);
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

export { authExceptionHandler };
