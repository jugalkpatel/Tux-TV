import "./Toast.css";
import { IoMdClose } from "react-icons/io";

import { useToast } from "../../contexts";
import { actions } from "../../utils/actions";

const Toast = () => {
  const { CLEAR_TOAST } = actions;
  const { toastMsg, showToast, dispatchToastData } = useToast();

  return (
    <div
      className="toast"
      style={{ visibility: showToast ? "visible" : "hidden" }}
    >
      <article className="toast__content">
        <span className="toast__msg text-truncate">{toastMsg}</span>
      </article>
      <button
        className="toast__btn--close"
        onClick={() => dispatchToastData({ type: CLEAR_TOAST })}
      >
        <IoMdClose className="toast__icon" />
      </button>
    </div>
  );
};

export { Toast };
