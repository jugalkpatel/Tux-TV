import { useState } from "react";

import "./CreatePlaylist.css";
import Loader from "react-loader-spinner";

import { actions } from "../../utils/actions";
import { postAPI } from "../../utils/postAPI";
import { useAuth, useData } from "../../contexts";

const CreatePlaylist = ({ displayAddPlaylist }) => {
  const { CREATE_PLAYLIST } = actions;
  const { userID } = useAuth();
  const { dispatchData } = useData();

  const [title, setTitle] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onCreatePlaylistClick = async () => {
    if (title.length < 1) {
      return;
    }

    setLoading(true);

    if (!isLoading) {
      const { data, status } = await postAPI(
        `https://tuxtv.herokuapp.com/user/${userID}/playlists/create`,
        { title }
      );

      if (status === 201) {
        dispatchData({ type: CREATE_PLAYLIST, payload: { ...data } });
        setLoading(false);
        return;
      }

      //SHOW ERROR: OPERATION FAILED
    }
  };

  return (
    <section className="cp-list--v" style={{ display: displayAddPlaylist }}>
      <span className="cp__label--name">Name</span>
      <input
        type="text"
        className="cp__input--name"
        placeholder="Enter playlist name...."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        minLength="1"
        maxLength="200"
      />

      <button
        className="cp__btn--create"
        onClick={() => {
          onCreatePlaylistClick();
          setTitle("");
        }}
      >
        {isLoading ? (
          <Loader type="Bars" color="#3ea6ff" height={16} width={16} />
        ) : (
          "CREATE"
        )}
      </button>
    </section>
  );
};

export { CreatePlaylist };
