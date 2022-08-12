const loginReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_EMAIL":
      return { ...state, email: payload.data };
    case "UPDATE_PASSWORD":
      return { ...state, password: payload.data };
    case "SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    case "SUBMIT":
      return { ...state, submitting: true };
    default:
      return state;
  }
};

export { loginReducer };
