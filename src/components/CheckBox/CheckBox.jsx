import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CheckBox.css";
import Loader from "react-loader-spinner";

import { useAuth, useData, useToast } from "../../contexts";
import { actions } from "../../utils/actions";
import { isVideoInPlaylist } from "../../utils/isVideoInPlaylist";
import { postAPI } from "../../utils/postAPI";

const CheckBox = ({ videoID, ...playlist }) => {
  const { id, title } = playlist;
  const { ADD_TO_PLAYLIST, REMOVE_FROM_PLAYLIST } = actions;
  const { playlists, dispatchData } = useData();
  const { userID, isLoggedIn } = useAuth();
  const { setupToast } = useToast();
  const navigate = useNavigate();

  const isInPlaylist = isVideoInPlaylist(videoID, id, playlists);

  const [isLoading, setLoading] = useState(false);
  const action = !isInPlaylist ? ADD_TO_PLAYLIST : REMOVE_FROM_PLAYLIST;

  const onPlaylistChecked = async () => {
    setLoading(true);

    if (!isLoading) {
      const URL = !isInPlaylist
        ? `https://tuxtv.herokuapp.com/user/${userID}/playlists/${id}/add`
        : `https://tuxtv.herokuapp.com/user/${userID}/playlists/${id}/remove`;

      const { data, status } = await postAPI(URL, { id: videoID });

      if (status === 201) {
        dispatchData({ type: action, payload: { ...data.details } });
      } else {
        setupToast("error while adding video to the playlist....");
      }

      setLoading(false);
    }
  };

  const onHandleChange = isLoggedIn
    ? () => onPlaylistChecked()
    : () => navigate("/login");

  return (
    <>
      {isLoading ? (
        <Loader type="Bars" color="#fff" height={23} width={23} />
      ) : (
        <input
          id={id}
          type="checkbox"
          checked={isInPlaylist}
          onChange={onHandleChange}
        />
      )}
      <label htmlFor={id} className="checkbox__text">
        {title}
      </label>
    </>
  );
};

export { CheckBox };
