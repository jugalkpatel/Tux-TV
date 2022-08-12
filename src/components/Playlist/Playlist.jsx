import { useLocation } from "react-router-dom";

import "./Playlist.css";

import { useData } from "../../contexts";
import { PlayListTile } from "./PlaylistTile";
import { useAuth } from "../../contexts";
import { Empty } from "..";

const Playlist = () => {
  const { state } = useLocation();
  const { name } = useAuth();
  const { playlists } = useData();
  const { id } = state;

  const playlist = playlists.find((playlist) => playlist.id === id);
  const { title, videos } = playlist;
  return (
    <div className="playlist">
      <section className="playlist__content">
        <h2 className="playlist__title">{title}</h2>
        <p className="playlist__info">
          {videos.length} Videos • {name}
        </p>
      </section>
      {videos.length ? (
        <section className="playlist__main">
          {videos.map((video) => {
            return (
              <PlayListTile
                key={video.id}
                playlistID={id}
                video={video}
                playlistTitle={playlist.title}
              />
            );
          })}
        </section>
      ) : (
        <Empty text="Please! Add some videos in playlist." />
      )}
    </div>
  );
};

export { Playlist };
