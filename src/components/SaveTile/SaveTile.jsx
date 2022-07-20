import { Link, useNavigate } from "react-router-dom";

import "./SaveTile.css";
import { RiPlayListAddLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

import { SaveButton } from "..";
import { PlaylistButton } from "..";

const SaveTile = ({ ...video }) => {
  const { id, title, channel, thumbnail_src } = video;
  const navigate = useNavigate();
  return (
    <div className="st">
      <article
        className="st__main"
        onClick={() =>
          navigate(`/video/${title}`, {
            state: { fromVideoCard: true, data: video },
          })
        }
      >
        <section
          className="common__thumbnail"
          style={{ backgroundImage: `url(${thumbnail_src})` }}
        ></section>

        <section className="st__content">
          <h4 className="st__title">{title}</h4>
        </section>
      </article>

      <Link to={`/channel/${channel.id}`} className="st__channel">
        {channel.title}
      </Link>

      <article className="st__tray">
        <SaveButton
          data={{
            btnClass: "st__btn--remove",
            id,
            svgSaved: <AiOutlineClose className="st__icon" />,
          }}
        />

        <PlaylistButton
          data={{
            btnClass: "st__btn--playlist",
            video,
            route: "/saves/modal",
            svg: <RiPlayListAddLine className="st__icon" />,
          }}
        />
      </article>
    </div>
  );
};

export { SaveTile };
