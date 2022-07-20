import React from "react";

import "./PlaylistsList.css";
import { CgPlayList } from "react-icons/cg";

import { useData } from "../../contexts";
import { PlaylistCard } from "../../components";
import { Empty } from "../../components";

const PlaylistsList = () => {
  const { playlists } = useData();
  return (
    <>
      {playlists.length ? (
        <div className="playlists">
          <h2 className="pl__title">
            <CgPlayList className="pl__icon" />
            <span className="pl__title__text">Playlists</span>
          </h2>
          <div className="pl__main">
            {playlists.map((playlist) => {
              return <PlaylistCard key={playlist.id} {...playlist} />;
            })}
          </div>
        </div>
      ) : (
        <Empty text="Please! Create Some Playlists" />
      )}
    </>
  );
};

export { PlaylistsList };
