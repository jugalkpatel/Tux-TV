import React from "react";

import "./Header.css";
import tux_flat from "../../assets/svgs/TuxFlat.svg";
import search from "../../assets/svgs/search.svg";
import menu from "../../assets/svgs/menu.svg";
import vim from "../../assets/svgs/vim.svg";
import arch from "../../assets/svgs/archlinux.svg";
import gentoo from "../../assets/svgs/gentoo.svg";
import profile from "../../assets/svgs/profile.svg";

const Header = () => {
  return (
    <div className="nav">
      <h4 className="nav__title">
        <span className="c-icon">
          <img src={tux_flat} alt="tux_icon" />
        </span>
        <span className="nav__title__text">TUX TV</span>
      </h4>

      <div className="nav__featured">
        <ul className="c-list">
          <li className="c-item">
            <span className="nav__featured__text">Saved</span>
          </li>
          <li className="c-item">
            <span className="nav__featured__text">Top 10</span>
          </li>
          <li className="c-item">
            <span className="nav__featured__text">Specials</span>
          </li>
        </ul>
      </div>
      <div className="nav__search">
        <span className="c-icon">
          <img src={search} alt="search_icon" />
        </span>
        <span className="c-input">
          <input type="text" className="e-input" />
        </span>
      </div>
      <div className="nav__topics">
        <ul className="c-list">
          <li className="c-item">
            <img src={vim} alt="vim_icon" />
          </li>
          <li className="c-item">
            <img src={arch} alt="arch_icon" />
          </li>
          <li className="c-item">
            <img src={gentoo} alt="gentoo_icon" />
          </li>
        </ul>
      </div>
      <div className="nav__show-more">
        <span className="c-icon">
          <img src={menu} alt="menu_icon" />
        </span>
      </div>
      <div className="nav__profile">
        <span className="c-icon">
          <img src={profile} alt="profile_icon" />
        </span>
      </div>
    </div>
  );
};

export { Header };
