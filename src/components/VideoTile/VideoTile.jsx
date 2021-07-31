import { Link } from "react-router-dom";

import "./VideoTile.css";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";

import { SaveButton } from "..";
import { useAuth, useData } from "../../contexts";
import { VideoCard } from "../VideoCard/VideoCard";

const VideoTile = ({ ...video }) => {
  const { id, thumbnail_src, title, snippet } = video;
  const { isLoggedIn } = useAuth();
  const { saves } = useData();
  return (
    <div className="vtile">
      <div
        className="vtile__back"
        style={{ backgroundImage: `url(${thumbnail_src})` }}
      ></div>

      <section className="vtile__front">
        <section className="vtile__front__dialog">
          <Link to="/video" className="vtile__title">
            {title}
          </Link>

          <p className="vtile__desc text-truncate">{snippet}</p>

          <section className="vtile__media">
            <Link
              to={`/video/${title}`}
              state={{ fromVideoCard: false, data: video }}
              className="vtile__btn--play"
            >
              <FaPlay className="vtile-icon" />
              <span className="vtile__btn--text">PLAY</span>
            </Link>

            <SaveButton
              data={{
                btnClass: "vtile__btn--save",
                id,
                svgSaved: <FaBookmark className="vtile-icon" />,
                svgNotSaved: <FaRegBookmark className="vtile-icon" />,
                btnText: "SAVE",
                btnTextClass: "vtile__btn--text",
              }}
            />

            <Link
              to={`/video/${title}/modal`}
              state={{ data: video, fromVideoCard: true }}
              className="vtile__btn--playlist"
            >
              <RiPlayListAddFill className="vtile-icon" />
              <span className="vtile__btn--text">PLAYLIST</span>
            </Link>
          </section>
        </section>

        <section className="vtile__saves">
          {isLoggedIn ? (
            <div className="vtile__saves--videos">
              <h2 className="vtile__saves__title">My Saves</h2>
              <section className="scrollable-list__videos">
                {saves.length
                  ? saves.map((video) => {
                      return <VideoCard key={video.id} {...video} />;
                    })
                  : null}
              </section>
            </div>
          ) : (
            <div className="vtile__saves--notloggedin">
              <h1 className="vtile__snippet">
                Watch Linux 🐧 and neovim related videos and level up 📈 your
                skills.
              </h1>
              <Link to="/login" className="vtile__btn--signin">
                <span className="vtile__btn--text">LOGIN</span>
              </Link>
            </div>
          )}
        </section>
      </section>
    </div>
  );
};

export { VideoTile };
