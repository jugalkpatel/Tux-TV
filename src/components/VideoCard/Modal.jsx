import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Modal.css";
import close from "../../assets/svgs/close.svg";
import plus from "../../assets/svgs/plus.svg";
import { useLocation } from "react-router-dom";

const Modal = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showAddPlaylist, setShowAddPlaylist] = useState(false);
  const displayAddPlaylist = showAddPlaylist ? "flex" : "none";
  const displayCreatePlaylist = showAddPlaylist ? "none" : "flex";
  console.log({ state });
  return (
    <div className="modal">
      <div className="modal__dialog">
        <section className="modal__top">
          <h3 className="modal__title">Save to...</h3>
          <button className="modal__close-btn" onClick={() => navigate("/")}>
            <img src={close} alt="close_icon" />
          </button>
        </section>

        <section className="modal__content">
          <ul className="m-list">
            <li className="m-item">
              <input type="checkbox" />
              <label htmlFor="aa" className="checkbox__text">
                Lorem ipsum dolor.
              </label>
            </li>

            <li className="m-item">
              <input type="checkbox" />
              <label htmlFor="aa" className="checkbox__text">
                Lorem ipsum dolor.
              </label>
            </li>

            <li className="m-item">
              <input type="checkbox" />
              <label htmlFor="aa" className="checkbox__text">
                Lorem ipsum dolor.
              </label>
            </li>
          </ul>
        </section>

        <section className="modal__bottom">
          <button
            className="modal__playlist-create-btn"
            onClick={() => setShowAddPlaylist(true)}
            style={{ display: displayCreatePlaylist }}
          >
            <img src={plus} alt="plus_icon" />
            <span className="btn-text">Create new playlist</span>
          </button>
          <section
            className="modal__playlist-create"
            style={{ display: displayAddPlaylist }}
          >
            <span className="modal__playlist-name">Name</span>
            <input
              type="text"
              className="modal__playlist-name__field"
              placeholder="Enter playlist name...."
            />
            <button className="modal__playlist-create__create-btn">
              CREATE
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};

export { Modal };
