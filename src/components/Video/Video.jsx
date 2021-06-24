import React from "react";

import "./Video.css";
import { FaRegBookmark } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";

const Video = ({ thumbnail_src, title, snippet }) => {
  return (
    <section className="video">
      <div className="video__bg--img">
        <span className="i-wrapper">
          <img src={thumbnail_src} alt="thumbnail" className="v-image" />
          <div className="v-gradient"></div>
        </span>
      </div>
      <div className="video__content">
        <div className="v-wrapper">
          <button className="video__title">
            <span className="text-truncate">{title}</span>
          </button>
          <p className="video__snippet text-truncate">{snippet}</p>
          <button className="video__btn--play">
            <FaPlay className="video-icon" />
            <span className="video__btn--text">PLAY</span>
          </button>
          <button className="video__btn--save">
            <FaRegBookmark className="video-icon" />
            <span className="video__btn--text">SAVE</span>
          </button>
          <button className="video__btn--playlist">
            <RiPlayListAddFill className="video-icon" />
            <span className="video__btn--text">PLAYLIST</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export { Video };
