import { Outlet, useLocation, Link } from "react-router-dom";

import "./Video.css";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";

import { ResponsivePlayer } from "../../components";
import { VideoTile } from "../../components";
import { SaveButton } from "../../components";
import { PlaylistButton } from "../../components";

const Video = () => {
  const { state } = useLocation();
  const { fromVideoCard } = state;
  const { id, url, title, snippet, channel } = state.data;
  return (
    <>
      <div className="video">
        {fromVideoCard ? (
          <VideoTile {...state.data} />
        ) : (
          <section className="video__wrapper">
            <ResponsivePlayer url={url} />
            <section className="v-list">
              <section className="video__header">
                <h2 className="video__title">{title}</h2>

                <section className="video__actions">
                  <SaveButton
                    data={{
                      btnClass: "video__btn--save",
                      id,
                      svgSaved: <BsBookmarkFill className="video-icon" />,
                      svgNotSaved: <BsBookmark className="video-icon" />,
                    }}
                  />

                  <PlaylistButton
                    data={{
                      btnClass: "video__btn--playlist",
                      video: state.data,
                      route: `/video/${title}/modal`,
                      svg: <RiPlayListAddFill className="video-icon" />,
                    }}
                  />
                </section>
              </section>

              <p className="video__description">{snippet}</p>

              <Link to={`/channel/${channel.id}`} className="video__channel">
                <span className="video__channel__img--wrapper">
                  <img
                    src={channel.thumbnail_src}
                    alt="channel__thumbnail"
                    className="video__channel__img"
                  />
                </span>
                <span className="video__channel__text">{channel.title}</span>
              </Link>
            </section>
          </section>
        )}
      </div>
      <Outlet />
    </>
  );
};

export { Video };
