import "./ToastContainer.css";
import { useToast } from "../../contexts";
import { Toast } from "..";

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <>
      {toasts.length ? (
        <div className="toast__container">
          {[...toasts].reverse().map(({ id, message, type }) => {
            return <Toast key={id} id={id} message={message} type={type} />;
          })}
        </div>
      ) : null}
    </>
  );
}

export default ToastContainer;
