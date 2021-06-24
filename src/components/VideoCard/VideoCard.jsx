import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./VideoCard.css";
import showmore from "../../assets/svgs/showmore.svg";
import { ImBookmark } from "react-icons/im";
import { RiPlayListAddLine } from "react-icons/ri";

import { useAuth } from "../../contexts/AuthProvider";

const VideoCard = ({ ...video }) => {
  const { thumbnail_src, title, snippet } = video;
  const { handleAPICalls } = useAuth();
  let navigate = useNavigate();
  const [showmenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        className="video-card"
        onClick={() => console.log("clicked on videocard")}
      >
        <div className="video-card__thumbnail">
          <img src={thumbnail_src} className="r-img" alt="thumbnail" />
        </div>
        <div className="h-container">
          <span className="video-card__title">{title}</span>
          <div className="v-container">
            <button
              className="video-card__showmore"
              onClick={() => setShowMenu((prevState) => !prevState)}
            >
              <img src={showmore} alt="show_more" />
            </button>
            <div
              className="video-card__menu"
              style={{ visibility: showmenu ? "visible" : "hidden" }}
            >
              <div className="video-card__menu__dialog">
                <button
                  className="video-card__btn"
                  onClick={() => {
                    setShowMenu(false);
                    navigate(`/modal`, {
                      state: { data: video },
                    });
                  }}
                >
                  Add to playlist
                </button>

                <button className="video-card__btn">Saved</button>
                <button
                  className="video-card__btn"
                  onClick={() => setShowMenu(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
            <section className="o-container">
              <p className="video-card__snippet">{snippet}</p>
              <section className="video-card__btns">
                <button
                  className="video-card__save-btn"
                  // onClick={
                  //   token ? () => console.log("save btn") : navigate("/login")
                  // }
                >
                  <ImBookmark />
                  <span className="video-card__btn__text">SAVE</span>
                </button>
                <button
                  className="video-card__playlist-btn"
                  onClick={() => navigate("/modal", { state: { data: video } })}
                >
                  <RiPlayListAddLine />
                  <span className="video-card__btn__text">PLAYLIST </span>
                </button>
              </section>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export { VideoCard };
