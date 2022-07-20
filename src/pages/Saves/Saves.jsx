import { Outlet } from "react-router";

import "./Saves.css";
import { FaBookmark } from "react-icons/fa";

import { useData } from "../../contexts";
import { SaveTile } from "../../components";
import { Empty } from "../../components";

const Saves = () => {
  const { saves } = useData();
  return (
    <>
      {!saves.length ? (
        <Empty text="Empty! Please Save Some videos...." />
      ) : (
        <div className="saves">
          <section className="saves__header">
            <h2 className="saves__title">
              <FaBookmark className="saves__icon" />
              <span className="saves__title__text">Saves</span>
            </h2>
          </section>
          <section className="saves__main">
            {saves.map((video) => {
              return <SaveTile key={video.id} {...video} />;
            })}
          </section>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { Saves };
