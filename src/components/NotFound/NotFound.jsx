import { Link } from "react-router-dom";

import "./NotFound.css";
import notFound from "../../assets/svgs/not_found.svg";

const NotFound = () => {
  return (
    <div className="nf__wrapper">
      <div className="nf__hero">
        <img src={notFound} className="nf__img" alt="not found" />
      </div>

      <h1 className="nf__text">Page Not Found</h1>

      <Link to="/" className="nf__btn--back">
        Back to Home
      </Link>
    </div>
  );
};

export { NotFound };
