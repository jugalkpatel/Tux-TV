import axios from "axios";
import { actions } from "./actions";
import { logout } from "./logout";
// pass ready made logout
const authExceptionHandler = (navigate, addToast, dispatchUserData) => {
  const { REMOVE_USER_CREDENTIALS } = actions;
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        addToast("TOKEN EXPIRED: Please Login again", "error");
        logout(dispatchUserData, REMOVE_USER_CREDENTIALS);
        navigate("/login");
      }
      // return Promise.reject(error);
      Promise.reject(error);
      return;
    }
  );
};

export { authExceptionHandler };
