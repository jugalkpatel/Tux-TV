import { useState } from "react";

import "./PlaylistTile.css";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "react-loader-spinner";

import { actions } from "../../utils/actions";
import { postAPI } from "../../utils/postAPI";
import { useAuth, useData, useToast } from "../../contexts";

const PlaylistVideoRemove = ({ data }) => {
  const { playlistID, videoID, title } = data;
  const { dispatchData } = useData();
  const { userID } = useAuth();
  const { addToast } = useToast();

  const { REMOVE_FROM_PLAYLIST } = actions;

  const [isLoading, setLoading] = useState(false);

  const onVideoRemove = async () => {
    setLoading(true);

    if (!isLoading) {
      const { data, status } = await postAPI(
        `/user/${userID}/playlists/${playlistID}/remove`,
        { id: videoID }
      );

      setLoading(false);

      if (status === 201) {
        dispatchData({
          type: REMOVE_FROM_PLAYLIST,
          payload: { ...data.details },
        });
        addToast(`Removed from ${title}`);
      } else {
        addToast("error while removing video from playlist....", "error");
      }
    }
  };

  return (
    <>
      <button className="pt__btn--remove" onClick={() => onVideoRemove()}>
        {isLoading ? (
          <Loader type="Bars" color="#fff" height={15.99} width={15.99} />
        ) : (
          <AiOutlineClose className="pt__icon" />
        )}
      </button>
    </>
  );
};

export { PlaylistVideoRemove };
