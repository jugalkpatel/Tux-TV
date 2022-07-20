import { Outlet, useParams } from "react-router-dom";

import "./Channel.css";

import { useVideos } from "../../contexts";
import { ChannelTile } from "../../components";
import { Spinner } from "../../components";

const Channel = () => {
  const { channels } = useVideos();

  const { id: channelID } = useParams();

  const channel = channels.find(({ id }) => id === channelID);
  return (
    <>
      {!channel ? (
        <Spinner />
      ) : (
        <div className="channel">
          <section className="channel__header">
            <span className="channel__thumbnail">
              <img
                src={channel.thumbnail_src}
                className="channel__img"
                alt="channel_thumbnail"
              />
            </span>

            <section className="channel__header__content">
              <h2 className="channel__title">{channel.title}</h2>
              <p className="channel__snippet text-truncate">
                {channel.snippet}
              </p>
            </section>
          </section>
          <section className="channel__main">
            {channel.videos.map((video) => {
              return <ChannelTile key={video.id} {...video} />;
            })}
          </section>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { Channel };
