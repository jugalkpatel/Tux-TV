import { Link } from "react-router-dom";

import "./PlaylistTile.css";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { PlaylistVideoRemove } from "./PlaylistVideoRemove";
import { SaveButton } from "..";

const PlayListTile = ({ video, playlistID }) => {
  const { id, title, channel, thumbnail_src } = video;

  return (
    <div className="pt">
      <article className="pt__main">
        <section
          className="pt__thumbnail common__thumbnail"
          style={{ backgroundImage: `url(${thumbnail_src})` }}
        ></section>

        <section className="pt__content">
          <h4 className="pt__title  text-truncate">{title}</h4>
        </section>
      </article>

      <Link to={`/channel/${channel.id}`} className="pt__channel">
        {channel.title}
      </Link>

      <article className="pt__tray">
        <PlaylistVideoRemove data={{ playlistID, videoID: id }} />

        <SaveButton
          data={{
            btnClass: "pt__btn--save",
            id,
            svgSaved: <FaBookmark className="pt__icon" />,
            svgNotSaved: <FaRegBookmark className="pt__icon" />,
          }}
        />
      </article>
    </div>
  );
};

export { PlayListTile };
