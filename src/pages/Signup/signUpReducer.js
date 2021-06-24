const signUpReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_USERNAME":
      return { ...state, userName: payload.data };
    case "UPDATE_EMAIL":
      return { ...state, email: payload.data };
    case "UPDATE_PASSWORD":
      return { ...state, password: payload.data };
    case "CONFIRM_PASSWORD":
      return { ...state, confirmPassword: payload.data };
    case "SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
};

export { signUpReducer };
