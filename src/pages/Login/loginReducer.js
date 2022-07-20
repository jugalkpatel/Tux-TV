const loginReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_EMAIL":
      return { ...state, email: payload.data };
    case "UPDATE_PASSWORD":
      return { ...state, password: payload.data };
    case "SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
};

export { loginReducer };
