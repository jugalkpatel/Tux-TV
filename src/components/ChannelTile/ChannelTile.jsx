import { useParams, useNavigate } from "react-router-dom";

import "./ChannelTile.css";
import { RiPlayListAddLine } from "react-icons/ri";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { SaveButton } from "..";
import { PlaylistButton } from "..";

const ChannelTile = ({ ...video }) => {
  const navigate = useNavigate();

  const { id, thumbnail_src, title } = video;

  const { id: channelID } = useParams();
  return (
    <div className="ct">
      <section
        className="ct__main"
        onClick={() =>
          navigate(`/video/${title}`, {
            state: { fromVideoCard: true, data: video },
          })
        }
      >
        <section
          className="ct__thumbnail common__thumbnail"
          style={{ backgroundImage: `url(${thumbnail_src})` }}
        ></section>

        <section className="ct__content">
          <h4 className="ct__title text-truncate">{title}</h4>
        </section>
      </section>
      <section className="ct__tray">
        <SaveButton
          data={{
            btnClass: "ct__btn--save",
            id,
            svgSaved: <FaBookmark />,
            svgNotSaved: <FaRegBookmark />,
          }}
        />

        <PlaylistButton
          data={{
            btnClass: "ct__btn--playlist",
            video,
            route: `/channel/${channelID}/modal`,
            svg: <RiPlayListAddLine />,
          }}
        />
      </section>
    </div>
  );
};

export { ChannelTile };
