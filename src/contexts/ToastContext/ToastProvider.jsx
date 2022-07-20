import { createContext, useContext, useEffect, useReducer } from "react";

import { toastReducer } from "./toastReducer";
import { actions } from "../../utils/actions";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const initialState = {
    toastMsg: "",
    showToast: false,
    toastColor: "#d1403f",
  };

  const [toastData, dispatchToastData] = useReducer(toastReducer, initialState);

  const setupToast = (msg, bgColor) => {
    const { SET_TOAST } = actions;
    dispatchToastData({
      type: SET_TOAST,
      payload: { msg, status: true, color: bgColor },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const { CLEAR_TOAST } = actions;
      dispatchToastData({ type: CLEAR_TOAST });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastData.toastMsg]);

  return (
    <ToastContext.Provider
      value={{ ...toastData, dispatchToastData, setupToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };
