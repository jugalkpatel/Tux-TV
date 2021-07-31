import React from "react";
import { Link } from "react-router-dom";

import "./Hero.css";
import "../Featured/Featured.css";
import { FaPlay } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

import { SaveButton } from "..";

const Hero = ({ ...video }) => {
  const { id, thumbnail_src, title, snippet } = video;
  return (
    <div className="hero">
      <div
        className="hero__back"
        style={{ backgroundImage: `url(${thumbnail_src})` }}
      ></div>
      <section className="hero__front">
        <section className="hero__front__dialog">
          <Link
            to={`/video/${title}`}
            className="hero__title text-truncate"
            state={{ fromVideoCard: true, data: video }}
          >
            {title}
          </Link>
          <p className="hero__desc text-truncate">{snippet}</p>
          <section className="hero__media">
            <Link
              className="hero__btn--play"
              to={`/video/${title}`}
              state={{ fromVideoCard: false, data: video }}
            >
              <FaPlay className="hero-icon" />
              <span className="hero__btn--text">PLAY</span>
            </Link>

            <SaveButton
              data={{
                btnClass: "hero__btn--save",
                ldColor: "#FFD14A",
                id,
                svgSaved: <BsBookmarkFill className="hero-icon" />,
                svgNotSaved: <BsBookmark className="hero-icon" />,
                btnText: "SAVE",
                btnTextClass: "hero__btn--text",
              }}
            />

            <Link
              to="/modal"
              state={{ data: video }}
              className="hero__btn--playlist"
            >
              <RiPlayListAddFill className="hero-icon" />
              <span className="hero__btn--text">PLAYLIST</span>
            </Link>
          </section>
        </section>
      </section>
    </div>
  );
};

export { Hero };
