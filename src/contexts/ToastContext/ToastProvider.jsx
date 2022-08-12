import { createContext, useCallback, useContext, useReducer } from "react";
import { actions, getId } from "../../utils";

const ToastContext = createContext();

const initialState = {
  toasts: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TOAST:
      return { ...state, toasts: state.toasts.concat(action.payload.toast) };
    case actions.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(({ id }) => id !== action.payload.id),
      };
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToast = useCallback(
    (message, type) =>
      dispatch({
        type: actions.ADD_TOAST,
        payload: { toast: { id: getId(), message, type } },
      }),
    []
  );

  const removeToast = useCallback(
    (id) => dispatch({ type: actions.REMOVE_TOAST, payload: { id } }),
    []
  );

  return (
    <ToastContext.Provider
      value={{ ...state, dispatch, addToast, removeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
