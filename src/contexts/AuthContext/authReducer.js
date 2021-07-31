import { actions } from "../../utils/actions";

const authReducer = (state, { type, payload }) => {
  const { SET_USER_CREDENTIALS, REMOVE_USER_CREDENTIALS } = actions;

  switch (type) {
    case SET_USER_CREDENTIALS:
      return {
        userID: payload.userID,
        token: payload.token,
        name: payload.name,
        isLoggedIn: payload.isLoggedIn,
      };
    case REMOVE_USER_CREDENTIALS:
      return { ...state, userID: "", token: "", name: "", isLoggedIn: false };
    default:
      return state;
  }
};

export { authReducer };
