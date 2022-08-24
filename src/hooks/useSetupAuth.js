import { actions } from "../utils/actions";
import { useNavigate } from "react-router";
import { setupAuthHeaderForServiceCalls } from "../utils/setupRequestHeader";
import { authExceptionHandler } from "../utils/authExceptionHandler";
import { useToast } from "../contexts";

const useSetupAuth = (dispatchUserData) => {
  const { SET_USER_CREDENTIALS } = actions;
  const navigate = useNavigate();
  const { addToast } = useToast();

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

    authExceptionHandler(navigate, addToast, dispatchUserData);
    navigate(path, { replace: true, state: { data } });
  };
};

export { useSetupAuth };
