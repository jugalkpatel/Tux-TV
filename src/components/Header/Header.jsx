import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";
import tux_flat from "../../assets/svgs/TuxFlat.svg";
// import search from "../../assets/svgs/search.svg";
import menu from "../../assets/svgs/menu.svg";
import profile from "../../assets/svgs/profile.svg";
import { useAuth } from "../../contexts";
import { SideMenu } from "..";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { name, isLoggedIn } = useAuth();
  return (
    <>
      <div className="nav">
        <span
          className="c-icon showmore--icon"
          onClick={() => setShowMenu((prevState) => !prevState)}
        >
          <img src={menu} alt="menu_icon" />
        </span>

        <h4 className="nav__title" onClick={() => navigate("/")}>
          <span className="c-icon">
            <img src={tux_flat} alt="tux_icon" />
          </span>
          <span className="nav__title__text">TUX TV</span>
        </h4>

        <div className="nav__wrapper">
          <div className="nav__featured">
            <ul className="c-list">
              <li className="c-item">
                <Link to="/saves" className="nav__featured__text">
                  Saves
                </Link>
              </li>
              <li className="c-item">
                <Link to="/playlists" className="nav__featured__text">
                  Playlists
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav__profile">
            {isLoggedIn ? (
              <Link to="/profile" className="nav__btn--profile">
                <span className="c-icon">
                  <img src={profile} alt="profile_icon" />
                </span>
                <span className="nav__btn--profile__text">{name}</span>
              </Link>
            ) : (
              <Link to="/login" className="nav__btn--login">
                LOGIN
              </Link>
            )}
          </div>
        </div>

        {/* for search: refactor */}
        {/* <div className="nav__search">
          <span className="c-icon">
            <img src={search} alt="search_icon" />
          </span>
          <span className="c-input">
            <input type="text" className="e-input" />
          </span>
        </div> */}
      </div>
      <SideMenu show={{ showMenu, setShowMenu }} />
    </>
  );
};

export { Header };
