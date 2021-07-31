import "./Spinner.css";
import Loader from "react-loader-spinner";
const Spinner = () => {
  return (
    <span className="spinner">
      <Loader type="Oval" height={100} width={100} color="#fff" />
    </span>
  );
};

export { Spinner };
