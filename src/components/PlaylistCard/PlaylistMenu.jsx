import { useState } from "react";

import "./PlaylistCard.css";
import Loader from "react-loader-spinner";

import { useAuth, useData, useToast } from "../../contexts";
import { actions } from "../../utils/actions";
import { postAPI } from "../../utils/postAPI";

const PlaylistMenu = ({ menu, playlist }) => {
  const { REMOVE_PLAYLIST } = actions;
  const { showMenu, setShowMenu } = menu;
  const { id } = playlist;
  const { userID } = useAuth();
  const { dispatchData } = useData();
  const { setupToast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const onPlaylistRemoveClick = async () => {
    setLoading(true);

    if (!isLoading) {
      const { data, status } = await postAPI(
        `/user/${userID}/playlists/remove`,
        { id }
      );

      setLoading(false);

      if (status === 201) {
        setShowMenu(false);
        dispatchData({ type: REMOVE_PLAYLIST, payload: { ...data } });
      } else {
        setupToast("error while removing playlist....");
      }
    }
  };

  return (
    <section className="pc__showmore__dropdown">
      <button
        className="pc__btn--remove"
        style={{ visibility: showMenu ? "visible" : "hidden" }}
        onClick={() => onPlaylistRemoveClick()}
      >
        {isLoading ? (
          <Loader type="Bars" color="#fff" width={13.33} height={13.33} />
        ) : (
          "Remove"
        )}
      </button>
    </section>
  );
};

export { PlaylistMenu };
