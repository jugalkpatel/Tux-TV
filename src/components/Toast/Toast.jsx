import { useEffect } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdClose, IoMdCheckmarkCircleOutline } from "react-icons/io";

import "./Toast.css";

import { useToast } from "../../contexts";

const Toast = ({ id, message, type = "success" }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, [id, removeToast]);

  return (
    <div
      className={`toast ${
        type === "error" ? "toast__error" : "toast__success"
      }`}
    >
      {type === "error" ? (
        <RiErrorWarningFill className="toast__icon" />
      ) : (
        <IoMdCheckmarkCircleOutline className="toast__icon" />
      )}
      <article className="toast__content">
        <span className="toast__msg text-truncate">{message}</span>
      </article>
      <button className="toast__btn--close" onClick={removeToast}>
        <IoMdClose className="toast__icon" />
      </button>
    </div>
  );
};

export { Toast };
