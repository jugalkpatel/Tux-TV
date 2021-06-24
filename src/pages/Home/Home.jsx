import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import "./Home.css";
import Loader from "react-loader-spinner";

import { useData } from "../../contexts/DataProvider";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { ChannelCard } from "../../components/ChannelCard/ChannelCard.jsx";
import { Hero } from "../../components/Hero/Hero.jsx";
import { Video } from "../../components/Video/Video";
import { getRandomNumber } from "../../utils/getRandomNumber";

const Home = () => {
  const { videos, channels, dispatchData } = useData();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const URLs = [
          "http://localhost:8080/videos",
          "http://localhost:8080/channels",
        ];

        const requests = URLs.map((URL) => axios.get(URL).catch((err) => err));

        const [videos, channels] = await axios.all(requests);

        if (videos) {
          dispatchData({
            type: "SET_VIDEOS",
            payload: { videos: videos.data.videos },
          });
        }

        if (channels) {
          dispatchData({
            type: "SET_CHANNELS",
            payload: { channels: channels.data.channels },
          });
        }
      } catch (error) {
        console.log(error);
        setError(true);
        // TODO: SHOW ERROR TOAST
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatchData]);

  console.log({ videos, channels, loading, error });
  return (
    <>
      {loading || !channels || !videos ? (
        <span className="home__loader">
          <Loader type="Oval" height={100} width={100} color="#ffffff" />
        </span>
      ) : (
        <section className="home__main-content">
          <Hero {...videos[getRandomNumber(videos.length)]} />
          <div className="scrollable-list">
            <h2 className="scrollable-list__title">Popular Channels</h2>
            <section className="scrollable-list__videos">
              {channels.map((channel, index) => {
                return <ChannelCard key={index} {...channel} />;
              })}
            </section>
          </div>

          <div className="scrollable-list">
            <h2 className="scrollable-list__title">Just Added</h2>
            <section className="scrollable-list__videos">
              {videos.map((video) => {
                return <VideoCard key={video.id} {...video} />;
              })}
            </section>
          </div>

          <Video {...videos[getRandomNumber(videos.length)]} />

          <div className="scrollable-list">
            <h2 className="scrollable-list__title">Just Added</h2>
            <section className="scrollable-list__videos">
              {videos.map((video) => {
                return <VideoCard key={video.id} {...video} />;
              })}
            </section>
          </div>
        </section>
      )}
      <Outlet />
    </>
  );
};

export { Home };
