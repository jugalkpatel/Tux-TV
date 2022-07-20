import "./Empty.css";
import empty from "../../assets/svgs/empty.svg";

const Empty = ({ text }) => {
  return (
    <div className="empty">
      <article className="empty__hero">
        <img src={empty} className="empty__img" alt="empty__thumbnail" />
      </article>

      <h3 className="empty__text">{text}</h3>
    </div>
  );
};
export { Empty };
