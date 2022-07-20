import { Link } from "react-router-dom";

import "./SideMenu.css";

import { useAuth } from "../../contexts";

const SideMenu = ({ show: { showMenu, setShowMenu } }) => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div
        className="sidemenu"
        style={{ display: showMenu ? "block" : "none" }}
      >
        <ul className="u-list">
          {!isLoggedIn && (
            <li className="u-item">
              <section className="s-list">
                <span className="sidemenu__account">Account</span>
                <Link to="/login" className="sidemenu__btn--login">
                  Login
                </Link>

                <Link to="/signup" className="sidemenu__btn--signup">
                  Sign up
                </Link>
              </section>
            </li>
          )}

          {isLoggedIn && (
            <li className="u-item">
              <section className="s-list">
                <span className="sidemenu__profile">Profile</span>
                <Link to="/playlists" className="sidemenu__btn--playlists">
                  Playlists
                </Link>

                <Link to="/saves" className="sidemenu__btn--saves">
                  Saves
                </Link>

                <Link to="/profile" className="sidemenu__btn--logout">
                  Logout
                </Link>
              </section>
            </li>
          )}

          <li className="u-item">
            <button
              className="sidemenu__btn--close"
              onClick={() => setShowMenu(false)}
            >
              Close
            </button>
          </li>
        </ul>
      </div>

      <div
        className="sidemenu__util"
        style={{ display: showMenu ? "block" : "none" }}
        onClick={() => {
          setShowMenu(false);
        }}
      ></div>
    </>
  );
};

export { SideMenu };
