import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

import { actions } from "../../utils/actions";
import { videosReducer } from "./videosReducer";

const VideosContext = createContext();

const VideosProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      const { SET_VIDEOS, SET_CHANNELS } = actions;
      try {
        const URLs = ["/videos", "/channels"];

        const requests = URLs.map((URL) => axios.get(URL).catch((err) => err));

        const [videosResponse, channelsResponse] = await axios.all(requests);

        if (videosResponse.status === 200) {
          dispatchVideosData({
            type: SET_VIDEOS,
            payload: { videos: videosResponse.data.videos },
          });
        }

        if (channelsResponse.status === 200) {
          dispatchVideosData({
            type: SET_CHANNELS,
            payload: { channels: channelsResponse.data.channels },
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const initialData = {
    videos: [],
    channels: [],
  };

  const [videosData, dispatchVideosData] = useReducer(
    videosReducer,
    initialData
  );

  return (
    <VideosContext.Provider value={{ ...videosData }}>
      {children}
    </VideosContext.Provider>
  );
};

const useVideos = () => useContext(VideosContext);

export { useVideos, VideosProvider };
