import { Link } from "react-router-dom";

import "./Profile.css";
import { FaRegUserCircle } from "react-icons/fa";

import { useAuth, useData } from "../../contexts";
import { actions } from "../../utils/actions";
import { logout } from "../../utils/logout";

const Profile = () => {
  const { name, dispatchUserData } = useAuth();

  const { saves, playlists, dispatchData } = useData();

  const { CLEAR_DATA, REMOVE_USER_CREDENTIALS } = actions;

  const onLogoutClick = () => {
    dispatchData({ type: CLEAR_DATA });
    logout(dispatchUserData, REMOVE_USER_CREDENTIALS);
  };

  return (
    <div className="profile">
      <article className="profile__content">
        <article className="profile__info">
          <FaRegUserCircle className="profile__icon" />
          <p className="profile__uname">{name}</p>
        </article>
        <article className="profile__btns">
          <Link to="/playlists" className="profile__btn--playlists">
            <span className="profile__btn--text">Playlists</span>
            <span className="profile__btn--playlists__count">
              {playlists.length || 0}
            </span>
          </Link>
          <Link to="/saves" className="profile__btn--saves">
            <span className="profile__btn--text">Saves</span>
            <span className="profile__btn--saves__count">
              {saves.length || 0}
            </span>
          </Link>
        </article>
        <button
          className="profile__btn--logout"
          onClick={() => onLogoutClick()}
        >
          <span className="profile__btn--text">LOGOUT</span>
        </button>
      </article>
    </div>
  );
};

export { Profile };
