import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

import { useData } from "../../contexts";
import { CheckBox } from "..";
import { CreatePlaylist } from "..";

const Modal = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: videoID } = state.data;

  const { playlists } = useData();

  const [showAddPlaylist, setShowAddPlaylist] = useState(false);

  const displayAddPlaylist = showAddPlaylist ? "flex" : "none";
  const displayCreatePlaylist = showAddPlaylist ? "none" : "flex";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="modal">
      <div className="modal__dialog">
        <section className="modal__top">
          <h3 className="modal__title">Add to...</h3>

          <button className="modal__close-btn" onClick={() => navigate(-1)}>
            <IoMdClose className="modal__icon" />
          </button>
        </section>

        {playlists.length ? (
          <section className="modal__content">
            <ul className="m-list">
              {playlists.map((playlist, index) => {
                return (
                  <li className="m-item" key={index}>
                    <CheckBox videoID={videoID} {...playlist} />
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <p className="modal__txt--empty">There are no playlists...</p>
        )}

        <section className="modal__bottom">
          <button
            className="modal__btn--add"
            onClick={() => setShowAddPlaylist(true)}
            style={{ display: displayCreatePlaylist }}
          >
            <AiOutlinePlus className="modal__icon" />
            <span className="btn-text">Create new playlist</span>
          </button>

          <CreatePlaylist displayAddPlaylist={displayAddPlaylist} />
        </section>
      </div>
    </div>
  );
};

export { Modal };
