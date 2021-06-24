import React from "react";
import { Link } from "react-router-dom";

import "./Hero.css";
import "../Video/Video.css";
import { FaPlay, FaRegBookmark } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";

const Hero = ({ thumbnail_src, title, snippet }) => {
  return (
    <div className="hero">
      <div
        className="hero__back"
        style={{ backgroundImage: `url(${thumbnail_src})` }}
      ></div>
      <section className="hero__front">
        <section className="hero__front__dialog">
          <Link to="/video" className="hero__title">
            {title}
          </Link>
          <p className="hero__desc text-truncate">{snippet}</p>
          <section className="hero__media">
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
          </section>
        </section>
      </section>
    </div>
  );
};

export { Hero };
