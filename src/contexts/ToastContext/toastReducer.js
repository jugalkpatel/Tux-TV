import { actions } from "../../utils/actions";
const toastReducer = (state, { type, payload }) => {
  const { SET_TOAST, CLEAR_TOAST } = actions;
  switch (type) {
    case SET_TOAST:
      return {
        ...state,
        toastMsg: payload.msg,
        showToast: payload.status,
        toastColor: payload.color || state.toastColor,
      };
    case CLEAR_TOAST:
      return {
        ...state,
        toastMsg: "",
        showToast: false,
        toastColor: "#d1403f",
      };
    default:
      return state;
  }
};

export { toastReducer };
