import { Outlet } from "react-router-dom";

import "./Home.css";

import { useVideos } from "../../contexts";
import { VideoCard } from "../../components";
import { ChannelCard } from "../../components";
import { Hero } from "../../components";
import { Featured } from "../../components";
import { Spinner } from "../../components";
import { getRandomNumber } from "../../utils/getRandomNumber";

const Home = () => {
  const { videos, channels } = useVideos();
  return (
    <>
      {channels.length && videos.length ? (
        <section className="home__main">
          <Hero {...videos[getRandomNumber(videos.length)]} />

          <div className="scrollable-list">
            <h2 className="scrollable-list__title">Popular Channels</h2>
            <section className="scrollable-list__videos">
              {channels.map((channel) => {
                return <ChannelCard key={channel.id} {...channel} />;
              })}
            </section>
          </div>

          {channels.map(({ id, title, videos: channelVideos }, index) => {
            return (
              <div key={id}>
                <div className="scrollable-list">
                  <h2 className="scrollable-list__title">{title}</h2>
                  <section className="scrollable-list__videos">
                    {channelVideos.map((video) => {
                      return <VideoCard key={video.id} {...video} />;
                    })}
                  </section>
                </div>
                <Featured
                  key={index}
                  {...videos[getRandomNumber(videos.length)]}
                />
              </div>
            );
          })}
        </section>
      ) : (
        <Spinner />
      )}
      <Outlet />
    </>
  );
};

export { Home };
