import React from "react";
import { Link } from "react-router-dom";

import "./Featured.css";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";

import { SaveButton } from "..";
import { PlaylistButton } from "..";

const Featured = ({ ...video }) => {
  const { id, title, thumbnail_src, snippet } = video;
  return (
    <section className="featured">
      <div className="featured__bg--img">
        <span className="i-wrapper">
          <img src={thumbnail_src} alt="thumbnail" className="v-image" />
          <div className="v-gradient"></div>
        </span>
      </div>

      <div className="featured__content">
        <div className="v-wrapper">
          <Link
            to={`/video/${title}`}
            state={{ fromVideoCard: true, data: video }}
            className="featured__title"
          >
            <span className="text-truncate">{title}</span>
          </Link>

          <p className="featured__snippet text-truncate">{snippet}</p>

          <Link
            className="featured__btn--play"
            to={`/video/${title}`}
            state={{ fromVideoCard: false, data: video }}
          >
            <FaPlay className="featured-icon" />
            <span className="featured__btn--text">PLAY</span>
          </Link>

          <SaveButton
            data={{
              btnClass: "featured__btn--save",
              ldColor: "#FFD14A",
              id,
              svgSaved: <BsBookmarkFill className="featured-icon" />,
              svgNotSaved: <BsBookmark className="featured-icon" />,
              btnText: "SAVE",
              btnTextClass: "featured__btn--text",
            }}
          />

          <PlaylistButton
            data={{
              btnClass: "featured__btn--playlist",
              video,
              route: "/modal",
              btnText: "PLAYLIST",
              btnTextClass: "featured__btn--text",
              svg: <RiPlayListAddFill className="featured-icon" />,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export { Featured };
