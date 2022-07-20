import { actions } from "../utils/actions";
import { useNavigate } from "react-router";
import { setupAuthHeaderForServiceCalls } from "../utils/setupRequestHeader";
import { authExceptionHandler } from "../utils/authExceptionHandler";
import { useToast } from "../contexts";

const useSetupAuth = (dispatchUserData) => {
  const { SET_USER_CREDENTIALS } = actions;
  const navigate = useNavigate();
  const { setupToast } = useToast();

  return ({ token, id, name, path, data }) => {
    if (token && id && name) {
      dispatchUserData({
        type: SET_USER_CREDENTIALS,
        payload: {
          userID: id,
          token,
          name,
          isLoggedIn: true,
        },
      });

      setupAuthHeaderForServiceCalls(token);
    }

    authExceptionHandler(navigate, setupToast, dispatchUserData);
    navigate(path, { state: { data } });
  };
};

export { useSetupAuth };
