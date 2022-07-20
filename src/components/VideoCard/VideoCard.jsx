import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./VideoCard.css";
import { GoKebabVertical } from "react-icons/go";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";

import { PlaylistButton } from "..";
import { SaveButton } from "..";
import { MobileMenu } from "./MobileMenu";

const VideoCard = ({ ...video }) => {
  const { id, thumbnail_src, title } = video;

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="vcard">
      <article
        className="vcard__main"
        onClick={() =>
          navigate(`/video/${title}`, {
            state: { fromVideoCard: true, data: video },
          })
        }
      >
        <section
          className="vcard__thumbnail"
          style={{ backgroundImage: `url(${thumbnail_src})` }}
        ></section>
        <section className="vcard__content">
          <h4 className="vcard__title text-truncate">{title}</h4>
          <button
            className="vcard__btn--showmore"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prevState) => !prevState);
            }}
          >
            <GoKebabVertical className="vcard__icon" />
          </button>
        </section>
      </article>

      <MobileMenu showMenu={showMenu} setShowMenu={setShowMenu}>
        <SaveButton
          data={{
            btnClass: "vcard__menu__btn--save",
            id,
            btnText: "Save",
            btnTextClass: "vcard__menu__btn--text",
          }}
        />

        <PlaylistButton
          data={{
            btnClass: "vcard__menu__btn--playlist",
            video,
            btnText: "Add to Playlist",
            btnTextClass: "vcard__menu__btn--text",
          }}
        />
      </MobileMenu>

      <article className="vcard__overlay">
        <section className="vcard__overlay__btns">
          <SaveButton
            data={{
              btnClass: "vcard__overlay__btn--save",
              id,
              svgSaved: <FaBookmark className="vcard__overlay__icon" />,
              svgNotSaved: <FaRegBookmark className="vcard__overlay__icon" />,
            }}
          />

          <PlaylistButton
            data={{
              btnClass: "vcard__overlay__btn--playlist",
              video,
              svg: <RiPlayListAddFill className="vcard__overlay__icon" />,
            }}
          />
        </section>
      </article>
    </div>
  );
};

export { VideoCard };
