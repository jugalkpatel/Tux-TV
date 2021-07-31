import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./PlaylistCard.css";
import { GoKebabVertical } from "react-icons/go";
import { RiPlayList2Fill } from "react-icons/ri";
import preview from "../../assets/svgs/no_preview.png";

import { PlaylistMenu } from "./PlaylistMenu";
import { useAuth } from "../../contexts";

const PlaylistCard = ({ ...playlist }) => {
  const { name } = useAuth();
  const { id, title, videos } = playlist;

  const [showMenu, setShowMenu] = useState(false);

  const length = videos.length || 0;
  const navigate = useNavigate();

  return (
    <div className="pc">
      <article
        className="pc__main"
        onClick={() => navigate(`/playlist/${title}`, { state: { id } })}
      >
        <section
          className="pc__thumbnail common__thumbnail"
          style={{
            backgroundImage: `url(${
              length ? videos[0].thumbnail_src : preview
            })`,
          }}
        >
          <div className="pc__thumbnail__overlay">
            <span className="pc__video__count--overlay">{length}</span>
            <RiPlayList2Fill className="pc__icon" />
          </div>
        </section>
        <section className="pc__content">
          <h4 className="pc__title text-truncate">{title}</h4>
          <p className="pc__channel">{name}</p>
        </section>
      </article>
      <section className="pc__showmore">
        <button
          className="pc__btn--showmore"
          onClick={() => setShowMenu((prevState) => !prevState)}
        >
          <GoKebabVertical className="pc__icon" />
        </button>
        <PlaylistMenu menu={{ showMenu, setShowMenu }} playlist={{ id }} />
      </section>
    </div>
  );
};

export { PlaylistCard };
