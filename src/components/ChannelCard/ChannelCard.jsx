import React from "react";
import { Link } from "react-router-dom";
import "./ChannelCard.css";

const ChannelCard = ({ id, title, thumbnail_src }) => {
  return (
    <Link to={`/channel/${id}`} className="c-card">
      <span className="c-card__img">
        <img src={thumbnail_src} alt="channel_img" className="r-img--c-card" />
      </span>

      <p className="c-card__name">{title}</p>
    </Link>
  );
};

export { ChannelCard };
